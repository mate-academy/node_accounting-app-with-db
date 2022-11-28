'use strict';

const express = require('express');
const userController = require('../controllers/user.js');

const router = express.Router();

router.get('/', userController.getAll);

router.get('/:userId', userController.getOne);

router.post('/', userController.create);

router.delete('/:userId', userController.remove);

router.patch('/:userId', userController.modify);

exports.userRouter = router;
