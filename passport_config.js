
var express = require('express');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var db = require('../db');




const bcrypt = require('bcrypt');
const users = require('./users.json');

passport.use(new LocalStrategy(function verify(username, password, cb) {
  const user = users.find(user => user.username === username);
  if (!user) {
    return cb(null, false, { message: 'Incorrect username or password.' });
  }

  bcrypt.compare(password, user.hashed_password, function(err, result) {
    if (err) { return cb(err); }
    if (!result) {
      return cb(null, false, { message: 'Incorrect username or password.' });
    }
    return cb(null, user);
  });
}));
