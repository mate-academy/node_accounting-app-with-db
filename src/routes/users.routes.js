const express = require('express');
const usersContr = require('../controllers/users.contr');
const usersRouter = express.Router();

usersRouter.get('/', usersContr.getAllUsers);
usersRouter.get('/:id', usersContr.getUserById);
usersRouter.post('/', usersContr.getCreateUser);
usersRouter.delete('/:id', usersContr.getDeleteUser);
usersRouter.patch('/:id', usersContr.getUpdateUser);

module.exports = usersRouter;
