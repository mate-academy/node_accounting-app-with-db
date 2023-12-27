'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('./../controllers/users.controller');

router.get('/', usersController.get);

router.post('/', express.json(), usersController.create);

router.get('/:id', usersController.getOne);

router.delete('/:id', usersController.remove);

router.patch('/:id', express.json(), usersController.updateOne);

module.exports = router;
