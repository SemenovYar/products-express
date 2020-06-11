const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
const config = 'mongodb+srv://yar:y1a2r3@cluster0-yhbn4.gcp.mongodb.net/crudProducts';
const ProductController = require('./controllers/product-crud-controllers');
app.use(bodyParser.urlencoded({extended: true}));

async function start() {
  try {
    await mongoose.connect(config,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false
      });
    console.log('MongoDb connected');
    app.listen(port, () => {
      console.log('Server has been started on port: ' + port)
    });
  }
  catch (e) {
    console.log(e);
  }
}

app.get('/', function (req,res) {
  console.log(req.session);
  res.send("Hello API");
});

app.get('/products', ProductController.all);
app.post('/products', ProductController.create);
app.get('/products/:id', ProductController.findById);
app.put('/products/:id', ProductController.update);
app.delete('/products/:id', ProductController.delete);

start();