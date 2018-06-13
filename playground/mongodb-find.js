const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
    return console.log('Unable to connect to database server');
  }

  console.log('Connected to database server');

  const db = client.db('TodoApp');

  // db.collection('TodoApp').find({
  //   _id: new ObjectID('5b20fce7ed4c811394669e83')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, null, 2));
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to fetch data', err);
  //   }
  // });
  // db.collection('TodoApp').find().count().then((count) => {
  //   console.log(`Todos count: ${count}`);
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to fetch data', err);
  //   }
  // });
  // db.collection('Users').find({name: 'Amandeep'}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, null, 2));
  // }, (err) => {
  //   if(err) {
  //     console.log('Unable to fetch data', err);
  //   }
  // });

  db.collection('Users').find({name: 'Amandeep'}).forEach((docs) => {
    console.log(JSON.stringify(docs, null, 2));
  },(err) => {
    if(err) {
      console.log(err);
    }
  });
});
