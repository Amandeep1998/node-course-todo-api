const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var password = '123abc';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log(hash);
  });
});

var resultHash ='$2a$10$nmgmNFSTVFsGFsXE7StJ1OCwhaFwswUYerJsjnxtEjt4YJ1/v45MK';

bcrypt.compare(password, resultHash, (err, res) => {
  console.log(res);
})

//
// var message = 'Hello I am number 3';
// var hash = SHA256(message);
//
// console.log(`Message : ${message}`);
// console.log(`hash : ${hash}`);
//
// var data = {
//   id: 4
// }
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
// }
//
// // token.data.id = 5;
// // token.hash = SHA256(JSON.stringify(token.data)).toString();
//
// var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();
//
// if(resultHash === token.hash) {
//   console.log('Data was not changed');
// } else {
//    console.log('Data was manipulated Dont Trust!');
// }
