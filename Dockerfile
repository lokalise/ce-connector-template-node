# ---- Base Node ----
FROM node:22.11.0-bookworm-slim as base

RUN set -ex;\
    apt-get update -y; \
    apt-get install -y --no-install-recommends libssl3; \
    rm -rf /var/lib/apt/lists/*;

RUN mkdir -p /home/node/app
RUN chown -R node:node /home/node && chmod -R 770 /home/node
WORKDIR /home/node/app

# ---- Dependencies ----
FROM base AS dependencies

RUN set -ex; \
    apt-get update -y ; \
    apt-get install -y --no-install-recommends \
      ca-certificates \
      dumb-init \
      make \
      gcc \
      g++ \
      python3 \
      git \
      openssl
COPY --chown=node:node ./package.json ./package.json
COPY --chown=node:node ./package-lock.json ./package-lock.json
USER node
# install production dependencies
RUN set -ex; \
    npm ci --ignore-scripts
# separate production node_modules
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN set -ex; \
    npm install --ignore-scripts

# ---- Build ----
FROM dependencies as build

COPY --chown=node:node . .
RUN npm run build

# ---- App ----
FROM base as app

COPY --chown=node:node --from=build /home/node/app/dist .
COPY --chown=node:node --from=build /home/node/app/prod_node_modules node_modules

# ---- Rrelase ----
FROM base as release

COPY --from=build /usr/bin/dumb-init /usr/bin/dumb-init
COPY --chown=node:node --from=app /home/node/app /home/node/app

ARG GIT_COMMIT_SHA=""
ARG APP_VERSION=""

ENV GIT_COMMIT_SHA=${GIT_COMMIT_SHA}
ENV APP_VERSION=${APP_VERSION}
ENV NODE_ENV=production
ENV NODE_PATH=.

USER node
CMD ["dumb-init", "node", "--experimental-loader", "newrelic/esm-loader.mjs", "-r", "newrelic", "/home/node/app/src/server.js"]
