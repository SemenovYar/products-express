const {Schema, model} = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');
const schema = new Schema({
  title: {
    type: String,
  },
  body: {
    type: String,
  },
  price: {
    type: Number
  }
});


schema.index({title: "text", body: "text"});
schema.plugin(mongoosePaginate);
module.exports = model('Product',schema);
