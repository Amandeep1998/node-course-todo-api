const{ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

var id = '5b238c433b454f3acc4d5096';

if(!ObjectID.isValid(id)) {
  console.log('ID not found');
}

Todo.find({
    _id: id
}).then((todos) => {
  console.log('Todos by find', todos);
});

Todo.findOne({
  _id: id
}).then((todos) => {
  console.log('Todos by findOne', todos);
});

Todo.findById(id).then((todos) => {
  if(!todos) {
    return console.log('Id not found');
  }
  console.log('Todos by findById', todos);
}).catch((e) =>console.log(e));

User.findById('5b22a99c61ea7e47b095d7c4').then((user) => {
  if(!user) {
    return console.log('User not found');
  }

  console.log(user);
}).catch((e) => {
  console.log(e);
});
