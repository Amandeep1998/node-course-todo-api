const expect = require('expect');
const request = require('supertest');

var {ObjectID} = require('mongodb');
var {Todo} = require('./../models/todo.js');
var {app} = require('./../server');

var todos = [{
    _id: new ObjectID(),
    text : 'First item in the todo'
  }, {
    _id: new ObjectID(),
    text : 'Second item in the todo'
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
