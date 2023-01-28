'use strict';

const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:userId', usersController.getOne);
router.post('/', usersController.add);
router.delete('/:userId', usersController.remove);
router.patch('/:userId', usersController.update);

module.exports = { router };
