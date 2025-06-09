FROM node:18
WORKDIR /app
COPY package*.json ./
RUN npm install --verbose
COPY . .
EXPOSE 3000
#RUN addgroup -S appgroup && adduser -S appuser -G appgroup
#USER appuser
CMD ["node", "index.js"]
