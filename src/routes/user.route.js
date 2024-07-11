const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');

router.get('/', UserController.getUsers);
router.post('/', UserController.addUser);
router.get('/:id', UserController.getUser);
router.delete('/:id', UserController.deleteUser);
router.patch('/:id', UserController.updateUser);

module.exports = router;
