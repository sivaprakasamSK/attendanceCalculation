FROM node:23-alpine

WORKDIR /app


COPY package*.json ./
COPY ./prisma ./prisma
COPY .env .env


RUN npm install

RUN npx prisma generate

COPY . .

CMD [ "npm","run","dev" ]

