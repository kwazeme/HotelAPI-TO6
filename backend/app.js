
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const port = process.env.PORT || 8080;
const { auth } = require('express-openid-connect');

const cors = require('cors');

//Joseph Garner: 10-17-22 ------------------------------------------------------------------------

const dotenv = require("dotenv");
dotenv.config();

//------------------------------------------------------------------------------------------------

// install express
const app = express();

app
  .use(bodyParser.json())
  .use(cors());

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: SECRET,
  baseURL: BASE_URL,
  clientID: CLIENTID,
  issuerBaseURL: ISSUER_BASE_URL
};

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(auth(config));
//.use(auth(config));

//Joseph Garner: 10-17-22 ------------------------------------------------------------------------

// req.isAuthenticated is provided from the auth router
app.get('/', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.use('/', require('./route'));
//-----------------------------------------------------------------------------------------

process.on('uncaughtException', (err, origin) => {
  console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`localhost:${port}/api-docs`)
  }
});