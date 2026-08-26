const isSignedIn = (req, res, next) => {
  console.log('SESSION USER:', req.session.user);

  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
};

module.exports = isSignedIn;