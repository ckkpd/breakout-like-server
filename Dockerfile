FROM node

WORKDIR /app

COPY package.json ./

RUN npm install
RUN npm run build

COPY . .

EXPOSE 8080

CMD ["node", "/app/app/built"]