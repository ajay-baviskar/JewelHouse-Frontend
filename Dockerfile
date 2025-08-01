# Use full Node.js image instead of Alpine
FROM node:20

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

EXPOSE 9089

ENV HOST=0.0.0.0

CMD ["npm", "run", "dev"]
