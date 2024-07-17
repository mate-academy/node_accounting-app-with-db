'use strict';

const { Router } = require('express');
const userControllers = require('../controllers/users.controllers');

const router = Router();

router.get('/', userControllers.get);

router.get('/:id', userControllers.getById);

router.post('/', userControllers.create);

router.delete('/:id', userControllers.remove);

router.patch('/:id', userControllers.update);

module.exports = {
  router,
};
