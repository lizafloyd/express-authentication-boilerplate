# Express Authentication Boilerplate
This is a basic user authentication boilerplate made with [NodeJS](https://nodejs.org/en/) using [Express](https://expressjs.com/) and [MongoDB](https://www.mongodb.com/). This application allows you to make a POST request to either a signin or signup endpoint allowing you to register, and re-authenticate. Both endpoints return a [JSON Web Token (JWT)](https://jwt.io/) which can be used in a Front-End application.

## Getting Started
This application can be installed via npm by running `npm install`. You'll need to also install [MongoDB](https://www.mongodb.com/) for the database which will store your users. With both installed run `mongod` first followed by `node index.js` to start the server on port `3090`. 

If you get a permissions error related to the `/data/db` directory it may be necessary to run the command listed [here](data/db/README.md).

For security purposes you'll also need to adjust the `secret` value found within `config.js`. Leaving it as its default value is **highly unrecommended**.

## Endpoints
There's two POST endpoints that are provided and one GET endpoint.

### Signup
The  `/signup` endpoint expects a JSON object containing both an email address and password, once recieved it encrypts and stores the information in the database and returns a token. If you attempt to signup with an email that already exists in the database the server will reject it and return an error.

### Signin
The `/signin` endpoint also expects a JSON object containing both an email address and password, once recieved it checks if the user exists and if the provided password matches that of the one in the database. If it doesn't the server will reject the signin request and return an unauthorized error. If it does match the server will return a token.

Below is an example of the type of JSON object the endpoints expect.

```
{
  "email": "example@example.com",
  "password": "1323"
}
```

### Private
If authenticated you're able make a GET request to `/private` to get a piece of data returned from the server. You can modify the returned data within `router.js`.

## Client
Within the `client` directory of this repository is a simple [React](https://reactjs.org/) application that makes use of this boilerplate and its endpoints. To install it please visit the provided [readme file](client/README.md).
