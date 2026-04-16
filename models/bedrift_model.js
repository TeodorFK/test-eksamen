const { Schema, model } = require('mongoose');

const bedriftSchema = new Schema({
  elev: {
    type: String,
    required: true,
  },
  bedrift: {
    type: String,
    required: true,
  },
  typeBedrift: {
    type: String,
    required: true,
  },
  representant: {
    type: String,
    required: true,
  },
});

const Bedrift = model('bedrift', bedriftSchema);

module.exports = Bedrift;
