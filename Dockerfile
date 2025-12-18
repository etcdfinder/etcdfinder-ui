# Stage 1: Build the React application
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Stage 2: Serve the application
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package.json and install only production dependencies
COPY package*.json ./
RUN npm install --production

# Copy the build output from the builder stage
COPY --from=builder /app/dist ./dist

# Copy the server script
COPY server.cjs ./

ENV PORT=3000
EXPOSE 3000

CMD ["node", "server.cjs"]
