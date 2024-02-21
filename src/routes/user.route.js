'use strict';

const express = require('express');
const userController = require('../controllers/user.controller');
const { validateAndParseId } = require('../middleware/validateAndParseId');

const router = express.Router();

router.get('/', userController.get);

router.get('/:id', validateAndParseId, userController.getOne);

router.post('/', userController.create);

router.delete('/:id', validateAndParseId, userController.remove);

router.patch('/:id', validateAndParseId, userController.update);

module.exports = { router };
