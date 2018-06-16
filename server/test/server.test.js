const expect = require('expect');
const request = require('supertest');

var {ObjectID} = require('mongodb');
var {Todo} = require('./../models/todo.js');
var {app} = require('./../server');

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

beforeEach((done) => {
  Todo.remove({}).then(() => {
     Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  var text = 'This is a text';

  it('should create a new todo', (done) => {
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if(err) {
          return done(err);
        }

        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  });
  it('should not create todo with invalid body data', (done) => {
      request(app)
        .post('/todos')
        .send({})
        .expect(400)
        .end((err, res) => {
          if(err) {
            return done(err);
          }

          Todo.find().then((todos) => {
            expect(todos.length).toBe(2);
            done();
          }).catch((e) => done(e));
        });
  });
});

describe('GET /todos/:id', () => {
  it('should return todo doc', (done) => {
    request(app)
      .get(`/todos/${todos[0]._id.toHexString()}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .get(`/todos/${new ObjectID().toHexString}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if ID is invalid', (done) => {
    request(app)
    .get(`/todos/123`)
    .expect(404)
    .end(done);
  })
});

describe('Delete/todos/:id', () => {
  it('should delete a todo', (done) => {
    var hexID = todos[1]._id.toHexString();

    request(app)
      .delete(`/todos/${hexID}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(hexID);
      })
      .end((err, result) => {
        if(err){
          return done(err);
        }
        Todo.findById(hexID).then((todo) => {
          expect(todo).toBeFalsy();
          done();
        }).catch((e) => done(e));
      });
  });
  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/${new ObjectID().toHexString}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 if ID is invalid', (done) => {
    request(app)
    .delete(`/todos/123`)
    .expect(404)
    .end(done);
  });
});

describe('PATCH/todos/:id', () => {
  it('should update the todo', (done) => {
    var id = todos[0]._id.toHexString();
    request(app)
     .patch(`/todos/${id}`)
     .send({text : 'Updated todo', completed: true})
     .expect(200)
     .expect((res) => {
       expect(res.body.todo.text).not.toBe(todos[0].text);
       expect(res.body.todo.completed).toBe(true);
       expect(typeof res.body.todo.completedAt).toBe('number');
     })
     .end(done);
  });

  it('should clear completedAt when completed is false', (done) => {
      var id = todos[1]._id.toHexString();
    request(app)
      .patch(`/todos/${id}`)
      .send({text: 'Updated second todo', completed: false})
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).not.toBe(todos[1].text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toBeFalsy();//upgrade of toNotExist()
      })
      .end(done);
  });

});
