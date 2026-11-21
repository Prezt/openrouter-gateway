FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy dependency files first (Docker caches this layer)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Tell Docker this container will listen on port 3000
EXPOSE 3000

# Start the app
CMD ["node", "--env-file", ".env", "src/index.ts"]