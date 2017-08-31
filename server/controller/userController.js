var userModel = require('../models/userModel')

var createUser = function(req, res){
  user = new userModel();
  user.username = req.body.username
  user.password = req.body.password
  user.email = req.body.email
  user.createdAt = new Date();
  user.updatedAt = new Date()


  user.save(function(err){
    if(!err){
      res.send(user)
    }
    else {
      res.send(err)
    }
  })
}


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
