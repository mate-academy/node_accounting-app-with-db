'use strict';

const express = require('express');

const router = express.Router();

const usersController = require('../controllers/users');

router.get('/', usersController.getAll);
router.get('/:userId', usersController.getOne);
router.post('/', express.json(), usersController.addNew);
router.delete('/:userId', usersController.remove);
router.patch('/:userId', express.json(), usersController.change);

module.exports.router = router;
