FROM node:10-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
ENV REDIS_HOST=redis://cache
COPY . .
RUN npm install
EXPOSE 3001
CMD ["node", "server/index.js"]
