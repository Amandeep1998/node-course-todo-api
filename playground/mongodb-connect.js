// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); //object destruction pulls MongoClient from the mongodb library

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) =>{
  if(err) {
    return console.log('Unable to connect to server');
  }
  console.log('Connected to the database server');

  const db = client.db('TodoApp');

  // db.collection('TodoApp').insertOne({
  //   text : 'Something to do',
  //   completed : false
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to insert data', err);
  //   }
  //   console.log(JSON.stringify(result.ops, null, 2));
  // })
  //

  db.collection('Users').insertOne({
    name: 'Amandeep',
    age: 19,
    location: 'Mumbai'
  }, (err, result) => {
    if(err) {
      return console.log('Unable to insert data');
    }
    console.log(JSON.stringify(result.ops, null, 2));
  });

  client.close();
});
