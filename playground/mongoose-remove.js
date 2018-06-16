const{ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

//Todo.findOneAndRemove
Todo.findByIdAndRemove('5b24a033e9710e34b4bb3099').then((doc) => {
  console.log(doc);
});

Todo.remove({}).then((doc) => {
  console.log(doc);
});
