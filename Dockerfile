FROM node:17 

WORKDIR /usr/app

COPY package*.json ./
RUN npm install

# CMD ["npm", "dev"]