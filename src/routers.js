const express = require('express');
const expensesControllers = require('./controllers/expenses.controller');
const userControllers = require('./controllers/users.controller');

const router = express.Router();

router.get('/expenses', expensesControllers.getAll);
router.post('/expenses', expensesControllers.addExpense);
router.get('/expenses/:id', expensesControllers.getExpense);
router.delete('/expenses/:id', expensesControllers.removeExpense);
router.patch('/expenses/:id', expensesControllers.updateExpense);
router.get('/users', userControllers.getAll);
router.post('/users', userControllers.addUser);
router.get('/users/:id', userControllers.getUser);
router.delete('/users/:id', userControllers.removeUser);
router.patch('/users/:id', userControllers.changeUser);

module.exports = router;
