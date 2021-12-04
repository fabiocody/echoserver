# syntax=docker/dockerfile:1

## BUILD
FROM golang:1.17 AS build
WORKDIR /app
COPY go.mod ./
COPY go.sum ./
RUN go mod download
COPY *.go ./
RUN CGO_ENABLED=0 go build -o /echoserver

## Deploy
FROM gcr.io/distroless/static
WORKDIR /
COPY --from=build --chown=nonroot:nonroot /echoserver /echoserver
USER nonroot:nonroot
ENTRYPOINT ["./echoserver"]
