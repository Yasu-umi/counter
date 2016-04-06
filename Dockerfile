FROM ubuntu:14.04
MAINTAINER "Yasu_umi Nishikawa" <yasu.umi.19910101@gmail.com>

RUN apt-get update -y
RUN apt-get install -y \
        psmisc \
        monit \
        openssh-server \
        nodejs \
        npm \
        nginx \
        software-properties-common
RUN update-alternatives --install /usr/bin/node node /usr/bin/nodejs 10 && \
    npm install -g npm

# Create users
RUN useradd -d /home/counter -m -s /bin/bash counter && \
    echo counter:counter | chpasswd && \
    usermod -G adm,dialout,cdrom,floppy,sudo,audio,dip,video,plugdev,netdev counter && \
    echo 'counter ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers && \
    mkdir /home/counter/.ssh

# Configure SSH
ADD config/authorized_keys /home/counter/.ssh/authorized_keys
ADD config/sshd_config     /etc/ssh/sshd_config
# SSH login fix. Otherwise user is kicked off after login
RUN chown -R counter:counter /home/counter/.ssh && \
    chmod 700 /home/counter/.ssh && \
    sed 's@session\s*required\s*pam_loginuid.so@session optional pam_loginuid.so@g' -i /etc/pam.d/sshd

# Configure monit
ADD config/monitrc /etc/monit/monitrc
RUN chmod 700 /etc/monit/monitrc

RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10 && \
    echo "deb http://repo.mongodb.org/apt/ubuntu "$(lsb_release -sc)"/mongodb-org/3.0 multiverse" | \
    tee /etc/apt/sources.list.d/mongodb-org-3.0.list && \
    apt-get update && \
    apt-get install -y mongodb-org
RUN mkdir -p /var/db

# monit configs
ADD config/*.monit.conf /etc/monit/conf.d/

# nginx config
ADD config/nginx.default.conf /etc/nginx/sites-enabled/default

# deploy node app
ADD app/ /var/www
WORKDIR /var/www
RUN npm install

# scripts
ADD config/start.sh /root/start.sh
ADD config/init.d-node /etc/init.d/node

EXPOSE 80 3000 22022 27017

CMD ["/bin/sh", "/root/start.sh"]
