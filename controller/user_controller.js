const jwt = require('jsonwebtoken');

const { User, verifyPassword } = require('../models/user_model');

const createToken = (id) => {
  return jwt.sign({ id }, 'secret-key', {
    expiresIn: 3 * 60 * 60,
  });
};

const login_get = (req, res) => {
  try {
    res.render('login ');
  } catch (err) {
    console.log(err);
  }
};

const login_post = async (req, res) => {
  const { username, password } = req.body;
  try {
    const foundUser = await User.findOne({ username });

    const isValid = await verifyPassword(foundUser, password);
    if (!isValid) {
      console.log('Password or username is incorrect');
      return redirect('/');
    }
    const token = createToken(foundUser._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 1000 });
    res.redirect('/profile/:username');
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

const signup_get = (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    console.log(err);
  }
};

const signup_post = async (req, res) => {
  const { username, password, confPassword } = req.body;
  console.log(req.body);
  if (confPassword !== password) {
    return;
  }
  try {
    const user = await User.create({ username, password });
    console.log(user._id);
    const token = createToken(user._id);
    res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 1000 });
    res.redirect('profile/:username');
  } catch (err) {
    console.log(err);
    res.status(400).send('error, user didnt get created');
  }
};

module.exports = {
  login_get,
  login_post,
  signup_get,
  signup_post,
};
