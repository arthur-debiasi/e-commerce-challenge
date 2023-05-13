 FROM node:18
 EXPOSE 3000
 WORKDIR /
 COPY package*.json .
 RUN npm install
 COPY . .
 CMD [ "npm", "start" ]