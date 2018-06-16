var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://amandeep:Rooneyrocks32@ds261540.mlab.com:61540/amandeep || mongodb://localhost:27017/TodoApp');

module.exports = {
  mongoose
}
