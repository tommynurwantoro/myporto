package model

import "time"

type Signature struct {
	ID         string    `json:"id"`
	Title      string    `json:"title"`
	SignedAt   time.Time `json:"signed_at"`
	SignerName string    `json:"signer_name"`
	Notes      string    `json:"notes,omitempty"`
	ImagePath  string    `json:"-"`
	CreatedBy  string    `json:"-"`
	CreatedAt  time.Time `json:"created_at"`
}

type SignaturePublic struct {
	ID         string    `json:"id"`
	Title      string    `json:"title"`
	SignedAt   time.Time `json:"signed_at"`
	SignerName string    `json:"signer_name"`
	Notes      string    `json:"notes,omitempty"`
	CreatedAt  time.Time `json:"created_at"`
	VerifyURL  string    `json:"verify_url,omitempty"`
	ImageURL   string    `json:"image_url,omitempty"`
}

func (s *Signature) ToPublic(verifyBaseURL string) SignaturePublic {
	pub := SignaturePublic{
		ID:         s.ID,
		Title:      s.Title,
		SignedAt:   s.SignedAt,
		SignerName: s.SignerName,
		Notes:      s.Notes,
		CreatedAt:  s.CreatedAt,
	}
	if s.ImagePath != "" {
		pub.ImageURL = "/api/v1/signatures/" + s.ID + "/image"
	}
	if verifyBaseURL != "" {
		pub.VerifyURL = verifyBaseURL + "/verify/" + s.ID
	}
	return pub
}
