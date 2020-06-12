const {Schema, model} = require('mongoose');
const schema = new Schema({
  title: {
    type: String
  },
  body: {
    type: String
  },
  price: {
    type: Number
  }
});

module.exports = model('Product',schema);
