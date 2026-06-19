const express = require('express');
const {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
} = require('../controllers/expenses.controller.js');

const expensesRoute = express.Router();

expensesRoute.get('/', getAll);

expensesRoute.get('/:id', getOne);

expensesRoute.post('/', create);

expensesRoute.delete('/:id', deleteOne);

expensesRoute.patch('/:id', update);

module.exports = {
  expensesRoute,
};
