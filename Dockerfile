FROM node:6.9.5

ENV APP_DIR /app

RUN apt-get update -y \
    && apt-get install -y apt-transport-https \
    && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" | tee /etc/apt/sources.list.d/yarn.list \
    && apt-get update -y \
    && apt-get install -y yarn \
    && rm -rf /var/lib/apt/lists/*

RUN apt-get update -y \
    && apt-get install -y unzip \
    && cd /usr/local \
    && curl -fsSL -O https://github.com/google/protobuf/releases/download/v3.2.0/protoc-3.2.0-linux-x86_64.zip \
    && unzip protoc-3.2.0-linux-x86_64.zip \
    && rm protoc-3.2.0-linux-x86_64.zip readme.txt \
    && rm -rf /var/lib/apt/lists/*

WORKDIR "${APP_DIR}"

COPY ["package.json", "yarn.lock", "${APP_DIR}/"]
COPY ["build/*.zip", "${APP_DIR}/"]
RUN unzip -qo ts-main-*.zip \
  && rm ts-main-*.zip

CMD ["node", "main.js"]