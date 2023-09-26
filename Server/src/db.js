require('dotenv').config();
const mongoose = require('mongoose');

const uri = process.env.MONGODB_URI;


const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};


module.exports = () => {
  return mongoose.connect(uri, options);
};