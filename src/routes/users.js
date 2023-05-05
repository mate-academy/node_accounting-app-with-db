'use strict';

const express = require('express');

const router = express.Router();

const { controller: userController } = require('../controllers/users');

router.get('/', userController.getAll);

router.post('/', userController.add);

router.get('/:userId', userController.getOne);

router.delete('/:userId', userController.remove);

router.patch('/:userId', userController.update);

module.exports.router = router;
