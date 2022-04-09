const { connect, connection } = require('mongoose');

connect('mongodb://localhost/EcommerceApp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  family: 4
});

module.exports = connection;
