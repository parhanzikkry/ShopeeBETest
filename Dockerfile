# the image we need for nodejs application
FROM node:8

# create app directory for this application
WORKDIR /usr/src/app

# copy file package json
COPY package*.json ./

# after build the container run npm install
RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]