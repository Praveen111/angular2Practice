const mongoose = require('mongoose'),
      randomate = require('randomatic'),
      config = require('../config/database');
//mongoose.Promise = Promise;
//Users schem


const CartSchema = mongoose.Schema({
    _id : { type : Number}, 
    userid : { type : String  },
    products : {type : Array, default : [] }
   
});

const Cart = module.exports = mongoose.model('Cart', CartSchema);


module.exports.findCartItemsByCartId = function (id,callback) {

  Cart.findById(id,callback);
}

module.exports.addItemToCart = function (newCart,callback) {
  
   newCart.save(callback); 
}


module.exports.findCartByUserId = function (userid,callback) {
  
   Cart.findOne({userid : userid},callback); 
}


module.exports.createCartIDForUser = function(cart,callback){
  let cartId = randomate('0000');
  console.log('Cart ID:',cartId);

}