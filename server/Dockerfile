FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci --only=production
CMD ["node","index.js"]
EXPOSE 5000