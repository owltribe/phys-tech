# Use the base image
FROM node:18-alpine

# Install dependencies
RUN apk add --no-cache g++ make py3-pip libc6-compat

# Create the /app directory
RUN mkdir /app

# Set the working directory to /app
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application code
COPY . .

# Build the application
RUN npm run build

# Create a non-root user and group
RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Switch to the non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
