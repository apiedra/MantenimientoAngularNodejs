FROM sebaplaza/node-oracle:8
LABEL authors="Alejandro Piedra"
#RUN yum install oracle-instantclient18.3-basic-18.3.0.0.0-2.x86_64.rpm

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 8080
CMD [ "npm", "start" ]