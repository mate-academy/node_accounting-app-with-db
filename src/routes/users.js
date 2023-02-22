'use strict';

const userControllers = require('../controllers/users');
const express = require('express');

const router = express.Router();

router.post('/', userControllers.add);

router.get('/', userControllers.getAll);

router.get('/:userId', userControllers.getOne);

router.patch('/:userId', userControllers.update);

router.delete('/:userId', userControllers.remove);

module.exports = {
  router,
};
