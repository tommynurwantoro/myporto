# Multi-stage build for React/Vite application

# Stage 1: Build stage
FROM node:24-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy source code
COPY . .

# Vite embeds VITE_* variables at build time — pass these when building the image:
#   docker build --build-arg VITE_GOOGLE_CLIENT_ID=... --build-arg VITE_API_BASE_URL=... .
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_API_BASE_URL=/api
ARG VITE_VERIFY_BASE_URL

ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_VERIFY_BASE_URL=$VITE_VERIFY_BASE_URL

# Build the application
RUN npm run build

# Stage 2: Production stage
FROM nginx:alpine AS production

COPY --from=builder /app/dist /etc/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf

# Expose port 3001
EXPOSE 3001

# Start nginx
CMD ["nginx", "-g", "daemon off;"] 