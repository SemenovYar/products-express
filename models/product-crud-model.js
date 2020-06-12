const Product = require('./product-schema');

exports.all = (cb) => {
  Product.find((err, docs) => {
    cb(err, docs)
  })
};

exports.create = (product,cb) => {
  Product.create(product,(err, docs) => {
    cb(err, docs)
  })
};

exports.findById = (id,cb) => {
  Product.findById(id, (err, doc) => {
    cb(err, doc)
  })
};

exports.update = (id,newData,cb) => {
  Product.findByIdAndUpdate(id,newData, (err,result) => {
    cb(err, result)
  })
};

exports.delete = (id, cb) => {
  Product.findByIdAndDelete(id, (err,result) => {
    cb(err, result)
  })
};