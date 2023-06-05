'use strict';

const express = require('express');
const userController = require('../controllers/usersController');

const router = express.Router();

router.get('/', userController.getAll);
router.get('/:userId', userController.getUser);
router.post('/', userController.add);
router.delete('/:userId', userController.remove);
router.patch('/:userId', userController.update);

module.exports = {
  router,
};
