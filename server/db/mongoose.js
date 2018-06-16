var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://<dbuser>:<dbpassword>@ds259820.mlab.com:59820/amandeep_mongodb || mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
}
