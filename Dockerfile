FROM ubuntu:14.04
MAINTAINER "Yasu_umi Nishikawa" <yasu.umi.19910101@gmail.com>

RUN apt-get update -y
RUN apt-get install -y \
        monit \
        nodejs \
        npm \
        software-properties-common && \
    update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10 && \
    npm install -g npm

# install mongodb
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 && \
    echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | \
    tee /etc/apt/sources.list.d/mongodb-org-3.0.list && \
    apt-get update && \
    apt-get install -y mongodb-org
RUN mkdir -p /var/db

# monit configs
ADD config/*.monit.conf /etc/monit/conf.d/

# deploy node app
ADD app/ /var/www
WORKDIR /var/www

# scripts
ADD config/start.sh /root/start.sh
ADD config/app.sh /root/app.sh

EXPOSE 3000 6379 27017

CMD ["/bin/sh", "/root/start.sh"]
