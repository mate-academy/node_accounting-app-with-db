'use strict';

const usersController = require('../controllers/users');
const express = require('express');

const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:userId', usersController.getOne);

router.post('/', usersController.add);
router.patch('/:userId', usersController.update);
router.delete('/:userId', usersController.remove);

module.exports = {
  router,
};
