const mongoose = require('mongoose'),
      bcrypt = require('bcryptjs'),
      config = require('../config/database');
//mongoose.Promise = Promise;
//Users schems

const UserSchema = mongoose.Schema({
    name : { type : String  },
    email : {type : String, required : true },
    username : {type : String, required : true },
    password : {type : String, required : String }
});

const User = module.exports = mongoose.model('User', UserSchema);


module.exports.getUsersById = function (id,callback) {

  User.findById(id,callback);
}

module.exports.getUsersByUsername = function (username,callback) {

 console.log( "Username:", username)
  User.find({username : username},callback);
}

module.exports.addUser = function (newUser, callback){
    console.log('hitting addUser method',newUser);
    bcrypt.genSalt(10, (err, salt) =>{
    bcrypt.hash(newUser.password,salt, (err,hash)=>{
       if(err) throw err
       newUser.password = hash;
       newUser.save(callback);
    });
});

}

module.exports.comparePassword = function(candidatePassword,hash,callback) {
 console.log("candidate password :",candidatePassword);
 console.log("hash value:",hash);
  bcrypt.compare(candidatePassword,hash,(err,isMatch)=>{
    if(err) throw err;
    console.log("isMatch value",isMatch);
     callback(null,isMatch);
  })
};