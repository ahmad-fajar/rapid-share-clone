'use strict'

const jwt = require('jsonwebtoken');
const secret = process.env.SECRET;

// is admin and only admin
exports.isAdmin = (req, res, next) => {
  let token = req.headers.token;

  if (token == undefined) return res.send('login dulu om..')

  jwt.verify(token, secret, (err, decrypted) => {
    // console.log(decrypted);
    if(decrypted.role === 'admin') {
      next();
    } else {
      res.send('Insufficient right');
    }
  });
};


// is current user or admin
exports.isCurrentUser = (req, res, next) => {
  let token = req.headers.token;

  if (token == undefined) return res.send('login dulu om..');

  jwt.verify(token, secret, (err, decrypted) => {
    if(decrypted.role === 'user') {
      if(decrypted.id == req.params.id) {
        next();
      }
    } else if (decrypted.role === 'admin') {
      next();
    } else {
      this.user = false
      res.send('Not your account');
    }
  })
};