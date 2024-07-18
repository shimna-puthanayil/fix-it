FROM node:20-alpine3.19
WORKDIR /fix-it
COPY package.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm", "run", "start" ]