const mongoose = require('mongoose'),
      bcrypt = require('bcryptjs'),
      config = require('../config/database');

const ProductSchema = mongoose.Schema({
    pname : { type : String  },
    imageUrl : {type : String, required : true },
    quantity : {type : Number, required : true },
  
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.getAllProducts = function (callback) {

  Product.find({},callback);
};

module.exports.getProductsById = function (id,callback) {

  Product.findById(id,callback);
  
};