const express = require('express');
const jsend = require('jsend');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const db = 'models/users.json';
const UserService = require('../services/UserService');
const userService = new UserService(db);
router.use(jsend.middleware);





// login
router.get('/login',  async (req, res, next) => {
  res.render('form/Login')
});



// register
router.get('/register',  async (req, res, next) => {
  res.render('form/register')
});




// GET ALL USERS
router.get('/all',  async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).jsend.success({ 'result': users });
  } catch (error) {
    res.status(500).jsend.fail({ 'result': error.message });
  }
});


// signup
// router.post('/register',  async (req, res, next) => {
//   const { firstName, lastName, username, email, password } = req.body;
//   try {
//     const users = await userService.createUser(firstName, lastName, username, email, password)
//     res.redirect('login')
//   } catch (error) {
//     res.redirect('register')

//   }
// });


// login
// router.post('/login',  async (req, res, next) => {
//   const { username, password } = req.body;
//   try {
//     const users = await userService.login(username, password)
//     res.redirect('/')
//   } catch (error) {
//     res.redirect('/login');
//   }
// });








// GET USER BY ID
router.get('/byid/:id',  jsonParser, async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).jsend.fail({ 'result': 'userId is required' });
  }

  try {
    const user = await userService.getUserById(userId);
    if (!user) {
      return res.status(400).jsend.fail({ 'result': 'User with given id not found' });
    }
    return res.status(200).jsend.success({ 'result': user });
  } catch (error) {
    return res.status(500).jsend.fail({ 'result': error.message });
  }
});

// GET ALL USERS
router.get('/user/all',  async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).jsend.success({ 'result': users });
  } catch (error) {
    res.status(500).jsend.fail({ 'result': error.message });
  }
});

// UPDATE USER
router.put('/byid/:id',  jsonParser, async (req, res) => {
  const userId = req.params.id;
  if (!userId) {
    return res.status(400).jsend.fail({ 'result': 'userId is required' });
  }

  try {
    const { username, email, password } = req.body;
    const user = await userService.updateUser(userId, username, email, password);
    if (!user) {
      return res.status(400).jsend.fail({ 'result': 'User with given id not found' });
    }
    return res.status(200).jsend.success({ 'result': user });
  } catch (error) {
    return res.status(500).jsend.fail({ 'result': error.message });
  }
});

module.exports = router;



