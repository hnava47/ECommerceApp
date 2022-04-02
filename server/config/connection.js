const { connect, connection } = require('mongoose');

connect('mongodb://localhost:27017/EcommerceApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;
