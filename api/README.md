# MyPorto Sign Verification API

Go HTTP API for document attestation and QR verification.

## Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| `POST` | `/api/v1/auth/google` | — | Exchange Google ID token for app JWT |
| `POST` | `/api/v1/signatures` | JWT | Create signature record (multipart) |
| `GET` | `/api/v1/signatures/:id` | — | Public verification lookup |
| `GET` | `/api/v1/signatures` | JWT | List your records |
| `GET` | `/api/v1/signatures/:id/image` | — | Document image |
| `GET` | `/health` | — | Health check |

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | yes | PostgreSQL connection string |
| `GOOGLE_CLIENT_ID` | yes | Google OAuth Web Client ID |
| `JWT_SECRET` | yes | Secret for app session JWTs |
| `ALLOWED_SIGNER_EMAILS` | yes | Comma-separated email allowlist |
| `PORT` | no | Default `8080` |
| `STORAGE_PATH` | no | Default `./uploads` |
| `CORS_ORIGIN` | no | Default `http://localhost:5173` |
| `VERIFY_BASE_URL` | no | Base URL for verify links in responses |

## Local Run

From the `api/` directory — env vars are loaded automatically from `api/.env` or the repo-root `../.env`:

```bash
cd api
go run ./cmd/server
```

Or export variables manually:

```bash
export DATABASE_URL=postgres://myporto:myporto@localhost:5433/myporto?sslmode=disable
export GOOGLE_CLIENT_ID=your-client-id
export JWT_SECRET=dev-secret
export ALLOWED_SIGNER_EMAILS=tommy.nurwantoro@gmail.com
export VERIFY_BASE_URL=http://localhost:5173

go run ./cmd/server
```

Start Postgres via `docker compose up postgres -d` from the repo root.

## Production — Nginx

Proxy `/api/` to this service when co-located with the React SPA:

```nginx
location /api/ {
    proxy_pass http://127.0.0.1:8080/api/;
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    client_max_body_size 6M;
}
```

Set `CORS_ORIGIN` to your frontend origin and `VERIFY_BASE_URL` to your public site URL.

## Docker

```bash
docker build -t myporto-api .
docker run -p 8080:8080 -e DATABASE_URL=... -e GOOGLE_CLIENT_ID=... \
  -e JWT_SECRET=... -e ALLOWED_SIGNER_EMAILS=... myporto-api
```

Or use `docker compose up` from the repo root.
