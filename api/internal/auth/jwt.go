package auth

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type AppClaims struct {
	Sub   string `json:"sub"`
	Email string `json:"email"`
	Name  string `json:"name"`
	jwt.RegisteredClaims
}

func IssueAppJWT(secret string, claims *GoogleClaims, expiry time.Duration) (string, error) {
	now := time.Now()
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, AppClaims{
		Sub:   claims.Sub,
		Email: claims.Email,
		Name:  claims.Name,
		RegisteredClaims: jwt.RegisteredClaims{
			ExpiresAt: jwt.NewNumericDate(now.Add(expiry)),
			IssuedAt:  jwt.NewNumericDate(now),
			Subject:   claims.Sub,
		},
	})
	return token.SignedString([]byte(secret))
}

func ParseAppJWT(secret, tokenStr string) (*AppClaims, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &AppClaims{}, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method")
		}
		return []byte(secret), nil
	})
	if err != nil {
		return nil, err
	}
	claims, ok := token.Claims.(*AppClaims)
	if !ok || !token.Valid {
		return nil, fmt.Errorf("invalid token")
	}
	return claims, nil
}
