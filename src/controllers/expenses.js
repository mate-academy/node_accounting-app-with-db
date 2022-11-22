/* eslint-disable max-len */
/* eslint-disable no-console */
'use strict';

const { convertToSec } = require('../utils/converter');
const {
  getExpenses,
  getExpensesSpantAt,
  getExpensesCategory,
  getExpensesAll,
  insertExpense,
  getExpenseById,
  deleteExpenseById,
  patchExpenseById,
} = require('../servises/expenses');

const getAllExpenses = async(req, res) => {
  const strUrl = req.originalUrl;
  const arrParams = strUrl.match(/\w+=[\w\-:.]+/g);
  const arrKeyValue = arrParams.map((el) => el.split('='));

  if (!arrParams) {
    res.statusCode = 200;
    res.send(await getExpensesAll());

    return;
  }

  if (arrKeyValue[0][0] === 'userId' && arrKeyValue.length === 1) {
    const arrAllExpenses = await getExpenses(arrKeyValue[0][1]);

    res.statusCode = 200;
    res.send(arrAllExpenses);
  }

  if (arrKeyValue[0][0] === 'from' && arrKeyValue[1][0] === 'to') {
    const expenses = await getExpensesSpantAt();
    const arrAllExpenses = expenses
      .filter((ex) => (convertToSec(ex.spentAt) >= convertToSec(arrKeyValue[0][1]))
        && (convertToSec(ex.spentAt) <= convertToSec(arrKeyValue[1][1])));

    res.statusCode = 200;
    res.send(arrAllExpenses);
  }

  if (arrKeyValue[0][0] === 'userId' && arrKeyValue[1][0] === 'category') {
    const arrAllExpenses = await getExpensesCategory(arrKeyValue[0][1], arrKeyValue[1][1]);

    res.statusCode = 200;
    res.send(arrAllExpenses);
  }

  const allExpenses = await getExpensesAll();

  if (allExpenses.length === 0) {
    res.statusCode = 200;
    res.send([]);
  }
};

const setExpense = async(req, res) => {
  const found = await getExpenses(req.body.userId);

  if (!req.body.userId || !found) {
    res.statusCode = 400;
    res.send('Bad Request');

    return;
  };

  const expense = {
    id: new Date().getTime(),
    userId: req.body.userId,
    title: req.body.title,
    amount: req.body.amount,
    category: req.body.category,
    note: req.body.note,
    spentAt: req.body.spentAt,
  };

  insertExpense(
    expense.id,
    expense.userId,
    expense.title,
    expense.amount,
    expense.category,
    expense.note,
    expense.spentAt,
  );
  res.statusCode = 201;
  res.send(expense);
};

const delExpense = async(req, res) => {
  const { expenseId } = req.params;
  const found = await getExpenseById(expenseId);

  if (!expenseId) {
    res.statusCode = 400;
    res.send('Bad Request');

    return;
  }

  if (!found) {
    res.statusCode = 404;
    res.send('Not found');

    return;
  }

  deleteExpenseById(expenseId);
  res.statusCode = 204;
  res.send('No Content');
};

const getExpense = async(req, res) => {
  const { expenseId } = req.params;
  const found = await getExpenseById(expenseId);

  if (!expenseId) {
    res.statusCode = 400;
    res.send('Bad Request');

    return;
  }

  if (!found) {
    res.statusCode = 404;
    res.send('Not found');

    return;
  }
  res.send(found);
};

const patchExpense = async(req, res) => {
  const found = await getExpenseById(req.params.expenseId);

  if (!req.body) {
    res.statusCode = 400;
    res.send('Bad Request');

    return;
  }

  if (!found) {
    res.statusCode = 404;
    res.send('Not found');

    return;
  }

  const patchedObj = Object.assign(found[0], req.body);

  patchExpenseById(
    req.params.expenseId,
    patchedObj.title,
    patchedObj.amount,
    patchedObj.category,
    patchedObj.note,
    patchedObj.spentat
  );

  res.statusCode = 200;
  res.send(patchedObj);
};

module.exports = {
  getAllExpenses,
  setExpense,
  delExpense,
  getExpense,
  patchExpense,
};
