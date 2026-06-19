const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/', usersController.getUsers);
router.post('/', usersController.createUser);
router.get('/:id', usersController.getUserById);
router.delete('/:id', usersController.deleteUser);
router.patch('/:id', usersController.updateUser);

module.exports = router;
