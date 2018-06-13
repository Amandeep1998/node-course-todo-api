const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
    return console.log('Unable to connect to database server');
  }

  console.log('Connected to database server');

  const db = client.db('TodoApp');

  // //deleteMany
  // db.collection('Users').deleteMany({name: 'Amandeep'}).then((result) => {
  //   console.log(result);
  // });

  // //findOneAndDelete
  // db.collection('Users').findOneAndDelete({_id: new ObjectID('5b213d5b5c6e2f0814b8ed49')}).then((result) => {
  //   console.log(result);
  // });

  //deleteOne
  db.collection('Users').deleteOne({age: 10}).then((result) => {
    console.log(result);
  });
});
