const express = require('express');
const userRoutes = express.Router();
const userController = require('../controllers/userController');

userRoutes.get('/', (req, res) => {
  userController.getUsers(req, res);
});

userRoutes.post('/', (req, res) => {
  userController.createUser(req, res);
});

userRoutes.get('/:id', (req, res) => {
  userController.getUserById(req, res);
});

userRoutes.patch('/:id', (req, res) => {
  userController.updateUser(req, res);
});

userRoutes.delete('/:id', (req, res) => {
  userController.deleteUser(req, res);
});

module.exports = userRoutes;
