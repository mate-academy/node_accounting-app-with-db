const userController = require('../controller/user.controller');
const express = require('express');

const router = express.Router();

router.get('/', userController.get);

router.get('/:id', userController.getOne);

router.post('/', userController.post);

router.delete('/:id', userController.remove);

router.patch('/:id', userController.patch);

module.exports = router;
