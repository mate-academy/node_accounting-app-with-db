'use strict';
/* eslint-disable object-curly-newline */

const { checkIsReqBodyValid } = require('../helpers/checkIsReqBodyValid');
const expenseService = require('../services/expense.service.js');

function validateReqParamsForGet(req, res, next) {
  const listOfExpectedParams = [
    { key: 'userId', type: 'number' },
    { key: 'categories', type: 'Array string' },
    { key: 'from', type: 'string($date-time)' },
    { key: 'to', type: 'string($date-time)' },
  ];
  const isReqBodyValid = checkIsReqBodyValid(
    req.body,
    listOfExpectedParams,
    false,
  );

  if (!isReqBodyValid && Object.entries(req.body).length > 0) {
    res.sendStatus(400);

    return;
  }

  next();
}

function validateReqParamsForCreateAndUpdate(req, res, next) {
  const listOfExpectedParams = [
    { key: 'userId', type: 'number' },
    { key: 'spentAt', type: 'string($date-time)' },
    { key: 'title', type: 'string' },
    { key: 'amount', type: 'number' },
    { key: 'category', type: 'string' },
    { key: 'note', type: 'string' },
  ];
  const isReqBodyValid = checkIsReqBodyValid(req.body, listOfExpectedParams);

  if (!isReqBodyValid) {
    res.sendStatus(400);

    return;
  }

  next();
}

function validateIdReqParam(req, res, next) {
  const { id } = req.params;
  const foundExpense = expenseService.getById(id);

  if (isNaN(+id)) {
    res.sendStatus(400);

    return;
  }

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  next();
}

module.exports = {
  validateReqParamsForGet,
  validateReqParamsForCreateAndUpdate,
  validateIdReqParam,
};
