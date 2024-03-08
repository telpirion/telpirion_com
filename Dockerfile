FROM golang:1.22

WORKDIR /

# pre-copy/cache go.mod for pre-downloading dependencies and only redownloading them in subsequent builds if they change
COPY go.mod go.sum ./
RUN go mod download && go mod verify

COPY images ./images
COPY gsrc ./gsrc
COPY ng ./ng
COPY favicon.ico ./favicon.ico
COPY telpirion.go ./telpirion.go

RUN go build -v -o telpirion_com
CMD ["./telpirion_com"]
EXPOSE 8080