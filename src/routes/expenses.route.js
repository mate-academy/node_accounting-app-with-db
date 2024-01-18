'use strict';

const express = require('express');
const controller = require('./../controllers/expenses.controller');

const router = express.Router();

router.get('/', controller.get);

router.post('/', controller.create);

router.get('/:id', controller.getOne);

router.delete('/:id', controller.remove);

router.patch('/:id', controller.update);

module.exports = { router };
