FROM node:latest

EXPOSE 8080

WORKDIR /usr/src/app

RUN npm install express --save
RUN npm install mongodb --save
RUN npm install cors --save
RUN npm install nodemailer --save
RUN npm install express-session --save
RUN npm install connect-mongodb-session --save

COPY server.js /usr/src/app/server.js

CMD ["node", "server.js"]