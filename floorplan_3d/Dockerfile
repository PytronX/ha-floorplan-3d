ARG BUILD_FROM
FROM ${BUILD_FROM}

RUN apk add --no-cache python3 py3-aiohttp

COPY app /app
COPY www /app/www

ARG BUILD_VERSION
RUN echo "${BUILD_VERSION}" > /app/VERSION

# Run the service directly instead of under s6-overlay so it keeps the
# container environment (SUPERVISOR_TOKEN).
ENTRYPOINT []
CMD ["python3", "-u", "/app/main.py"]
