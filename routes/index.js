const express = require('express');
const path = require('path');
const fs = require('fs');
var ensureLogIn = require('connect-ensure-login').ensureLoggedIn;

const router = express.Router();

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return res.redirect('/login')
  }
  next()
}

// GET home page.
router.get('/', function(req, res, next) {
  const context = { user: req.user }
  res.render('index', context);
});




module.exports = router;

