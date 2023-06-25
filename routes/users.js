const express = require('express');
const jsend = require('jsend');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const db = 'models/users.json';
const UserService = require('../services/UserService');
const userService = new UserService(db);
router.use(jsend.middleware);




// GET ALL USERS
router.get('/all',  async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).jsend.success({ 'result': users });
  } catch (error) {
    res.status(500).jsend.fail({ 'result': error.message });
  }
});


// function heavyComputation(){
// 	let temp = 0;
// 	for(let i=0; i<100000; i++)
// 		temp = (Math.random()*5342)%i;
// 	return 123;
// }

// router.get('/api', (req, res)=>{
// 	let result = heavyComputation();
// 	res.send("Result: "+result);
// })



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



// minside router
router.get('minside',  jsonParser, async (req, res) => {

  try {
    const user = await userService.getUserById(req.user.id);
    if (!user) {
      return res.status(400).jsend.fail({ 'result': 'User with given id not found' });
    }
    return res.status(200).jsend.success({ 'result': user });

  } catch (error) {
    return res.status(500).jsend.fail({ 'result': error.message });
  }
});


router.get('/minside', async (req, res, next) => {
  const user = await userService.getUserById(req.user.id);
  // if (!user) {
  //   return res.status(400).jsend.fail({ 'result': 'User with given id not found' });
  // }

  const context =  { user: user };
  return res.render('admin/dashboard', context)
});






module.exports = router;



