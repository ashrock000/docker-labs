FROM alpine:latest

RUN apk add --no-cache sqlite

WORKDIR /data

VOLUME /data

CMD ["sqlite3", "/data/database.sqlite"]
