const express = require('express');
var jsend = require('jsend');
const router = express.Router();
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const fs = require('fs');
const path = require('path');




const UserService = require('../services/UserService');

const fileName = 'models/users.json';

const filePath = path.resolve(__dirname, fileName);

const userService = new UserService('models/users.json');


// userService.createJsonFileIfNotExists('models/users.json')








router.use(jsend.middleware);












// const express = require('express');
// const UserService = require('../services/UserService');

// const router = express.Router();
// const userService = new UserService('users.json');

// Route: POST /users
// Create a new user
router.post('/', (req, res) => {
  const { firstName, lastName, username, email, password, roleId } = req.body;

  try {
    const newUser = userService.createUser(firstName, lastName, username, email, password, roleId);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Route: GET /users
// Get all users
router.get('/users',  async(req, res) => {
  const users = await userService.getAllUsers();
  res.json(users);
});

// Route: GET /users/:id
// Get user by ID
router.get('/users/:id', (req, res) => {
  const userId = req.params.id;
  const user = userService.getUserById(userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});



// ... other user routes

module.exports = router;






