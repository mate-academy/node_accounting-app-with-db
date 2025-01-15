const Router = require('express');

const usersControllers = require('.././controllers/users-Controllers');

const userRouters = Router();

userRouters.get('/', usersControllers.getAllUsers);

userRouters.get('/:id', usersControllers.getUsersById);

userRouters.delete('/:id', usersControllers.deleteUsers);

userRouters.post('/', usersControllers.createUser);

userRouters.patch('/:id', usersControllers.uptadeUsers);

module.exports = {
  userRouters,
};
