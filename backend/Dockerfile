
# Use Node.js 20 as the runtime
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm ci

# Copy the backend source code
COPY . .

# Compile NestJS TypeScript into JavaScript
RUN npm run build

# Create a smaller production image
FROM node:20-alpine AS production

WORKDIR /app

ENV NODE_ENV=production

# Install production dependencies only
COPY package*.json ./
RUN npm ci --omit=dev

# Copy the compiled application
COPY --from=build /app/dist ./dist

# Document the port used by the API
EXPOSE 3000

# Start the compiled NestJS application
CMD ["node", "dist/main.js"]
