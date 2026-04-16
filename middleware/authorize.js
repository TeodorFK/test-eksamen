const jwt = require('jsonwebtoken');
const { User } = require('../models/user_model');

//Sjekker om bruker er admin
const isAdmin = async (req, res, next) => {
  //Henter token fra cookie
  const token = req.cookies?.jwt;

  //Hvis ingen token finnes
  if (!token) {
    console.log('No token');
    return res.redirect('/');
  }

  try {
    //Verifiserer token
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        //Henter brukeren fra databasen basert på id'en i token
        const user = await User.findOne({ _id: decodedToken.id });
        //Sjekker om brukeren har admin rollen
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

//Sjekker om brukeren er representant
const isRepresant = async (req, res, next) => {
  //Henter token fra cookie
  const token = req.cookies?.jwt;

  //Hvis ingen token finnes
  if (!token) {
    console.log('No token');
    return res.redirect('/');
  }

  try {
    //Verifiserer token
    jwt.verify(token, process.env.SECRET, async (err, decodedToken) => {
      if (err) {
        console.log(err);
      } else {
        //Henter brukeren fra databasen basert på id'en i token
        const user = await User.findOne({ _id: decodedToken.id });
        //Sjekker om brukeren har representant rollen
        if (user.role == 'representant') {
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

module.exports = { isAdmin, isRepresant };
