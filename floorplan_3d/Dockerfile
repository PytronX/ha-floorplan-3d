ARG BUILD_FROM
FROM ${BUILD_FROM}

RUN apk add --no-cache python3 py3-aiohttp

ARG BUILD_VERSION
ENV FLOORPLAN_VERSION=${BUILD_VERSION}

COPY app /app
COPY www /app/www

CMD ["python3", "-u", "/app/main.py"]
