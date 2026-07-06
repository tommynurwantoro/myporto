#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

echo "Building images..."
docker compose build api web

echo "Pushing images..."
docker push registry.tommynurwantoro.com/myporto-api:latest
docker push registry.tommynurwantoro.com/myporto-web:latest

echo "Done."
