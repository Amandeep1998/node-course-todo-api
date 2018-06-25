const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 5
}

var token = jwt.sign(data, '123abc');
var decoder = jwt.verify(token, '123abc');
console.log(decoder);

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
