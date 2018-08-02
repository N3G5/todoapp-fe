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

# Expose the application ports
EXPOSE 9075

# Because we build from a windows host, adapt file exec flags
RUN find /etc/nginx/ -type f -exec chmod a-x {} \;	

# ensure www-data user exists
RUN set -x \
       && adduser -u 82 -D -S -G root www-data

# Adapt access rights for users which have an effective GID of 0. 
# This is required because OpenShift runs containers with random users which have an effective ID of 0
RUN touch /var/run/nginx.pid \
   && chown -R www-data:root /var/run/nginx.pid \
   && chown -R www-data:root /var/cache/nginx \
   && chmod -R g+w /var/run/nginx.pid \
   && chmod -R g+w /var/cache/nginx

# Ensure to run as non-root
USER www-data