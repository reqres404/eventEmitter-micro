# Stage 1: Build the Node.js application and install necessary dependencies
FROM node:18 AS builder



# Install Google Chrome Stable and fonts
# Note: this installs the necessary libs to make the browser work with Puppeteer.
RUN apt-get update && apt-get install gnupg wget -y && \
  wget --quiet --output-document=- https://dl-ssl.google.com/linux/linux_signing_key.pub | gpg --dearmor > /etc/apt/trusted.gpg.d/google-archive.gpg && \
  sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' && \
  apt-get update && \
  apt-get install google-chrome-stable -y --no-install-recommends && \
  rm -rf /var/lib/apt/lists/*

# Create and set the working directory for the app
WORKDIR /app

# Install nodemon globally for development (optional)
RUN npm install -g nodemon

# Copy the package.json and package-lock.json to the container
COPY package.json package-lock.json ./

# Install app dependencies
RUN npm install

# Copy the entire app source to the container
COPY . .

# Stage 2: Create a minimal production-ready image
FROM node:slim
# We don't need the standalone Chromium
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD true
# Copy the app directory from the builder stage
COPY --from=builder /app /app

# Set the working directory for the app
WORKDIR /app

# Expose the app port
EXPOSE 4004

# Use script specified in package.json to run the app
CMD ["npm","start"]
