const express = require('express');
const expensesRoute = express.Router();
const controller = require('../controllers/expenses.controller');

const GET_ALL_EXPENSES = '/';
const GET_ONE_EXPENSE = '/:id';
const CREATE_EXPENSE = '/';
const UPDATE_EXPENSE = '/:id';
const DELETE_EXPENSE = '/:id';

expensesRoute.get(GET_ALL_EXPENSES, controller.get);
expensesRoute.get(GET_ONE_EXPENSE, controller.getOne);
expensesRoute.post(CREATE_EXPENSE, controller.post);
expensesRoute.patch(UPDATE_EXPENSE, controller.patch);
expensesRoute.delete(DELETE_EXPENSE, controller.deleting);

module.exports = {
  expensesRoute,
};
