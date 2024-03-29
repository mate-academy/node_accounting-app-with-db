const express = require('express');
const userController = require('../constrollers/user.controller');

const router = express.Router();

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', express.json(), userController.create);
router.patch('/:id', express.json(), userController.update);
router.delete('/:id', userController.remove);

module.exports = router;
