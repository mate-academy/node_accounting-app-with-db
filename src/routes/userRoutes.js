const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

router.get('/', express.json(), userController.getUsersHandler);

router.get('/:id', userController.getUserByIdHandler);

router.post('/', express.json(), userController.createUserHandler);

router.delete('/:id', userController.deleteUserHandler);

router.patch('/:id', express.json(), userController.updateUserHandler);

module.exports = router;
