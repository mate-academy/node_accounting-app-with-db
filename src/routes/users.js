'use strict';

const express = require('express');
const usersController = require('../controllers/users.js');

const router = express.Router();

router.get('/', usersController.getUsers);
router.get('/:userId', usersController.getUser);

router.post('/', usersController.add);
router.delete('/:userId', usersController.remove);
router.patch('/:userId', usersController.update);

module.exports = {
  router,
};
