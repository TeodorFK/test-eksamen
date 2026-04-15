const { Schema, model } = require('mongoose');
const argon2 = require('argon2');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'representant', 'admin'],
    default: 'user',
  },
});

userSchema.pre('save', async function () {
  try {
    if (!this.isModified('password')) return;
    
    this.password =  await argon2;
  } catch (err) {
    console.log(err);
  }
});

async function verifyPassword(user, enteredPassword) {
  try {
    return await argon2.verify(user.password, enteredPassword);
  } catch (err) {
    console.log(err);
  }
}

const User = model('user', userSchema);

module.exports = { User, verifyPassword };
