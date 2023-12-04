'use strict';

const express = require('express');
const ExpenseController = require('../controllers/ExpenseController');

const router = express.Router();

router.get('/', ExpenseController.get);
router.post('/', ExpenseController.create);
router.get('/:slug', ExpenseController.getBySlug);
router.delete('/:slug', ExpenseController.remove);
router.patch('/:slug', ExpenseController.update);

module.exports = { ExpenseRouter: router };
