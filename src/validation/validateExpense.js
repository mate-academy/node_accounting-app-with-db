'use strict';

const { badRequestResponse } = require('./../helpers/badRequestResponse');
const { notFoundResponse } = require('./../helpers/notFoundResponse');
const { isDate } = require('./../helpers/isDate');
const expenseService = require('../services/expenses.service');

const validateCreateExpense = (res, expenseData) => {
  const { spentAt, category, note, amount, title } = expenseData;

  if (expenseData.id) {
    return res
      .status(400)
      .json({
        error: 'id for expense is generated automatically',
      });
  }

  if (!isDate(spentAt)) {
    return badRequestResponse(res, 'spentAt', 'Date');
  }

  if (!category || typeof category !== 'string') {
    return badRequestResponse(res, 'category', 'string');
  }

  if (!note || typeof note !== 'string') {
    return badRequestResponse(res, 'note', 'string');
  }

  if (amount === undefined || typeof amount !== 'number') {
    return badRequestResponse(res, 'amount', 'number');
  }

  if (!title || typeof title !== 'string') {
    return badRequestResponse(res, 'title', 'string');
  }

  return 'Valid';
};

const validateUpdateExpense = async(res, id, dataToUpdate) => {
  if (!(await expenseService.getById(id))) {
    return notFoundResponse(res, 'Expense');
  }

  if (
    dataToUpdate.hasOwnProperty('id')
    || dataToUpdate.hasOwnProperty('userId')
  ) {
    return res
      .status(400)
      .json({
        error: 'You can not update id or userId',
      });
  }

  if (dataToUpdate.spentAt && !isDate(dataToUpdate.spentAt)) {
    return badRequestResponse(res, 'spentAt', 'Date');
  }

  if (dataToUpdate.category && typeof dataToUpdate.category !== 'string') {
    return badRequestResponse(res, 'category', 'string');
  }

  if (dataToUpdate.note && typeof dataToUpdate.note !== 'string') {
    return badRequestResponse(res, 'note', 'string');
  }

  if (dataToUpdate.amount && typeof dataToUpdate.amount !== 'number') {
    return badRequestResponse(res, 'amount', 'string');
  }

  if (dataToUpdate.title && typeof dataToUpdate.title !== 'string') {
    return badRequestResponse(res, 'title', 'string');
  }

  return 'Valid';
};

module.exports = {
  validateCreateExpense,
  validateUpdateExpense,
};
