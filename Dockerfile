FROM node:14-alpine

ADD package.json package.json
RUN npm ci

ADD index.js index.js

EXPOSE 3000

ENTRYPOINT npm start
