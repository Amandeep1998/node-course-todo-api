const expect = require('expect');
const request = require('supertest');

var {Todo} = require('./../models/todo.js');
var {app} = require('./../server');

const todos = [{
    text : 'First item in the todo'
  }, {
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
