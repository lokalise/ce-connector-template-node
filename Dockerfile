FROM node:18.8.0-alpine3.16 as base

FROM base as build
WORKDIR /srv

RUN apk update && apk add --no-cache git && npm install pm2@5.1.1 --location=global

COPY package.json package-lock.json ./
RUN npm install

COPY . ./
RUN npm run prepublishOnly

FROM base as app
WORKDIR /srv

RUN apk update && apk add --no-cache git

COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts
COPY --from=build /srv/dist/ ./
COPY --from=build /usr/local/lib/node_modules/ /usr/local/lib/node_modules/

RUN /usr/local/lib/node_modules/pm2/bin/pm2 install pm2-metrics

RUN touch /var/log/node.log && \
    touch /srv/npm-debug.log

ENV PM2_WORKERS_NUMBER=max

CMD /usr/local/lib/node_modules/pm2/bin/pm2-runtime start /srv/server.js -i $PM2_WORKERS_NUMBER
