const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const port = process.env.PORT || 8080;

const cors = require('cors');

// install express
const app = express();

app
  .use(bodyParser.json())
  .use(cors())
  .use('/', require('./route'));


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