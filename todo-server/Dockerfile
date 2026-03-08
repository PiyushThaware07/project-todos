# -------------------------
# Stage 1: Build
# -------------------------
FROM node:20-alpine AS builder

# Set working directory
WORKDIR /app

# Copy only package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .


# -------------------------
# Stage 2: Production
# -------------------------
FROM node:20-alpine AS production

# Set working directory
WORKDIR /app

# Copy only node_modules and built app from builder
COPY --from=builder /app /app

# Expose port (adjust as needed)
EXPOSE 8000

# Run the app
CMD ["npm", "run", "dev"]