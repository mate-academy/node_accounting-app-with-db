const { Router } = require('express');
const {
  getAll,
  create,
  getByID,
  deleteById,
  update,
} = require('../controllers/users.controller.js');

const usersRouter = Router();

usersRouter.get('/', getAll);
usersRouter.post('/', create);
usersRouter.get('/:id', getByID);
usersRouter.delete('/:id', deleteById);
usersRouter.patch('/:id', update);

module.exports = {
  usersRouter,
};
