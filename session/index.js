require('dotenv').config()
const express = require('express');
const path = require('path');
const fs = require('fs');
const logger = require('morgan');
const passport = require('passport');
const session = require('express-session');

const router = express.Router();


// session
router.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    resave: false,
    saveUninitialized: false
}));


router.use(passport.authenticate('session'));







module.exports = router;

