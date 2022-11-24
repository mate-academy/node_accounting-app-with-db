'use strict';

const express = require('express');
const userControllers = require('../controllers/users');

const router = express.Router();

router.get('/', userControllers.getAll);
router.get('/:userId', userControllers.getOne);

router.post('/', userControllers.add);

router.delete('/:userId', userControllers.remove);

router.patch('/:userId', userControllers.update);

module.exports = {
  router,
};
