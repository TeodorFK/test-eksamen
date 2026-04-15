const jwt = require('jsonwebtoken');
const { User } = require('../models/user_model');

const isAdmin = async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    console.log('No token');
    return res.redirect('/');
  }

  try {
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        const user = await User.findOne({ _id: decodedToken.id });
        if (user.role == 'admin') {
          next();
        } else {
          res.redirect('/');
        }
      }
    });
  } catch (err) {
    console.log(err);
    return res.redirect('/');
  }
};

module.exports = { isAdmin };
