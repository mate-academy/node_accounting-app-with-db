'use strict';

const express = require('express');
const usersController = require('../controllers/users');

const router = express.Router();

router.get('/', express.json(), usersController.getAll);
router.get('/:userId', express.json(), usersController.getOne);
router.post('/', express.json(), usersController.create);
router.delete('/:userId', express.json(), usersController.remove);
router.patch('/:userId', express.json(), usersController.update);

module.exports = { router };
