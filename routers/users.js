const express = require("express"),
      router = express.Router(),
      passport = require('passport'),
      jwt = require('jsonwebtoken')
      config = require('../config/database'),
      User = require('../models/user');

router.post('/register',(req, res) => {
  
    let newUser = new User({
      name : req.body.name,
      email : req.body.email,
      username : req.body.username,
      password : req.body.password
  });

  User.addUser(newUser, function(err,result){
      if(err){
          res.json({success : false , msg : 'failed to register'})
      }

      else {
          res.json({success : true , msg : 'successfully registered'})
      }
  })
});

router.post('/authenticate',(req, res, next) => {
  const username = req.body.username,
        password = req.body.password;
    console.log(username + password);
    User.getUsersByUsername(username, (err,user) => {
      console.log("User result :",user.length )
       if(err) throw err;

       if(user.length == 0) {
         return res.json({success : false , msg : 'User not available'})
       }
           
           User.comparePassword(password,user[0].password,(err,isMatch)=> {
             if(err) throw err;

             if(isMatch){
               console.log("inside comparePassword :")
               const token = jwt.sign(user[0], config.secret, {
                 expiresIn : 604800
               });

                res.json({ 
                        success : true,
                        msg : 'Hurray!!! Successfully logged in',
                        token : 'Bearer ' + token,
                        user : {
                             id : user[0]._id,
                             name : user[0].name,
                             username : user[0].username,
                             email : user[0].email
                        }
                      })
             } 
             else {
                return res.json({success : false , msg : 'Wrong password'})
             }

            
           });
    });
  
});

// passport.authenticate('jwt',{session : false})
router.get('/profile', passport.authenticate('jwt-bearer',{ session : false } ), (req, res) => {
  //console.log("hitting /profile",req);
  res.json({user : req.user});
});



router.get('/login',(req, res) => {
  res.send("coming from /register");
});



module.exports = router;