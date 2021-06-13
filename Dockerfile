FROM node:14.17-alpine
WORKDIR /user/src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE ${PORT}
CMD ["npm","run","start"]