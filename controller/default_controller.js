const index = (req, res) => {
  try {
    res.render('index');
  } catch (err) {
    console.log(err);
  }
};

const veiLedning = (req, res) => {
  try {
    res.render('veiledning');
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  index,
  veiLedning,
};
