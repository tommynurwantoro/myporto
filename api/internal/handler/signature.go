package handler

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/google/uuid"
	"github.com/tommynurwantoro/myporto/api/internal/config"
	"github.com/tommynurwantoro/myporto/api/internal/middleware"
	"github.com/tommynurwantoro/myporto/api/internal/model"
	"github.com/tommynurwantoro/myporto/api/internal/repository"
	"github.com/tommynurwantoro/myporto/api/internal/storage"
)

type SignatureHandler struct {
	cfg   *config.Config
	repo  *repository.SignatureRepository
	store *storage.LocalStorage
}

func NewSignatureHandler(cfg *config.Config, repo *repository.SignatureRepository, store *storage.LocalStorage) *SignatureHandler {
	return &SignatureHandler{cfg: cfg, repo: repo, store: store}
}

const defaultSignerName = "Tommy Nurwantoro"

func (h *SignatureHandler) Create(w http.ResponseWriter, r *http.Request) {
	if err := r.ParseMultipartForm(6 << 20); err != nil {
		http.Error(w, `{"error":"invalid form data"}`, http.StatusBadRequest)
		return
	}

	title := r.FormValue("title")
	if title == "" {
		http.Error(w, `{"error":"title is required"}`, http.StatusBadRequest)
		return
	}

	signedAtStr := r.FormValue("signed_at")
	signedAt := time.Now()
	if signedAtStr != "" {
		parsed, err := time.Parse(time.RFC3339, signedAtStr)
		if err != nil {
			// try date-only
			parsed, err = time.Parse("2006-01-02", signedAtStr)
			if err != nil {
				http.Error(w, `{"error":"invalid signed_at format"}`, http.StatusBadRequest)
				return
			}
		}
		signedAt = parsed
	}

	signerName := r.FormValue("signer_name")
	if signerName == "" {
		signerName = defaultSignerName
	}

	notes := r.FormValue("notes")

	claims := middleware.GetClaims(r)
	if claims == nil {
		http.Error(w, `{"error":"unauthorized"}`, http.StatusUnauthorized)
		return
	}

	id := uuid.New().String()
	var imagePath string

	file, header, err := r.FormFile("image")
	if err == nil {
		defer file.Close()

		contentType := header.Header.Get("Content-Type")
		if contentType == "" {
			contentType = "application/octet-stream"
		}
		if !storage.ValidateContentType(contentType) {
			http.Error(w, `{"error":"unsupported image type"}`, http.StatusBadRequest)
			return
		}

		imagePath, err = h.store.Save(id, file, contentType, header.Size)
		if err != nil {
			http.Error(w, `{"error":"`+err.Error()+`"}`, http.StatusBadRequest)
			return
		}
	} else if err != http.ErrMissingFile {
		http.Error(w, `{"error":"invalid image upload"}`, http.StatusBadRequest)
		return
	}

	sig := &model.Signature{
		ID:         id,
		Title:      title,
		SignedAt:   signedAt,
		SignerName: signerName,
		Notes:      notes,
		ImagePath:  imagePath,
		CreatedBy:  claims.Sub,
		CreatedAt:  time.Now().UTC(),
	}

	if err := h.repo.Create(r.Context(), sig); err != nil {
		http.Error(w, `{"error":"failed to save signature"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(sig.ToPublic(h.cfg.VerifyBaseURL))
}

func (h *SignatureHandler) GetByID(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	if id == "" {
		http.Error(w, `{"error":"id required"}`, http.StatusBadRequest)
		return
	}

	sig, err := h.repo.GetByID(r.Context(), id)
	if err != nil {
		http.Error(w, `{"error":"internal error"}`, http.StatusInternalServerError)
		return
	}
	if sig == nil {
		http.Error(w, `{"error":"not found"}`, http.StatusNotFound)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(sig.ToPublic(h.cfg.VerifyBaseURL))
}

func (h *SignatureHandler) List(w http.ResponseWriter, r *http.Request) {
	claims := middleware.GetClaims(r)
	if claims == nil {
		http.Error(w, `{"error":"unauthorized"}`, http.StatusUnauthorized)
		return
	}

	limit, _ := strconv.Atoi(r.URL.Query().Get("limit"))
	offset, _ := strconv.Atoi(r.URL.Query().Get("offset"))
	if limit <= 0 {
		limit = 10
	}
	if limit > 100 {
		limit = 100
	}
	if offset < 0 {
		offset = 0
	}

	total, err := h.repo.CountByCreator(r.Context(), claims.Sub)
	if err != nil {
		http.Error(w, `{"error":"internal error"}`, http.StatusInternalServerError)
		return
	}

	sigs, err := h.repo.ListByCreator(r.Context(), claims.Sub, limit, offset)
	if err != nil {
		http.Error(w, `{"error":"internal error"}`, http.StatusInternalServerError)
		return
	}

	pub := make([]model.SignaturePublic, 0, len(sigs))
	for _, s := range sigs {
		pub = append(pub, s.ToPublic(h.cfg.VerifyBaseURL))
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]interface{}{
		"items":  pub,
		"total":  total,
		"limit":  limit,
		"offset": offset,
	})
}

func (h *SignatureHandler) ServeImage(w http.ResponseWriter, r *http.Request) {
	id := r.PathValue("id")
	sig, err := h.repo.GetByID(r.Context(), id)
	if err != nil || sig == nil {
		http.Error(w, `{"error":"not found"}`, http.StatusNotFound)
		return
	}

	if sig.ImagePath == "" {
		http.Error(w, `{"error":"no image for this record"}`, http.StatusNotFound)
		return
	}

	f, contentType, err := h.store.Open(sig.ImagePath)
	if err != nil {
		http.Error(w, `{"error":"image not found"}`, http.StatusNotFound)
		return
	}
	defer f.Close()

	w.Header().Set("Content-Type", contentType)
	w.Header().Set("Cache-Control", "public, max-age=86400")
	http.ServeContent(w, r, sig.ImagePath, sig.CreatedAt, f)
}
