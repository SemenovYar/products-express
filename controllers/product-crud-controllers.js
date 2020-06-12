const Product = require('../models/product-crud-model');
exports.all = (req, res) => {
  Product.all((err, docs) => {
    if(err){
      console.log(err);
      return res.status(500)
    }
    res.send(docs)
  })
};

exports.create = (req, res) => {
  const product = {
    body: req.body.body, title: req.body.title, price: req.body.price
  };
  Product.create(product, (err, docs) => {
    if(err){
      console.log(err);
      return res.status(500)
    }
    res.send(docs)
  })
};

exports.findById = (req, res) => {
  const id = req.params.id;
  Product.findById(id,(err, doc) => {
    if(err){
      console.log(err);
      return res.status(500)
    }
    res.send(doc)
  })
};

exports.update = (req, res) => {
  const id = req.params.id;
  const newData = {$set: {body: req.body.body, title: req.body.title, price: req.body.price}};
  Product.update(id,newData, (err, result) => {
    if (err){
      console.log(err);
      return res.status(500);
    }
    //res.sendStatus(200);
    res.send('Продукт с id: ' + id + ' успешно изменён');
  })
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Product.delete(id, (err, result) => {
    if (err){
      console.log(err);
      return res.status(500);
    }
    //res.sendStatus(200);
    res.send('Продукт с id: ' + id + ' успешно удалён');
  })
};