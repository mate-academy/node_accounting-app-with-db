'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/users');

router.get('/', userController.getAll);
router.get('/:userId', userController.getOne);
router.post('/', userController.create);
router.delete('/:userId', userController.remove);
router.patch('/:userId', userController.update);

module.exports = {
  router,
};
