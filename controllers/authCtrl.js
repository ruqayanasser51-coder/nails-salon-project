/* eslint-disable no-console */
const bcrypt = require('bcrypt');
const User = require('../models/user');

const SALT_ROUNDS = 10;

const signup = async (req, res) => {
  res.render('auth/sign-up.ejs');
};

const register = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({
      email: req.body.email,
    });

    if (userInDatabase) {
      return res.send('Email already exists');
    }

    if (req.body.password !== req.body.confirmPassword) {
      return res.send('Passwords do not match');
    }

    const hashedPassword = bcrypt.hashSync(
      req.body.password,
      SALT_ROUNDS
    );

    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      contact: req.body.contact,
      role: 'customer',
    });



    req.session.save(() => {
      res.redirect('/');
    });
  } catch (err) {
    console.log(err);
    res.send('Something went wrong');
  }
};

const signin = async (req, res) => {
  res.render('auth/sign-in.ejs');
};

const login = async (req, res) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const password = req.body.password;

    console.log('Login email:', email);

    const userInDatabase = await User.findOne({
      email: email,
    });

    if (!userInDatabase) {
      console.log('User not found');
      return res.send('Invalid credentials');
    }

    console.log('User found:', userInDatabase.name);
    console.log('User role:', userInDatabase.role);

    const passwordMatches = bcrypt.compareSync(
      password,
      userInDatabase.password
    );

    if (!passwordMatches) {
      console.log('Wrong password');
      return res.send('Invalid credentials');
    }

    req.session.user = {
      name: userInDatabase.name,
      email: userInDatabase.email,
      _id: userInDatabase._id,
      role: userInDatabase.role,
    };

    req.session.save((err) => {
      if (err) {
        console.log('Session error:', err);
        return res.send('Session error');
      }

      console.log('Login successful');
      res.redirect('/');
    });
  } catch (err) {
    console.log('LOGIN ERROR:', err);
    res.send('Something went wrong');
  }
};

  

const signout = async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
};

module.exports = {
  signup,
  register,
  signin,
  login,
  signout,
};