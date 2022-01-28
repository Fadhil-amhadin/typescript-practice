FROM node-alpine

WORKDIR /out/app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "start"]