package handler

import (
	"encoding/json"
	"net/http"

	"github.com/tommynurwantoro/myporto/api/internal/auth"
	"github.com/tommynurwantoro/myporto/api/internal/config"
)

type AuthHandler struct {
	cfg *config.Config
}

func NewAuthHandler(cfg *config.Config) *AuthHandler {
	return &AuthHandler{cfg: cfg}
}

type googleAuthRequest struct {
	Credential string `json:"credential"`
}

type authResponse struct {
	Token     string `json:"token"`
	ExpiresIn int64  `json:"expires_in"`
	Email     string `json:"email"`
	Name      string `json:"name"`
}

func (h *AuthHandler) GoogleAuth(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, `{"error":"method not allowed"}`, http.StatusMethodNotAllowed)
		return
	}

	var req googleAuthRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || req.Credential == "" {
		http.Error(w, `{"error":"credential required"}`, http.StatusBadRequest)
		return
	}

	claims, err := auth.ValidateGoogleToken(r.Context(), h.cfg.GoogleClientID, req.Credential)
	if err != nil {
		http.Error(w, `{"error":"invalid google credential"}`, http.StatusUnauthorized)
		return
	}

	if !h.cfg.IsEmailAllowed(claims.Email) {
		http.Error(w, `{"error":"email not authorized"}`, http.StatusForbidden)
		return
	}

	token, err := auth.IssueAppJWT(h.cfg.JWTSecret, claims, h.cfg.JWTExpiry)
	if err != nil {
		http.Error(w, `{"error":"failed to issue token"}`, http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(authResponse{
		Token:     token,
		ExpiresIn: int64(h.cfg.JWTExpiry.Seconds()),
		Email:     claims.Email,
		Name:      claims.Name,
	})
}
