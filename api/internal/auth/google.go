package auth

import (
	"context"
	"fmt"

	"google.golang.org/api/idtoken"
)

type GoogleClaims struct {
	Sub   string
	Email string
	Name  string
}

func ValidateGoogleToken(ctx context.Context, clientID, credential string) (*GoogleClaims, error) {
	payload, err := idtoken.Validate(ctx, credential, clientID)
	if err != nil {
		return nil, fmt.Errorf("invalid google token: %w", err)
	}

	email, _ := payload.Claims["email"].(string)
	if email == "" {
		return nil, fmt.Errorf("google token missing email claim")
	}

	name, _ := payload.Claims["name"].(string)
	if name == "" {
		name = email
	}

	return &GoogleClaims{
		Sub:   payload.Subject,
		Email: email,
		Name:  name,
	}, nil
}
