FROM node

WORKDIR /app

COPY package.json ./
COPY tsconfig.json ./

RUN npm install -g typescript
RUN npm install
RUN npm run build

COPY . .

EXPOSE 8080

CMD ["node", "/app/app/built"]