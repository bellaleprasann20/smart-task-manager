# ==========================================
# Stage 1: Build the static assets
# ==========================================
FROM node:22-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy dependency manifests first to leverage Docker layer caching
COPY package*.json ./

# Use 'npm ci' for faster, strictly versioned, deterministic builds
RUN npm ci

# Copy the rest of the application code
COPY . .

# Accept environment variables required for the Vite build
# (e.g., docker build --build-arg VITE_API_URL=https://api.myapp.com)
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

# Build the Vite project (outputs to /app/dist)
RUN npm run build

# ==========================================
# Stage 2: Serve with Nginx
# ==========================================
FROM nginx:alpine

# Remove the default Nginx index page
RUN rm -rf /usr/share/nginx/html/*

# Copy the built assets from the build stage
COPY --from=build /app/dist /usr/share/nginx/html

# Copy custom Nginx configuration to handle React Router
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 to the outside world
EXPOSE 80

# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"] 