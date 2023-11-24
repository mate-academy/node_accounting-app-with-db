'use strict';

const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.controller');

router.get('/', usersController.getAll);
router.post('/', usersController.createUser);
router.get('/:id', usersController.getParticular);
router.delete('/:id', usersController.deleteParticular);
router.patch('/:id', usersController.updateParticular);

module.exports = {
  router,
};
