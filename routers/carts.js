const express = require("express"),
      router = express.Router(),
      passport = require('passport'),
      randomatic = require('randomatic')
      config = require('../config/database'),
      Product = require('../models/product'),
      Cart = require('../models/cart');


router.post('/cartItems', (req,res) => {
    console.log('Hitting /cartItems route');
    Cart.findCartItemsByCartId({_id : req.body._id},(error,cartItems)=>{
        if(error) throw error
        else{
             console.log("results :",cartItems);
            res.json(cartItems);
        }
            
        })
});

router.post('/getCartId',(req,res)=> {
    Cart.findCartByUserId({_id : req.body.userid},(error,cart)=>{
        if(error) throw error;
        else {
            res.json(cart._id);
        }
    })
})

// cart.createCartID((cartId)=>{
//     console.log('Cart ID:',cartId);
// })

router.post('/addCartItems', (req, res) => {

    var newCart1 = {
        userid: req.body.userid,
        products: req.body.products,
        

    };
    console.log('Inside /addItemToCart', req.body.userid);
    Cart.findCartByUserId(req.body.userid, (err, result) => {
        if (result) {
            console.log(result);

            console.log('findCartByUserId result:', result);

            newCart1._id = result._id;

            console.log('My new cart:', newCart1);
            Cart.findOneAndUpdate({
                _id: newCart1._id
            }, newCart1, {
                upsert: true
            }, (err, cart) => {
                if (err) throw err;
                res.json({
                    success: true,
                    cart: newCart1,
                    msg: 'successfully updated the cart'
                })
                //console.log('inside findOneAndUpdate:', cart);
            });

        } else {

            let newCart = new Cart({
                _id: randomatic('00000'),
                userid: req.body.userid,
                products: req.body.products

            });
            Cart.addItemToCart(newCart, (err, result) => {
                if (err) throw err;
                res.json({
                    success: true,
                    cart: result,
                    msg: 'Created new cart'
                })
            })
        }
    })

});

module.exports = router;