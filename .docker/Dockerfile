ARG NGINX_IMAGE

FROM ${NGINX_IMAGE}

ARG APP_ENV
ENV APP_ENV=$APP_ENV

COPY .docker/nginx/default_$APP_ENV.conf etc/nginx/conf.d/default.conf

WORKDIR /usr/share/nginx/html

RUN apk add apache2-utils

ARG DIST_DIR
COPY $DIST_DIR .

ARG BASIC_USER
ARG BASIC_PASS
ENV BASIC_USER=$BASIC_USER
ENV BASIC_PASS=$BASIC_PASS

RUN echo "APP_ENV = $APP_ENV"

RUN if [ "$APP_ENV" != "production" ] ; then htpasswd -bc /etc/nginx/.htpasswd $BASIC_USER $BASIC_PASS; else echo 'app in production mod'; fi

RUN apk del apache2-utils
