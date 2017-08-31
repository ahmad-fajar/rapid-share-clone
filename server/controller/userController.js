var userModel = require('../models/userModel')

// buat bikin user baru, otentifikasi, dan otorisasi
const crypt  = require('../helper/crypt');
const jwt    = require('jsonwebtoken');
const keygen = require('../helper/keygen');


var createUser = (req, res) => {
  // console.log(req.body);
  let salt   = keygen()
  let hashed = crypt(req.body.password, salt)

  let userdata = {
    username  : req.body.username,
    password  : hashed,
    salt      : salt
  }

  userModel.create(userdata)
  .then(user => {
    // console.log(user)
    let wrap = {
      id       : user._id,
      username : user.username
    }
    let token = jwt.sign(wrap, 'rapid')
    res.send({username: user.username, rapidToken: token})
  })
  .catch(e => {console.log(e);res.send(e)})
}  // end of createUser


var readUser = function(req, res){
  userModel.find(function(err, data){
    if(!err){
      res.send(data)
    }
    else {
      res.send(err)
    }
  })
}


var updateUser = function(req, res){
  userModel.findByIdAndUpdate({
    _id: req.params.id
  },{
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    updatedAt: new Date()
  })
  .then((data)=>{
    res.send(data)
  })
  .catch((err)=>{
    res.send(err)
  })
}

var deleteUser = function(req, res){
  userModel.findByIdAndRemove({
    _id:req.params.id
  })
  .then(()=>{
    res.send('data has been deleted')
  })
  .catch((err)=>{
    res.send(err)
  })
}


module.exports = {
  createUser,
  readUser,
  updateUser,
  deleteUser
}
