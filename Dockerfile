FROM node:alpine

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

# CMD ["npm", "dev"]