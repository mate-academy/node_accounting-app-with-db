'use strict';

const express = require('express');
const usersController = require('../controllers/users.controller');
const router = express.Router();

module.exports = {
  router,
};

router.get('/', usersController.get);
router.get('/:id', usersController.getById);

router.post('/', usersController.create);

router.delete('/:id', usersController.remove);

router.patch('/:id', usersController.update);
