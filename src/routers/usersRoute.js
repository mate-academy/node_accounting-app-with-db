const express = require('express');
const {
  getAll,
  getOne,
  create,
  deleteOne,
  update,
} = require('../controllers/users.controller.js');

const usersRoute = express.Router();

usersRoute.get('/', getAll);

usersRoute.get('/:id', getOne);

usersRoute.post('/', create);

usersRoute.delete('/:id', deleteOne);

usersRoute.patch('/:id', update);

module.exports = {
  usersRoute,
};
