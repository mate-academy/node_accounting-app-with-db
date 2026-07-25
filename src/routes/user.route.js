const express = require('express');
const usersController = require('../controllers/users.controle');

const router = express.Router();

router.get('/users', usersController.get);

router.post('/users', express.json(), usersController.post);

router.get('/users/:id', usersController.getOne);

router.delete('/users/:id', usersController.remove);

router.patch('/users/:id', express.json(), usersController.update);

module.exports = {
  router,
};
