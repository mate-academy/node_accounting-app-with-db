'use strict';

const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.get('/', usersController.getAll);

router.post('/', express.json(), usersController.addOne);

router.get('/:userId', usersController.getOne);

router.delete('/:userId', usersController.deleteOne);

router.patch('/:userId', express.json(), usersController.updateOne);

module.exports = router;
