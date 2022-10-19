
const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const port = process.env.PORT || 8080;

const cors = require('cors');

//Joseph Garner: 10-17-22 ------------------------------------------------------------------------
      
      const dotenv = require("dotenv");
      dotenv.config();
      
//------------------------------------------------------------------------------------------------

// install express
const app = express();
const { auth } = require('express-openid-connect');
app
  .use(bodyParser.json())
  .use(cors())
  .use('/', require('./route'))
  .use(auth(config));

//Joseph Garner: 10-17-22 ------------------------------------------------------------------------
          const config = {
            authRequired: false,
            auth0Logout: true,
            secret: process.env.SECRET,
            baseURL: process.env.BASE_URL,
            clientID: process.env.CLIENTID,
            issuerBaseURL: process.env.ISSUER_BASE_URL,
          };
          //const route = require('./route');
            app.use(auth(config));

            app.get('/',(req,res)=>
              {
                  res.send(req.oidc.isAuthenticated()?'logged in':'logged out');
              }
            );
            //app.use(route);
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