FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm ci --legacy-peer-deps
RUN npm run build
ENV NODE_ENV production
EXPOSE 80
CMD ["npx","serve","-l","80","-s","build"]