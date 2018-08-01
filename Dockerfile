# Use a multi-stage build to seperate the builder image from the application
FROM nginx:1.15-alpine

# File author / maintainer
LABEL maintainer="Dr. Nina Geiger <nina.geiger@yatta.de>"

# install nodejs
RUN apk update && \ 
	apk add nodejs python2 make g++ rsync && \
	npm install

WORKDIR /app

COPY package*.json /app/

RUN npm install
COPY ./ /app/
ARG configuration=production
RUN npm run build -- --output-path=/usr/share/nginx/html --configuration $configuration

COPY  /nginx.conf /etc/nginx/conf.d/default.conf