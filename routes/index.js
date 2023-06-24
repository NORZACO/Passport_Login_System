const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
      return res.redirect('/login')
  }
  next()
}

// GET home page.
router.get('/', checkNotAuthenticated, function(req, res, next) {
  res.render('index', { title: 'Express', user :  req.user.username });
});

module.exports = router;

