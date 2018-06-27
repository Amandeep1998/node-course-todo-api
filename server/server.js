require('./config/config');

const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ =  require('lodash');
const bcrypt = require('bcryptjs');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');
var {authenticate} = require('./middleware/authenticate');
const port = process.env.PORT;

var app = express();

app.use(bodyParser.json());

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text : req.body.text
  });
  todo.save().then((docs) => {
    res.send(docs);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/todos', (req, res) => {
  Todo.find().then((todos) => {
    res.send({todos});
  }, (err) =>{
      res.status(400).send(err);
  });
});

app.get('/todos/:id', (req, res) => {
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }
  Todo.findById(id).then((todo) => {
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });

});

app.delete('/todos/:id', (req, res) => {
    var id = req.params.id;

    if(!ObjectID.isValid(id)) {
      return res.status(404).send();
    }

    Todo.findByIdAndRemove(id).then((todo) => {
      if(!todo) {
        return res.send(404).send();
      }
        res.status(200).send({todo});
    }).catch((e) => {
      res.status(400).send();
    });
});

app.patch('/todos/:id', (req, res) => {
  var id = req.params.id;
  var body = _.pick(req.body, ['text', 'completed']);

  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  if(_.isBoolean(body.completed) && body.completed) {
     body.completedAt = new Date().getTime();
  } else {
    body.completedAt = null;
  }
  Todo.findByIdAndUpdate(id, {
    $set: body
  },{new: true}).then((todo) => {
    if(!todo) {
     return res.status(404).send();
    }
    res.status(200).send({todo});
  }).catch((e) => res.status(400));
});

app.post('/users', (req, res) => {
  var body = _.pick(req.body, ['email', 'password']);
  var user = new User({
    email: body.email,
    password: body.password
  })
  user.save().then(() => {
    return user.generateAuthTokens();
    // res.send(val);
  }).then((token) => {
    res.header('x-auth', token).send(user);
  }).catch((e) => {
    res.status(400).send(e);
  });
})

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
})

//POST/users/login

app.post('/users/login', (req, res) => {
   var body = _.pick(req.body, ['email', 'password']);
   User.findByCredentials(body.email, body.password).then((user) => {
     return user.generateAuthTokens().then((token) => {
       res.header('x-auth', token).send(user);
     })
   }).catch((e) => {
     res.status(400).send();
   })
})



app.listen(port, () => {
  console.log('Starting server on port 3000');
});

module.exports = {app};
