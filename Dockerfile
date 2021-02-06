FROM node:alpine

# create app directory 
RUN mkdir -p /usr/bebot 
WORKDIR /usr/bebot 

# install dependencies
COPY package.json /usr/bebot 
COPY package-lock.json /usr/bebot 
RUN npm ci --production

# copy src
COPY src/ /usr/bebot/src

# add secrets file (there's gotta be a better way)
COPY .env /usr/bebot

#set startup commands
EXPOSE 3000
CMD ["npm", "run", "start"]
