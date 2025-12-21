# =========================
# Runtime Image
# =========================
FROM node:18-alpine

# Create non-root user (production best practice)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

# Copy package files first (better layer caching)
COPY package*.json ./

# Install only production dependencies
RUN npm install --only=production

# Copy application source
COPY src ./src

# Switch to non-root user
USER appuser

# Application listens on 8080 (container standard)
EXPOSE 8080

# Start application
CMD ["node", "src/server.js"]
