FROM amazonlinux
RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN yum install -y gzip
RUN yum install -y tar
ENV NODE_VERSION 10.7.0
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash \
&& export NVM_DIR="$HOME/.nvm" \
&& . $NVM_DIR/nvm.sh \
&& nvm install v$NODE_VERSION \
&& nvm alias default $NODE_VERSION \
&& nvm use default
ENV NVM_DIR /root/.nvm
ENV NODE_PATH $NVM_DIR/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH
WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app
#RUN npm run test
CMD PORT=8080 VER='1.0' npm run start-prod
EXPOSE 8080
