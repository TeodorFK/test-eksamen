const jwt = require('jsonwebtoken');

const { User, verifyPassword } = require('../models/user_model');
const Bedrift = require('../models/bedrift_model');
const Feedback = require('../models/feedback_model');

//lager en JWT token med brukerens id
const createToken = (id) => {
  return jwt.sign({ id }, process.env.SECRET, {
    //gyldig i 3 timer
    expiresIn: 3 * 60 * 60,
  });
};

//Render for login
const login_get = (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    console.log(err);
  }
};

const login_post = async (req, res) => {
  //Henter username og password
  const { username, password } = req.body;
  try {
    //finner brukeren i databasen baset på username
    const foundUser = await User.findOne({ username });

    //Sjekker om passordet funker
    const isValid = await verifyPassword(foundUser, password);
    if (!isValid) {
      console.log('Password or username is incorrect');
      return redirect('/');
    }
    //Lager en JWT token for brukeren
    const token = createToken(foundUser._id);
    //Lagrer token i en cookie (httpOnly gjør at den ikke kan bli lest i browser)
    res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 1000 });
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

//Render for signup
const signup_get = (req, res) => {
  try {
    res.render('signup');
  } catch (err) {
    console.log(err);
  }
};

const signup_post = async (req, res) => {
  //Henter fra signup skjema
  const { username, password, confPassword } = req.body;
  //Sjekker om confPassword ikke er det samme som password
  if (confPassword !== password) {
    console.log('password does not match');
  }
  try {
    //lager ny bruker i databasen
    const user = await User.create({ username, password });
    //Lager token for brukeren
    const token = createToken(user._id);
    //Lagrer token i en cookie
    res.cookie('jwt', token, { httpOnly: true, maxAge: 1000 * 1000 });
    res.redirect('/');
  } catch (err) {
    console.log(err);
    res.status(400).send('error, user didnt get created');
  }
};

//Brukerens profil
const profile = async (req, res) => {
  try {
    //henter in logget bruker fra auth middleware
    const loggedInUser = await User.findById(req.auth.id);
    console.log(loggedInUser);

    //Henter alle bedrift posts knyttet til brukeren
    const Companies = await Bedrift.find({ elev: loggedInUser._id });
    console.log(Companies);

    //Henter alle feedbacks knyttset til brukeren
    const feedback = await Feedback.find({ elev: loggedInUser._id });
    console.log(feedback);

    // Sjekker om brukeren prøver å åpne en annen sin profil
    if (loggedInUser.username !== req.params.username) {
      //redirecter til egen profil
      return res.redirect(`/profile/${loggedInUser.username}`);
    }

    //Render profile pagen med brukerens data og bedrifter
    res.render('profile', {
      user: loggedInUser,
      Companies,
      feedback,
    });
  } catch (err) {
    console.log(err);
  }
};

const logout = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  login_get,
  login_post,
  signup_get,
  signup_post,
  profile,
  logout,
};
