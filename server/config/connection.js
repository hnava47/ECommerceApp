const { default: mongoose } = require('mongoose');
const { connect, connection } = require('mongoose');

// connect('mongodb://localhost:27017/EcommerceApp', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://localhost:27017/EcommerceApp',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
);

module.exports = connection;
