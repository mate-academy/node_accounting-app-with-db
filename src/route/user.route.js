const express = require('express');
const userController = require('../controller/user.controller');

const router = express.Router();

router.get('/', userController.get);
router.post('/', express.json(), userController.create);
router.get('/:id', userController.getById);
router.delete('/:id', userController.remove);
router.patch('/:id', express.json(), userController.update);

module.exports = router;
