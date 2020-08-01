FROM node:12

RUN mkdir /upload
RUN chown node:node /upload

WORKDIR /usr/src/app

COPY . .
#COPY package*.json ./
RUN npm install
#RUN npm install -g nodemon

EXPOSE 8080

#CMD ["nodemon", "app.js"]
CMD ["node", "/usr/src/app/src/app.js"]