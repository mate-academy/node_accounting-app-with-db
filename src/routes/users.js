'use strict';

const express = require('express');
const userController = require('../controllers/users');
const router = express.Router();

router.get('/', userController.getAll);
router.get('/:userId', userController.getOne);
router.post('/', userController.add);
router.delete('/:userId', userController.remove);
router.patch('/:userId', userController.update);

module.exports = {
  router,
};
