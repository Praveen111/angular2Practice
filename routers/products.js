const express = require("express"),
      router = express.Router(),
      passport = require('passport'),
      jwt = require('jsonwebtoken')
      config = require('../config/database'),
      Product = require('../models/product');

router.get('/getproducts', (req,res) => {
    Product.find({},(error,products)=>{
        if(error) throw error
        else{
             console.log("results :",products);
            res.json(products);
        }
            
        })
});

router.post('/getproductById/', (req,res) => {
    console.log('Product ID:',req.body._id);
    Product.getProductsById({_id:req.body._id},(error,product)=>{
        if(error) throw error
        else{
             console.log("getProductsById results :",product);
            res.json(product);

        }
            
        })
});

module.exports = router;