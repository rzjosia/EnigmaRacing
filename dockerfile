FROM node:lts-alpine

LABEL maintainer = 'rzjosia@gmail.com'

ARG TZ
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apk add --no-cache bash shadow

RUN mkdir app

WORKDIR /app

RUN yarn global add firebase-tools
RUN export PATH="$(yarn global bin):$PATH"

EXPOSE 4000
EXPOSE 5000
EXPOSE 5001
EXPOSE 8080
EXPOSE 8085
EXPOSE 9000
EXPOSE 9005
EXPOSE 9099
EXPOSE 9199
EXPOSE 3000

ARG USER_ID
ARG GROUP_ID
RUN export UID=`echo $USER_ID`
RUN export GID=`echo $GROUP_ID`
RUN usermod -u $USER_ID node
RUN chown node:node -R ./

CMD '/bin/bash'