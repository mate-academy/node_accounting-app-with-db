'use strict';

const Express = require('express'); // eslint-disable-line
const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
async function get(req, res) {
  const { userId, ...restQueryParams } = req.query;
  const expenses = await expensesService.getAll({
    userId: +userId,
    ...restQueryParams,
  });

  res.status(200)
    .send(expenses.map(item => expensesService.normalize(item.dataValues)));
}

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
async function getById(req, res) {
  const id = +req.params.id;

  if (!Number.isInteger(id)) {
    res.status(400)
      .send('Required params { id: integer }');

    return;
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.status(404)
      .send(`Expected entity doesn't exist`);

    return;
  }

  res.status(200)
    .send(expensesService.normalize(expense.dataValues));
}

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
async function create(req, res) {
  /** @type {expensesService.Expense} */
  const newExpense
    = expensesService.findMatchProps(
      {
        userId: 0,
        spentAt: '',
        title: '',
        amount: 0,
        category: '',
        note: '',
      },
      req.body
    );

  if (!Number.isInteger(newExpense.userId)
    || !Number.isInteger(newExpense.amount)
    || typeof newExpense.spentAt !== 'string'
    || typeof newExpense.title !== 'string'
  ) {
    res.status(400)
      .send('Required params');

    return;
  }

  if (!await usersService.getById(newExpense.userId)) {
    res.status(400)
      .send('User not exist');

    return;
  }

  const expense
    = await expensesService.create(newExpense);

  res.status(201)
    .send(expensesService.normalize(expense.dataValues));
}

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
async function remove(req, res) {
  const id = +req.params.id;

  if (!Number.isInteger(id)) {
    res.status(400)
      .send('Required params { id: integer }');

    return;
  }

  const removedCount = await expensesService.removeById(id);

  if (removedCount !== 1) {
    res.status(404)
      .send(`Expected entity doesn't exist`);

    return;
  }

  res.sendStatus(204);
}

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
async function update(req, res) {
  const id = +req.params.id;
  const foundExpense = await expensesService.getById(id);

  if (!foundExpense) {
    res.status(404)
      .send('Expense not exist');

    return;
  }

  const updateExpense = expensesService.findMatchProps(
    foundExpense.dataValues,
    req.body
  );

  if (!updateExpense) {
    res.status(400)
      .send('Required params');

    return;
  }

  const [updatedCount, updatedRows]
    = await expensesService.updateById({
      ...updateExpense,
      id,
    });

  if (!updatedRows[0].dataValues || updatedCount !== 1) {
    res.status(404)
      .send(`Expected entity doesn't exist`);

    return;
  }

  res.status(200)
    .send(updatedRows[0].dataValues);
}
