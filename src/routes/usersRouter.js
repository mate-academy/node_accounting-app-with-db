const { Router } = require('express');
const {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
} = require('../controllers/usersController');

const usersRouter = Router();

usersRouter.get('/', getAllUsers);
usersRouter.post('/', createUser);
usersRouter.get('/:id', getUser);
usersRouter.delete('/:id', deleteUser);
usersRouter.patch('/:id', updateUser);

module.exports = {
  usersRouter,
};
