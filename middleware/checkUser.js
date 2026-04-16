const jwt = require('jsonwebtoken');
const { User } = require('../models/user_model');

//Sjekker om brukeren er logget inn
const checkUser = async (req, res, next) => {
  //henter token fra cookie
  const token = req.cookies.jwt;
  try {
    if (token) {
      //Verifiserer token og dekoder innholdet
      const decoded = jwt.verify(token, process.env.SECRET);
      //Henter brukeren fra databasen basert på id'en fra token
      res.locals.user = await User.findById(decoded.id);
    } else {
      //Hvis ingen token, hvis ingen bruker logget in
      res.locals.user = null;
    }
  } catch (err) {
    console.log(err);
    //Ingen token = ingen bruker
    res.locals.user = null;
  }
  //Går videre til neste middleware uansett hva
  next();
};

module.exports = { checkUser };
