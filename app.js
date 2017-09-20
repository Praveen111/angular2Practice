const express = require("express"),
      path = require("path"),
    bodyParser = require("body-parser"),
    cors = require("cors"),
    passport = require("passport"),
    mongoose = require("mongoose");
const config = require('./config/database');


const MongoClient = require('mongodb').MongoClient
  , Logger = require('mongodb').Logger
  , assert = require('assert'),
    url = config.database;



const app = express();
const users = require('./routers/users'),
      products = require('./routers/products'),
      cart = require('./routers/carts');

const PORT = 4020;

app.use(cors());
// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }));
 
// parse application/json 
app.use(bodyParser.json());

//set static contents to be served
app.use(express.static('public'));

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

 mongoose.connect(config.database);

 mongoose.connection.on("connected", ()=>{
     console.log("Connected to DB",config.database)
 });

mongoose.connection.on("error", (err)=>{
     console.log("not able to connect",err)
 });



app.use('/users',users);
app.use('/products',products);
app.use('/cart',cart);
app.get('/', function(req,resp){

    resp.send("Hello World!!!");
});

app.listen(PORT, () =>{
    
        console.log(" server running at port : 4020");

});
