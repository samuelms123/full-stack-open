const mongoose = require('mongoose');
require('dotenv').config();

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;
if (!url) {
  throw new Error('MONGODB_URI not defined');
}

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    minlength: 8,
    required: true,
    validate: {
      validator: (v) => {
        const pattern = /^\d{2,3}-\d+$/;
        return pattern.test(v);
      },
      message: 'Phone number must be in format XX(X)-YYYY... with first part 2-3 digits and second part all digits',
    },
  },
});

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Person', personSchema);
