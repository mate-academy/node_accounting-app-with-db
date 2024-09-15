'use strict';

const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const expensesController = require('../controllers/expenseController');

router.get('/users', usersController.getAllUsr);
router.get('/users/:userID', usersController.getUsrById);
router.post('/users', express.json(), usersController.createUsr);
router.patch('/users/:userID', express.json(), usersController.updateUsr);
router.delete('/users/:userID', usersController.deleteUsr);

router.get('/expenses', expensesController.getAllExpenses);
router.get('/expenses/:id', expensesController.getExpenseById);
router.post('/expenses', express.json(), expensesController.createExpense);
router.patch('/expenses/:id', express.json(), expensesController.updateExpense);
router.delete('/expenses/:id', expensesController.deleteExpense);

module.exports = router;
