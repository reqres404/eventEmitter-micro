# Use the official Node.js 18.x image as the base image
FROM node:18-alpine as builder

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to the container
COPY package.json ./

# Install Node.js dependencies
RUN npm config set strict-ssl false
RUN npm cache clean --force

RUN npm install

# Copy the entire React app to the container's working directory
COPY . .

RUN npm run build

FROM nginx:latest

# Copy the custom Nginx configuration file to the container
COPY nginx.conf /etc/nginx/conf.d/default.conf

LABEL maintainer=Aditya
COPY --from=builder /app/build/ /usr/share/nginx/html
EXPOSE 80