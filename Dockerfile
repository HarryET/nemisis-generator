# Use an official Node runtime as a parent image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code (server and public files)
COPY . .

# Make port 3000 available to the world outside this container
EXPOSE 3000

# Define environment variable (optional, can be overridden)
ENV NODE_ENV production

# Run the app when the container launches
CMD [ "node", "server.js" ] 