FROM node

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./
COPY config-sample.json ./config.json
COPY config.json .

RUN npm install -g typescript
RUN npm install

COPY . .

RUN npm run build

EXPOSE 8080

CMD ["node", "/app/app/built"]