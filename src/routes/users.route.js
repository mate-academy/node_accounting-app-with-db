const express = require('express');
const usersController = require('../controller/users.controller');

const router = express.Router();

router.get('/', usersController.getAll);

router.get('/:id', usersController.getOne);

router.delete('/:id', usersController.remove);

router.post('/', usersController.create);

router.patch('/:id', usersController.update);

module.exports = {
  router,
};
