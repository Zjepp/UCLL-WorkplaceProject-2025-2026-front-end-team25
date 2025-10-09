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

# Copy built web app from builder
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
