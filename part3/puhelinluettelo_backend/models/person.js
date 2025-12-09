const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;
if (!url) {
  throw new Error('MONGODB_URI not defined');
}

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
