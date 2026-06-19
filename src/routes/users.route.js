const express = require('express');
const userController = require('../controllers/users.controller');

const router = express.Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getUser);
router.post('/', userController.createUser);
router.delete('/:id', userController.deleteUser);
router.patch('/:id', userController.updateUser);

module.exports = router;
