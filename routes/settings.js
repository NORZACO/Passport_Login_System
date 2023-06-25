require('dotenv').config()
const express = require('express');
const path = require('path');
const fs = require('fs');
const passport = require('passport');
const ensureLogIn = require('connect-ensure-login').ensureLoggedIn;



const router = express.Router();

var ensureLoggedIn = ensureLogIn();


router.get('/settings', function (req, res) {
        res.render('admin/dashboard', { user: req.user });
    });



module.exports = router;

