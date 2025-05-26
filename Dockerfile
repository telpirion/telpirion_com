FROM golang:1.24-alpine AS builder


WORKDIR /

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY images ./images
COPY content ./content
COPY internal ./internal
COPY static ./static
COPY templates ./templates
COPY favicon.ico ./favicon.ico
COPY main.go ./main.go

RUN go build -v -o telpirion_com
CMD ["./telpirion_com"]
EXPOSE 8080