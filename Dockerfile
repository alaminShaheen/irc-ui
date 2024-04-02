FROM node:20.11.1-alpine
MAINTAINER IRC
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
ENV REACT_APP_NAME=irc-fup-ui
EXPOSE 3000
CMD ["npm", "run", "dev"]
