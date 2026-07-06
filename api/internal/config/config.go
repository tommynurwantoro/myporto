package config

import (
	"os"
	"strings"
	"time"
)

type Config struct {
	Port               string
	DatabaseURL        string
	GoogleClientID     string
	JWTSecret          string
	AllowedSignerEmails map[string]struct{}
	StoragePath        string
	CORSOrigin         string
	VerifyBaseURL      string
	JWTExpiry          time.Duration
}

func Load() *Config {
	emails := make(map[string]struct{})
	for _, e := range strings.Split(os.Getenv("ALLOWED_SIGNER_EMAILS"), ",") {
		e = strings.TrimSpace(strings.ToLower(e))
		if e != "" {
			emails[e] = struct{}{}
		}
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	storagePath := os.Getenv("STORAGE_PATH")
	if storagePath == "" {
		storagePath = "./uploads"
	}

	jwtExpiry := 24 * time.Hour
	if v := os.Getenv("JWT_EXPIRY_HOURS"); v != "" {
		if d, err := time.ParseDuration(v + "h"); err == nil {
			jwtExpiry = d
		}
	}

	corsOrigin := os.Getenv("CORS_ORIGIN")
	if corsOrigin == "" {
		corsOrigin = "http://localhost:5173"
	}

	return &Config{
		Port:                port,
		DatabaseURL:         os.Getenv("DATABASE_URL"),
		GoogleClientID:      os.Getenv("GOOGLE_CLIENT_ID"),
		JWTSecret:           os.Getenv("JWT_SECRET"),
		AllowedSignerEmails: emails,
		StoragePath:         storagePath,
		CORSOrigin:          corsOrigin,
		VerifyBaseURL:       os.Getenv("VERIFY_BASE_URL"),
		JWTExpiry:           jwtExpiry,
	}
}

func (c *Config) IsEmailAllowed(email string) bool {
	_, ok := c.AllowedSignerEmails[strings.ToLower(strings.TrimSpace(email))]
	return ok
}
