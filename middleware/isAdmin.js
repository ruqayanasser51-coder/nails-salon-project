const isAdmin = (req, res, next) => {
  console.log('ADMIN CHECK:', req.session.user);

  if (req.session.user && req.session.user.role === 'admin') {
    next();
  } else {
    res.status(403).send('Access denied. Admin only.');
  }
};

module.exports = isAdmin;