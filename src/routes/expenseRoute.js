const express = require('express');
const expenseController = require('../controllers/expenseController');

const expenseRouter = express.Router();

expenseRouter.get('/', expenseController.get);

expenseRouter.get('/:id', expenseController.getOne);

expenseRouter.post('/', expenseController.create);

expenseRouter.delete('/:id', expenseController.remove);

expenseRouter.patch('/:id', expenseController.update);

module.exports = { expenseRouter };
