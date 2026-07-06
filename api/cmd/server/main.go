package main

import (
	"database/sql"
	"log"
	"net/http"

	_ "github.com/jackc/pgx/v5/stdlib"
	"github.com/tommynurwantoro/myporto/api/internal/config"
	"github.com/tommynurwantoro/myporto/api/internal/handler"
	"github.com/tommynurwantoro/myporto/api/internal/middleware"
	"github.com/tommynurwantoro/myporto/api/internal/repository"
	"github.com/tommynurwantoro/myporto/api/internal/storage"
	"github.com/tommynurwantoro/myporto/api/migrations"
)

func main() {
	config.LoadEnv()
	cfg := config.Load()

	if cfg.DatabaseURL == "" {
		log.Fatal("DATABASE_URL is required")
	}
	if cfg.JWTSecret == "" {
		log.Fatal("JWT_SECRET is required")
	}
	if cfg.GoogleClientID == "" {
		log.Fatal("GOOGLE_CLIENT_ID is required")
	}
	if len(cfg.AllowedSignerEmails) == 0 {
		log.Fatal("ALLOWED_SIGNER_EMAILS is required")
	}

	db, err := sql.Open("pgx", cfg.DatabaseURL)
	if err != nil {
		log.Fatalf("open db: %v", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatalf("ping db: %v", err)
	}

	repo := repository.NewSignatureRepository(db)

	for _, name := range migrations.Order {
		sqlBytes, err := migrations.FS.ReadFile(name)
		if err != nil {
			log.Fatalf("read migration %s: %v", name, err)
		}
		if err := repo.MigrateSQL(string(sqlBytes)); err != nil {
			log.Fatalf("migrate %s: %v", name, err)
		}
	}

	store, err := storage.NewLocalStorage(cfg.StoragePath)
	if err != nil {
		log.Fatalf("storage: %v", err)
	}

	authHandler := handler.NewAuthHandler(cfg)
	sigHandler := handler.NewSignatureHandler(cfg, repo, store)

	mux := http.NewServeMux()

	mux.HandleFunc("POST /api/v1/auth/google", authHandler.GoogleAuth)

	mux.Handle("POST /api/v1/signatures", middleware.Auth(cfg)(http.HandlerFunc(sigHandler.Create)))
	mux.Handle("GET /api/v1/signatures", middleware.Auth(cfg)(http.HandlerFunc(sigHandler.List)))
	mux.HandleFunc("GET /api/v1/signatures/{id}", sigHandler.GetByID)
	mux.HandleFunc("GET /api/v1/signatures/{id}/image", sigHandler.ServeImage)

	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Content-Type", "application/json")
		w.Write([]byte(`{"status":"ok"}`))
	})

	addr := ":" + cfg.Port
	log.Printf("API listening on %s", addr)
	if err := http.ListenAndServe(addr, middleware.CORS(cfg)(mux)); err != nil {
		log.Fatal(err)
	}
}
