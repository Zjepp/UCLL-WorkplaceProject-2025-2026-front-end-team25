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

# Production stage
FROM nginx:alpine

# Create a non-root user and necessary directories with proper permissions for OKD/OpenShift
RUN mkdir -p /var/cache/nginx/client_temp \
    /var/cache/nginx/proxy_temp \
    /var/cache/nginx/fastcgi_temp \
    /var/cache/nginx/uwsgi_temp \
    /var/cache/nginx/scgi_temp \
    /var/run \
    /var/log/nginx \
    && chmod -R 777 /var/cache/nginx \
    && chmod -R 777 /var/run \
    && chmod -R 777 /var/log/nginx \
    && chmod -R 755 /usr/share/nginx/html

# Copy built web app from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/nginx.conf

# Make sure nginx config and html are readable
RUN chmod 644 /etc/nginx/nginx.conf

# Expose port 8080 (non-privileged port for OKD)
EXPOSE 8080

# Run as non-root user (OKD will assign random UID)
USER 1001

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
