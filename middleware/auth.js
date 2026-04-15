const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.cookies.jwt;
  try {
    if (!token) {
      return res.redirect('/');
    }

    jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        req.auth = decodedToken;
        console.log('decoded', decodedToken);
        next();
      }
    });
  } catch (err) {
    console.log(err);
    res.redirect('/login');
  }
};

module.exports = {
  authenticate,
};
