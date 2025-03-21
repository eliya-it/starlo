# Build stage
FROM node:18-bullseye AS builder

WORKDIR /app
COPY package.json package-lock.json ./

# Install ALL dependencies, including devDependencies for TypeScript
RUN npm install

COPY . .
RUN npm run build

# Final image
FROM node:18-bullseye

WORKDIR /app

# Copy only necessary files
COPY --from=builder /app/package.json /app/package-lock.json /app/
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/dist /app/dist

# Remove devDependencies to reduce image size
RUN npm prune --production

EXPOSE 3000
CMD ["node", "dist/server.js"]
