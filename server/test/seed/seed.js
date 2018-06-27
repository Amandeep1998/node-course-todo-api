const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');

const {Todo} =  require('./../../models/todo');
const {User} = require('./../../models/user');

var userOneId = new ObjectID();
var userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'aman@example.com',
  password: 'useronepass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
  }]
}, {
  _id: userTwoId,
  email: 'nikh@example.com',
  password: 'usertwopass',
}];


var todos = [{
    _id: new ObjectID(),
    text : 'First item in the todo',
    completed: false,
    completedAt: null
  }, {
    _id: new ObjectID(),
    text : 'Second item in the todo',
    completed: true,
    completedAt: 123
  }];

  const populateTodos = (done) => {
    Todo.remove({}).then(() => {
       return Todo.insertMany(todos);
    }).then(() => done());
  }

  const populateUsers = (done) => {
    User.remove({}).then(() => {
      var userOne = new User(users[0]).save();
      var userTwo = new User(users[1]).save();

      return Promise.all([userOne,userTwo]);
    }).then(() => done());
  }

module.exports = {todos, populateTodos, users, populateUsers};
