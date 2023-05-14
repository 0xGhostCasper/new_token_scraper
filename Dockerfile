FROM node:slim

# Create app directory
WORKDIR /usr/src/app

# Bundle app source

COPY ["package.json", "package.json"]
COPY ["package-lock.json", "package-lock.json"]

RUN npm install

COPY . .

CMD ["npm", "run", "start" ]