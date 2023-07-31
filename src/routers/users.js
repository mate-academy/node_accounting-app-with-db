'use strict';

const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', usersController.getAll);
router.get('/:id', usersController.getOne);
router.post('/', usersController.add);
router.patch('/:id', usersController.update);
router.delete('/:id', usersController.remove);

module.exports = { router };
