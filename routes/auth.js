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

// function checkAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return next();
//     }

//     res.redirect('/login');
// }

// function checkNotAuthenticated(req, res, next) {
//     if (req.isAuthenticated()) {
//         return res.redirect('/');
//     }
//     next();
// }

passport.use(
    new LocalStrategy(
        { usernameField: 'email' },
        async function (email, password, done) {
            const loginUser = await userService.getUserData(email);

            console.log('LOGIN USER', loginUser);

            if (!loginUser) {
                return done(null, false, { messages: 'Incorrect username.' });
            }
            bcrypt.compare(password, loginUser.hashPassword, (err, result) => {
                if (err) {
                    return done(err);
                }
                if (!result) {
                    return done(null, false, { messages: 'Incorrect password.' });
                }
                return done(null, loginUser);
            });
        }
    )
);


router.get('/login', async (req, res, next) => {
    const context = { title: 'Express', user: req.username }
    res.render('form/Login', context);
});



// register
router.get('/register', async (req, res, next) => {
    const context = { title: 'Express', user: req.username }

    res.render('form/register', { user: req.username || null });
});



passport.serializeUser(function (user, cb) {
    process.nextTick(function () {
        cb(null, { id: user.id, username: user.username });
    });
});

passport.deserializeUser(function (user, cb) {
    process.nextTick(function () {
        return cb(null, user);
    });
});

router.post(
    '/login/password',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true,
    })
);


router.post('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.redirect('/');
    });
});


router.post('/register', async function (req, res, next) {
    const { firstName, lastName, username, email, password } = req.body;
    const newUser = { id: uid(), firstName, lastName, username, email, password };

    try {
        await userService.createUser(
            newUser.id,
            newUser.firstName,
            newUser.lastName,
            newUser.username,
            newUser.email,
            newUser.password
        );

        const user = await userService.getUserById(newUser.id);

        req.login(user, (err) => {
            if (err) {
                return next(err);
            }
            res.redirect('/login');
        });
    } catch (err) {
        return next(err);
    }
});

module.exports = router;
