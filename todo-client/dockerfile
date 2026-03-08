# Use Debian-based Node image to avoid ARM64 Rollup issues
FROM node:20-bullseye

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json first (for caching)
COPY package*.json ./

# Install dependencies with legacy peer deps to bypass optional deps issues
RUN npm install --legacy-peer-deps

# Copy the rest of the app
COPY . .

# Expose Vite default port
EXPOSE 5173

# Set environment variable for Vite polyfills (fixes some ARM issues)
ENV VITE_FORCE_NODE_POLYFILLS=1

# Start Vite dev server
CMD ["npm", "run", "dev"]