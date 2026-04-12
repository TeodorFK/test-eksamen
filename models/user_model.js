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
});

userSchema.pre('save', async function () {
  try {
    if (!this.isModified('password')) return;

    const hash = await argon2.hash(this.password);
    this.password = hash;
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
