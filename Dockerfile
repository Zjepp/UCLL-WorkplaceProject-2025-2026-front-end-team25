# Build stage
FROM node:20-alpine AS builder

# DO NOT set EXPO_PUBLIC_API_URL at build time - it will be injected at runtime via window object

WORKDIR /app

# Copy package files
COPY IPSA_VZW/package*.json ./

# Install dependencies
RUN npm ci

# Copy app source
COPY IPSA_VZW/ ./

# Build the web version (with EXPO_PUBLIC_API_URL embedded)
RUN npx expo export

# Production stage - Use unprivileged nginx image for OKD
FROM nginxinc/nginx-unprivileged:alpine

# Switch to root temporarily to set up directories
USER root

# Create necessary directories with proper permissions
RUN mkdir -p /var/cache/nginx/client_temp \
    /var/cache/nginx/proxy_temp \
    /var/cache/nginx/fastcgi_temp \
    /var/cache/nginx/uwsgi_temp \
    /var/cache/nginx/scgi_temp \
    && chown -R nginx:nginx /var/cache/nginx \
    && chmod -R 755 /var/cache/nginx

# Copy built web app from builder
COPY --chown=nginx:nginx --from=builder /app/dist /usr/share/nginx/html

# Make /usr/share/nginx/html writable by nginx user for runtime env injection
RUN chown -R nginx:nginx /usr/share/nginx/html \
    && chmod -R 755 /usr/share/nginx/html

# Copy nginx configuration
COPY --chown=nginx:nginx nginx.conf /etc/nginx/nginx.conf

# Copy environment injection script
COPY --chown=nginx:nginx inject-env.sh /docker-entrypoint.d/inject-env.sh
RUN chmod +x /docker-entrypoint.d/inject-env.sh

# Switch back to non-root user
USER nginx

# Expose port 8080 (non-privileged port)
EXPOSE 8080

# Start nginx with environment injection
CMD ["/docker-entrypoint.d/inject-env.sh"]
