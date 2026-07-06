FROM golang:1.25-alpine AS builder

ENV GOTOOLCHAIN=auto

WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o server ./cmd/server

FROM alpine:3.21
RUN apk add --no-cache ca-certificates wget
WORKDIR /app
COPY --from=builder /app/server .
RUN mkdir -p /app/uploads
EXPOSE 8080
CMD ["./server"]
