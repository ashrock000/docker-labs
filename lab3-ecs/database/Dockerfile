FROM alpine:latest

RUN apk add --no-cache sqlite

WORKDIR /data

VOLUME /data

CMD ["sh", "-c", "sqlite3 /data/database.sqlite && tail -f /dev/null"]
