FROM node:20-alpine

RUN mkdir -p /data
RUN chmod 777 /data

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
