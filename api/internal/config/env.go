package config

import (
	"log"
	"os"
	"path/filepath"

	"github.com/joho/godotenv"
)

// LoadEnv reads a .env file into the process environment.
// Existing environment variables are not overwritten.
// Search order: api/.env, then repo-root .env (../.env when cwd is api/).
func LoadEnv() {
	if os.Getenv("DATABASE_URL") != "" {
		return
	}

	candidates := []string{
		".env",
		filepath.Join("..", ".env"),
	}

	for _, path := range candidates {
		if _, err := os.Stat(path); err != nil {
			continue
		}
		if err := godotenv.Load(path); err != nil {
			log.Printf("warning: failed to load %s: %v", path, err)
			continue
		}
		log.Printf("loaded environment from %s", path)
		return
	}
}
