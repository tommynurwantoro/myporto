package repository

import (
	"context"
	"database/sql"
	"fmt"
	"strings"

	"github.com/tommynurwantoro/myporto/api/internal/model"
)

type SignatureRepository struct {
	db *sql.DB
}

func NewSignatureRepository(db *sql.DB) *SignatureRepository {
	return &SignatureRepository{db: db}
}

func (r *SignatureRepository) MigrateSQL(sql string) error {
	_, err := r.db.Exec(sql)
	if err != nil {
		return fmt.Errorf("run migration: %w", err)
	}
	return nil
}

func (r *SignatureRepository) Create(ctx context.Context, sig *model.Signature) error {
	_, err := r.db.ExecContext(ctx, `
		INSERT INTO signatures (id, title, signed_at, signer_name, notes, image_path, created_by, created_at)
		VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
	`, sig.ID, sig.Title, sig.SignedAt, sig.SignerName, nullString(sig.Notes), nullString(sig.ImagePath), sig.CreatedBy, sig.CreatedAt)
	return err
}

func (r *SignatureRepository) GetByID(ctx context.Context, id string) (*model.Signature, error) {
	row := r.db.QueryRowContext(ctx, `
		SELECT id, title, signed_at, signer_name, COALESCE(notes, ''), COALESCE(image_path, ''), created_by, created_at
		FROM signatures WHERE id = $1
	`, id)

	var sig model.Signature
	var notes string
	err := row.Scan(&sig.ID, &sig.Title, &sig.SignedAt, &sig.SignerName, &notes, &sig.ImagePath, &sig.CreatedBy, &sig.CreatedAt)
	if err == sql.ErrNoRows {
		return nil, nil
	}
	if err != nil {
		return nil, err
	}
	sig.Notes = notes
	return &sig, nil
}

func (r *SignatureRepository) ListByCreator(ctx context.Context, createdBy string, limit, offset int) ([]model.Signature, error) {
	if limit <= 0 {
		limit = 50
	}
	rows, err := r.db.QueryContext(ctx, `
		SELECT id, title, signed_at, signer_name, COALESCE(notes, ''), COALESCE(image_path, ''), created_by, created_at
		FROM signatures WHERE created_by = $1
		ORDER BY created_at DESC
		LIMIT $2 OFFSET $3
	`, createdBy, limit, offset)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var results []model.Signature
	for rows.Next() {
		var sig model.Signature
		var notes string
		if err := rows.Scan(&sig.ID, &sig.Title, &sig.SignedAt, &sig.SignerName, &notes, &sig.ImagePath, &sig.CreatedBy, &sig.CreatedAt); err != nil {
			return nil, err
		}
		sig.Notes = notes
		results = append(results, sig)
	}
	return results, rows.Err()
}

func (r *SignatureRepository) CountByCreator(ctx context.Context, createdBy string) (int, error) {
	var count int
	err := r.db.QueryRowContext(ctx, `
		SELECT COUNT(*) FROM signatures WHERE created_by = $1
	`, createdBy).Scan(&count)
	return count, err
}

func nullString(s string) sql.NullString {
	s = strings.TrimSpace(s)
	if s == "" {
		return sql.NullString{}
	}
	return sql.NullString{String: s, Valid: true}
}
