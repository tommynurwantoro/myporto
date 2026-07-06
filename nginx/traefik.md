# Traefik production routing for myporto

Only the **web** container is exposed to the internet. The Go API is internal-only.

```
Internet → Traefik → web:3001 (nginx)
                         ├─ /api/*  →  api:8080  (internal Docker network)
                         └─ /*      →  React SPA
```

Google OAuth never hits the API directly. The browser loads Google's SDK, receives the ID token, then POSTs it to same-origin `/api/v1/auth/google`. nginx forwards that to the API.

## Deploy

```bash
docker compose -f docker-compose.yml -f docker-compose.traefik.yml up -d --build
```

## .env

```env
DOMAIN=tommynurwantoro.com
TRAEFIK_NETWORK=traefik
TRAEFIK_ENTRYPOINT=websecure
TRAEFIK_CERT_RESOLVER=letsencrypt

VITE_API_BASE_URL=/api
VITE_VERIFY_BASE_URL=https://tommynurwantoro.com
```

## Verify routing

```bash
# API via nginx proxy (expect 401, not connection refused)
curl -X POST https://tommynurwantoro.com/api/v1/auth/google \
  -H "Content-Type: application/json" -d '{"credential":"test"}'

# SPA
curl -I https://tommynurwantoro.com/
```

## Google OAuth console

Authorized JavaScript origins (browser only — no API URL needed):

- `https://tommynurwantoro.com`
- `http://localhost:5173` (local dev)
