FROM node:15.11.0-buster-slim

WORKDIR /app

RUN npm i -g typescript

RUN yarn

CMD [ "/bin/bash", "-c", "yarn && yarn build" ]
