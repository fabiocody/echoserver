# EchoServer

A simple server that echoes requests.

## How to run

- Make sure you have `node` and `npm` installed.
- Run `npm install` to install the dependencies.
- Run `npm start` to start up the server.

The server logs each `GET` and `POST` requests made to the `/` endpoint.
The same object that gets logged is also sent as a response.

## Docker

```bash
docker run --rm -p 8080:8080 ghcr.io/fabiocody/echoserver
```
