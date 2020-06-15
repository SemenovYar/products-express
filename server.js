const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const config = require('./configs');
const routes = require('./routes');

async function start() {
  try {
    await mongoose.connect(config.get('dbLink'),
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false
      });
    console.log('MongoDb connected');
    app.listen(config.get('port'), config.get('host'), () => {
      console.log("Server start on " + config.get('host') + ":" + config.get('port'));
    });
  }
  catch (e) {
    console.log(e);
  }
}

// Middlewares
app.use(bodyParser.urlencoded({extended: true}));

// Routes
app.use('/api/products', routes.api.products);

start();