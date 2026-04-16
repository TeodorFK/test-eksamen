const { Schema, model } = require('mongoose');

const feedbackSchema = new Schema({
  elev: {
    type: String,
    required: true,
  },
  feedback: {
    type: String,
    required: true,
  },
});

const Feedback = model('feedback', feedbackSchema);

module.exports = Feedback;
