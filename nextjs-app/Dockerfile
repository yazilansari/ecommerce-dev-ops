# Use the official Node.js 20 image as the base
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (if exists)
COPY package*.json ./

# Install dependencies
#RUN npm install

RUN npm install && \
    chmod +x node_modules/.bin/next

# Copy the rest of the application code
COPY . .

RUN npm run build

#CMD ["/bin/bash"]

EXPOSE 3000
CMD ["npm", "run", "start"]
