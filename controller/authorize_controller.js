const { User } = require('../models/user_model');
const Bedrift = require('../models/bedrift_model');
const Feedback = require('../models/feedback_model');

// Viser admin-siden med alle brukere
const admin_page = async (req, res) => {
  try {
    //Henter alle brukere fra databasen
    const users = await User.find();
    //render admin og sender brukerne
    res.render('admin', { users });
  } catch (err) {
    //Console logger feilen og sender feilmelding
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

//Gjør at man kan poste ting
const admin_post = (req, res) => {
  //Lager bedrift objekt etter input
  const upload = new Bedrift(req.body);
  //Lagrer bedrift i databasen
  upload
    .save()
    .then(() => {
      //Sender brukeren tilbake til admin siden
      res.redirect('/admin');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};

//Representant siden
const represant_page = async (req, res) => {
  try {
    //Henter alle brukere fra databasen
    const users = await User.find();
    //Render pagen og sender brukerne
    res.render('representant', { users });
  } catch (err) {
    console.log(err);
    res.status(500).send('Internal Server Error');
  }
};

//Gjør at man kan poste ting
const representant_post = (req, res) => {
  //Lager feedback objekt etter input
  const upload = new Feedback(req.body);
  //Lagrer feedback i databasen
  upload
    .save()
    .then(() => {
      //Sender brukeren tilbake til admin siden
      res.redirect('/representant');
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('Internal Server Error');
    });
};
module.exports = { admin_page, represant_page, admin_post, representant_post };
