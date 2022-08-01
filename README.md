# Retroboard backend app
A backend for the retroboard webapp located [here](https://github.com/tkazbekov/retroboard)

## How to run
To run this backend, you will require a MongoDB instance running.

All needed configuration is available in the `.env` file

To start the app run the following commands:
```console
npm i
npm run serve
```

## Build

To start the app run the following commands:
```console
npm i
npm run build
```
## Running MongoDB from a Docker image
`docker run -dp 27017:27017 -v /my/local/dir:/data/db --name local-mongo --restart=always mongo`
This command will run MongoDB on default port of 27017 and persist the database in your `/my/local/dir` directory
