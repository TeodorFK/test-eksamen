  const jwt = require('jsonwebtoken');


  //Sjekker om bruker er authenticated
  const authenticate = (req, res, next) => {
    //Henter JWT token fra cookie
    const token = req.cookies.jwt;
    try {
      if (!token) {
        return res.redirect('/');
      }

      //Verifiserer token med secret key
      jwt.verify(token, process.env.SECRET, (err, decodedToken) => {
        if (err) {
          //Hvis token ikke finnes eller no redirecter den deg
          console.log(err.message);
          res.redirect('/login');
        } else {
          //Hvis token er passer
          //lagrer decodedTOken i request objektet
          req.auth = decodedToken;
          console.log('decoded', decodedToken);
          //Går videre til neste del
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
