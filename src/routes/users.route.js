const express = require('express');

// const userController = require('../controller/user.controller');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', userController.get);

router.get('/:id', userController.getOne);

router.patch('/:id', userController.update);

router.post('/', userController.create);

router.delete('/:id', userController.remove);

module.exports = {
  router,
};
