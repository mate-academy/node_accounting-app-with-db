'use strict';

const express = require('express');
const { userController } = require('../controllers/users.controller');

const router = express.Router();

router.get('/', userController.getAll);

router.get('/:userId', userController.getOne);

router.post('/', userController.create);

router.delete('/:userId', userController.remove);

router.patch('/:userId', userController.update);

module.exports.userRouter = router;
