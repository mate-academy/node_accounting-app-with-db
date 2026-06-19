const express = require('express');
const userControllers = require('./../controllers/user.controller');

const router = express.Router();

router.get('/', userControllers.get);

router.get('/:id', userControllers.getById);

router.post('/', userControllers.create);

router.delete('/:id', userControllers.remove);

router.patch('/:id', userControllers.update);

module.exports = {
  router,
};
