const express = require('express');
const userController = require('../controllers/userController.js');

const userRoute = express.Router();

userRoute.get('/', userController.getUsers);
userRoute.get('/:id', userController.getUser);
userRoute.post('/', userController.createUser);
userRoute.patch('/:id', userController.updateUser);
userRoute.delete('/:id', userController.removeUser);

module.exports = { userRoute };
