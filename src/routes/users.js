'use strict';

const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', userController.add);
router.delete('/:id', userController.remove);
router.patch('/:id', userController.update);

module.exports = {
  router,
};
