const express = require('express');
const userController = require('../controllers/users.controller');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getOneUser);
router.post('/', express.json(), userController.addUser);
router.patch('/:id', express.json(), userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
