FROM node:alpine

# create app directory 
RUN mkdir -p /usr/src/app 
WORKDIR /usr/src/app 

#install botkit 
RUN npm install botkit --save 
COPY bot.js /usr/src/app
COPY package.json /usr/src/app
COPY package-lock.json /usr/src/app
RUN npm install

COPY components/ /usr/src/app/components
COPY skills/ /usr/src/app/skills
COPY service/ /usr/src/app/service
COPY .env /usr/src/app

#set startup commands

EXPOSE 3000
CMD ["node", "bot"]
