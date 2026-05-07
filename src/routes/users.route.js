const usersController = require('../controllers/users.controller');

const express = require('express');

module.exports = function (users) {
  const router = express.Router();

  router.get('/', usersController.get(users));

  router.get('/:id', usersController.getOne(users));

  router.post('/', usersController.create(users));

  router.patch('/:id', usersController.update(users));

  router.delete('/:id', usersController.remove(users));

  return router;
};
