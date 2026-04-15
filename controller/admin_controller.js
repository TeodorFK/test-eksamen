const admin_page = (req, res) => {
  try {
    res.render('admin');
  } catch (err) {
    console.log(err);
  }
};

module.exports = { admin_page };
