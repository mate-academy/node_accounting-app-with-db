const usersController = require('../controllers/users.controller');

const express = require('express');

const router = express.Router();

router.get('/', usersController.getUsers);
router.get('/:id', usersController.getUser);
router.post('/', usersController.createUser);
router.delete('/:id', usersController.deleteUser);
router.patch('/:id', usersController.updateUser);

module.exports = {
  router,
};
