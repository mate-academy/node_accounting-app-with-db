const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { findUser } = require('../middlewares/findUser');

router.get('/users', userController.getAllUsers);
router.post('/users', userController.createUser);
router.get('/users/:id', findUser, userController.getUserById);
router.delete('/users/:id', findUser, userController.deleteUser);
router.patch('/users/:id', findUser, userController.updateUser);

module.exports = router;
