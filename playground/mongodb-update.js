const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if(err) {
    return console.log('Unable to connect to database server');
  }

  console.log('Connected to database server');

  const db = client.db('TodoApp');

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID('5b213d6a85816a1810d03e4f')
  }, {
    $set: {
      name: 'Amandeep'
    },
    $inc: {
      age: 1
    }
  }, {
    returnOriginal: false
  }).then((result) => {
    console.log(JSON.stringify(result,null, 2));
  });
});
