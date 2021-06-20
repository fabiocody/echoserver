FROM node:14-alpine

ADD index.js index.js
ADD package.json package.json
ADD package-lock.json package-lock.json

RUN npm ci

EXPOSE 3000

ENTRYPOINT npm start
