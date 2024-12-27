# Step 1: Build the React app with Vite
FROM node:lts-alpine as build

WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json package-lock.json ./

# Set SSL-related configs
ENV NODE_OPTIONS=--openssl-legacy-provider
RUN npm config set strict-ssl false
RUN npm config set ca ""


# Install dependencies
RUN npm install

# Copy the rest of the files
COPY . .

# Build the app
RUN npm run build

# Step 2: Serve the app with Nginx
FROM nginx:alpine 

# Copy the build files from the previous step
COPY --from=build /app/dist /usr/share/nginx/html

# Copy the Nginx configuration file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]