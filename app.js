require('dotenv').config()
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const flash = require('express-flash');


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const authRouter = require('./routes/auth');
const sessionRouter = require("./session/index");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(flash()); // message popper
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(sessionRouter);





// bootstrap  <script src="bootstrap/js/bootstrap.bundle.min.js"></script> || bootstrap@4.0.0/dist/js/
app.use('/bootstrap', express.static(path.join(__dirname, 'node_modules/bootstrap/dist')));
// // jquery <script src="jquery/jquery.min.js"></script>
app.use('/jquery', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
// // typed <script src="typed/typed.min.js"></script>
app.use('/typed', express.static(path.join(__dirname, 'node_modules/typed.js/lib')));

// bootstrap icon <link href="bootstrap-icons/bootstrap-icons.css" rel="stylesheet">
app.use('/bootstrap-icons', express.static(path.join(__dirname, 'node_modules/bootstrap-icons/font')));

// // // fontawesome <script src="fontawesome/js/all.min.js"></script>
// app.use('/fontawesome', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')));
// // // google fonts <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700" rel="stylesheet">
// app.use('/googlefonts', express.static(path.join(__dirname, 'node_modules/@fortawesome/fontawesome-free')));
// // bootstrap icon




















app.use('/', indexRouter);
app.use('/', usersRouter);
app.use('/', authRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
