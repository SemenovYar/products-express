const Product = require('../models/product-crud-model');
const ProductSchema = require('../models/product-schema');

exports.all = (req, res) => {
  Product.all((err, docs) => {
    if(err){
      console.log(err);
      return res.status(500)
    }
    res.send(docs)
  })
};

exports.allWithPaginate = (req, res) => {
  const {page, perPage} = req.query;
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10
  };
  ProductSchema.paginate({}, options,(err, docs) => {
    if(err){
      console.log(err);
      return res.status(500)
    }
    res.send(docs)
  })
};

// exports.filterByPrice = (req, res) => {
//   const {minPrice, maxPrice} = req.query;
//   const option = {price: {}};
//
//   if(minPrice){
//     option.price.$gte = parseInt(minPrice);
//   }
//   if (maxPrice) {
//     option.price.$lte = parseInt(maxPrice);
//   }
//
//   ProductSchema.find(option,(err, docs) => {
//     if(err){
//       console.log(err);
//       return res.status(500)
//     }
//     res.send(docs)
//   })
//     //.sort({weight: -1}) //сортировка по убыванию
// };

exports.filterByPrice = (req, res) => {
  const {minPrice, maxPrice} = req.query;

  ProductSchema
    .find()
    .where('price')
    .gte(minPrice || 0 ).lte(maxPrice || 1000000 ) // попытался оптимизировать, но не знаю принято ли так у бэкендщиков =)
    .sort('price')
    .exec((err, docs) => {
    if(err){
      console.log(err);
      return res.status(500)
    }
    res.send(docs)
  });
};


// exports.findByString = (req,res) => {
//   const {string} = req.query;
//   const regString = { $regex: string, $options: "ig" };
//   ProductSchema
//     .find({$or: [{ title: regString }, { body: regString }] })
//     //.sort(score)
//     .exec((err, docs) => {
//     if(err){
//       console.log(err);
//       return res.status(500)
//     }
//     res.send(docs)
//   });
// };

exports.findByString = (req,res) => {
  const {string} = req.query;
  ProductSchema
    .find({$text: {$search: string}}, {score: {$meta:"textScore"}})
    .sort({score: {$meta:"textScore"}})
    .exec((err, docs) => {
      if(err){
        console.log(err);
        return res.status(500)
      }
      res.send(docs)
    });
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