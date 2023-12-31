const apm = require('elastic-apm-node').start({
  serviceName: 'User',
  secretToken: 'ZDiacOeDt8kdC1Uh3I',
  serverUrl: 'https://2cb0819007ae40ce958e6cc4474ec415.apm.us-central1.gcp.cloud.es.io:443',
  environment: 'my-environment'
});

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const user = require("./routes/userRoutes");
const { logger } = require('elastic-apm-node');
require("dotenv").config();

const app = express();

app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, PUT, POST");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());

app.use("/", user);

mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL)
  .then(() => {
    app.listen(4003, () => {
      
      console.log(`Connected to DB and user service is Listening to 4003!`);
    });
  })
  .catch((error) => {
    console.log("Not connected!");
    console.log("reason : ", error);
  });
