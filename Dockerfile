# Build stage
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package files
COPY IPSA_VZW/package*.json ./

# Install dependencies
RUN npm ci

# Copy app source
COPY IPSA_VZW/ ./

# Build the web version
RUN npx expo export

# Production stage - Use unprivileged nginx image for OKD
FROM nginxinc/nginx-unprivileged:alpine

# Copy built web app from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Expose port 8080 (non-privileged port)
EXPOSE 8080

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
