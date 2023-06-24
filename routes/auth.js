const express = require('express');
const jsend = require('jsend');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const db = 'models/users.json';
const UserService = require('../services/UserService');
const userService = new UserService(db);
const { uid } = require('uid');

const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcrypt');
router.use(jsend.middleware);



function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next()
    }

    res.redirect('/login')
}

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return res.redirect('/')
    }
    next()
}



passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async function (email, password, done) {
        const loginUser = await userService.getUserByEmail(email);

        console.log('LOGIN USER', loginUser);

        if (!loginUser) {
            return done(null, false, { messages: 'Incorrect username.' });
        }
        bcrypt.compare(password, loginUser, (err, result) => {
            if (err) {
                return done(err);
            }
            if (!result) {
                return done(null, false, { messages: 'Incorrect password.' });
            }
            return done(null, loginUser);
        });
    }
));






router.post('/login/password', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));


passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, email: user.email });
    });
});



passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});


router.post('/logout', function (req, res, next) {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});




router.post('/register', async function (req, res, next) {
    const { firstName, lastName, username, email, password } = req.body;
    const newUser = { id: uid(), firstName, lastName, username, email, password };
    await userService.createUser(
        newUser.id,
        newUser.firstName,
        newUser.lastName,
        newUser.username,
        newUser.email,
        newUser.password

    ), (async (err) => {
        if (err) { return next(err); }

        const user = await userService.getUserById(newUser.id)

        req.login(user, function (err) {
            if (err) { return next(err); }
            res.redirect('/');
        });
    })
});






module.exports = router;



