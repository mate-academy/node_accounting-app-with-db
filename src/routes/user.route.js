const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', userController.get);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.delete('/:id', userController.removeUser);
router.patch('/:id', userController.updateUser);

module.exports = {
  router,
};
