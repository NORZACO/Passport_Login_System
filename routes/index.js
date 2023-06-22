var express = require('express');
var path = require('path');
var fs = require('fs');

var router = express.Router();


const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' }
];

// creare a file
// fs.writeFile('models/users.json', 'Hello World!', function (err) {
//   if (err) throw err;
//   console.log('Saved!');
// });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',user : users });
});



/* GET home page. */
router.get('/login', function(req, res, next) {
  res.render('form/index', { title: 'Express',user : users });
});

module.exports = router;

