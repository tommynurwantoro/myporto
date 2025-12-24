# Multi-stage build for React/Vite application

# Stage 1: Build stage
FROM node:24-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production=false

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM nginx:alpine AS production

# Copy custom nginx configuration
COPY --from=builder /app/dist /etc/nginx/html

# Copy custom nginx config (optional, creates a basic SPA config)
RUN echo 'server { \
    listen 3001; \
    server_name localhost; \
    location / { \
        root /etc/nginx/html; \
        index index.html index.htm; \
        try_files $uri $uri/ /index.html; \
    } \
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ { \
        expires 1y; \
        add_header Cache-Control "public, immutable"; \
    } \
    gzip on; \
    gzip_vary on; \
    gzip_min_length 1024; \
    gzip_comp_level 6; \
    gzip_types text/plain text/css text/xml text/javascript application/javascript application/xml+rss application/json; \
}' > /etc/nginx/conf.d/default.conf

# Expose port 3001
EXPOSE 3001

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 