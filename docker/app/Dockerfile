ARG NODE_VERSION=18.16.0
ARG NODE_IMAGE_TYPE=slim

ARG HTTP_PROXY=""
ARG HTTPS_PROXY=""
ARG NO_PROXY="localhost,127.0.0.*"

ARG APP_NAME="sample_project"
ARG APP_ENV="development"
ARG APP_URL="http://localhost:3000"
ARG TZ="Asia/Dhaka"
ARG APP_PORT="3000"
ARG NODE_TLS_REJECT_UNAUTHORIZED="0"
ARG USE_HTTPS="true"
ARG LOG_LEVEL="debug"
ARG LOG_LOCATION="/usr/src/app/src/storage/logs/logger.log"
ARG LOG_MAX_KEEP="14d"
ARG LOG_MAX_SIZE="100m"
ARG CERT_LOCATION="/etc/ssl/certs/"

ARG MAINTAINER="Shakib Mostahid"

FROM node:${NODE_VERSION}-${NODE_IMAGE_TYPE}

LABEL maintainer=${MAINTAINER}

ENV APP_NAME="${APP_NAME}" \
    APP_ENV="${APP_ENV}" \
    APP_URL="${APP_URL}" \
    TZ="${TZ}" \
    APP_PORT="${APP_PORT}" \
    NODE_TLS_REJECT_UNAUTHORIZED="${NODE_TLS_REJECT_UNAUTHORIZED}" \
    USE_HTTPS="${USE_HTTPS}" \
    LOG_LEVEL="${LOG_LEVEL}" \
    LOG_LOCATION="${LOG_LOCATION}" \
    LOG_MAX_KEEP="${LOG_MAX_KEEP}" \
    LOG_MAX_SIZE="${LOG_MAX_SIZE}" \
    CERT_LOCATION="${CERT_LOCATION}" \

# Proxy
ENV http_proxy="${HTTP_PROXY}" \
    https_proxy="${HTTPS_PROXY}" \
    no_proxy="${NO_PROXY}"

# Apt install, openssl setup
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y openssl vim curl telnet && \
    apt-get autoremove -y && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

WORKDIR /usr/src/app

# SSL Certs
RUN mkdir -p /etc/ssl/certs
COPY ./docker/.commons/certs/certs/* /etc/ssl/certs/

COPY ../codes /usr/src/app

COPY . ../codes

# Set Proxy
RUN if [ ! -z "${HTTP_PROXY}" ]; then \
        npm config set proxy "${HTTP_PROXY}" && \
        yarn config set proxy "${HTTP_PROXY}" \
    ;fi && \
    if [ ! -z "${HTTPS_PROXY}" ]; then \
        npm config set https-proxy "${HTTPS_PROXY}" && \
        yarn config set https-proxy "${HTTPS_PROXY}" \
    ;fi

RUN npm install

EXPOSE 8081
EXPOSE 8082

RUN npm run tsc

#CMD ["node", "www/server"]
CMD ["npm", "run", "start"]

