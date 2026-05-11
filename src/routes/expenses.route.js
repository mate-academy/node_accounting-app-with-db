/* eslint-disable no-console */
const express = require('express');
const { expensesController } = require('../controllers/expenses.controller');
// const { expensesService } = require('../services/expenses.service');

const expensesRouter = express.Router();

// const validateExpense = (req, res, next) => {
//   expensesService.validate(req.body);

//   const errors = expensesService.getErrors();

//   if (Object.keys(errors).length > 0) {
//     console.log(errors);
//     // res.status(404).json({ errors });
//   }

//   next();
// };

expensesRouter.get('/', expensesController.getAllExpenses);
expensesRouter.post('/', expensesController.createExpense);
expensesRouter.get('/:id', expensesController.getExpense);
expensesRouter.patch('/:id', expensesController.updateExpense);
expensesRouter.delete('/:id', expensesController.deleteExpense);

module.exports = { expensesRouter };
