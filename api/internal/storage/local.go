package storage

import (
	"fmt"
	"io"
	"mime"
	"os"
	"path/filepath"
	"strings"
)

var allowedMIMETypes = map[string]string{
	"image/jpeg": ".jpg",
	"image/png":  ".png",
	"image/webp": ".webp",
	"image/gif":  ".gif",
}

const maxImageSize = 5 << 20 // 5 MB

type LocalStorage struct {
	basePath string
}

func NewLocalStorage(basePath string) (*LocalStorage, error) {
	if err := os.MkdirAll(basePath, 0o755); err != nil {
		return nil, fmt.Errorf("create storage dir: %w", err)
	}
	return &LocalStorage{basePath: basePath}, nil
}

func (s *LocalStorage) Save(id string, reader io.Reader, contentType string, size int64) (string, error) {
	if size > maxImageSize {
		return "", fmt.Errorf("image exceeds maximum size of 5MB")
	}

	ext, ok := allowedMIMETypes[contentType]
	if !ok {
		// try parsing from content type
		exts, _ := mime.ExtensionsByType(contentType)
		if len(exts) == 0 {
			return "", fmt.Errorf("unsupported image type: %s", contentType)
		}
		ext = exts[0]
	}

	filename := id + ext
	destPath := filepath.Join(s.basePath, filename)

	f, err := os.Create(destPath)
	if err != nil {
		return "", fmt.Errorf("create file: %w", err)
	}
	defer f.Close()

	written, err := io.Copy(f, io.LimitReader(reader, maxImageSize+1))
	if err != nil {
		os.Remove(destPath)
		return "", fmt.Errorf("write file: %w", err)
	}
	if written > maxImageSize {
		os.Remove(destPath)
		return "", fmt.Errorf("image exceeds maximum size of 5MB")
	}

	return filename, nil
}

func (s *LocalStorage) Open(relativePath string) (*os.File, string, error) {
	clean := filepath.Clean(relativePath)
	if strings.Contains(clean, "..") {
		return nil, "", fmt.Errorf("invalid path")
	}
	fullPath := filepath.Join(s.basePath, clean)
	f, err := os.Open(fullPath)
	if err != nil {
		return nil, "", err
	}
	ext := filepath.Ext(clean)
	contentType := mime.TypeByExtension(ext)
	if contentType == "" {
		contentType = "application/octet-stream"
	}
	return f, contentType, nil
}

func ValidateContentType(contentType string) bool {
	_, ok := allowedMIMETypes[strings.Split(contentType, ";")[0]]
	return ok
}
