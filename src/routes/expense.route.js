const express = require('express');
const expenseController = require('../controllers/expenses.controle');

const router = express.Router();

router.get('/expenses', expenseController.get);

router.post('/expenses', express.json(), expenseController.post);

router.get('/expenses/:id', expenseController.getOne);

router.delete('/expenses/:id', expenseController.remove);

router.patch('/expenses/:id', express.json(), expenseController.update);

module.exports = {
  router,
};
