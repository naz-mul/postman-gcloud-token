FROM node:14
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm ci --only=production
COPY . .

RUN curl -sSL https://sdk.cloud.google.com | bash
ENV PATH $PATH:/root/google-cloud-sdk/bin

EXPOSE 80
CMD [ "node", "server.js" ]
