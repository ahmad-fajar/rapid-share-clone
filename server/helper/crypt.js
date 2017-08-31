'use strict'

const crypto = require('crypto');

let crypt = (pass, salt) => {
  const cypher = crypto.createCipher('aes192', salt);
  let crypted = cypher.update(pass, 'utf8', 'hex');

  crypted += cypher.final('hex');

  return crypted;
};


// should you need it
let decrypt = (hashed, salt) => {
  const decipher = crypto.createDecipher('aes192', salt);
  let decrypted = decipher.update(hashed, 'hex', 'utf8');

  decrypted += decipher.final('utf8');

  return decrypted;
}

module.exports = crypt
