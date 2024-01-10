/* eslint-disable no-console */
'use strict';

const { expensesService } = require('../services/expenses.service.js');

const get = async(req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  res.send(expense);
};

const create = async(req, res) => {
  const expense = await expensesService.create(req.body);

  res.statusCode = 201;

  res.send(expense);
};

const update = async(req, res) => {
  const { id } = req.params;

  await expensesService.update(id, req.body);

  const updatedExpense = await expensesService.getById(id);

  res.send(updatedExpense);
};

const remove = async(req, res) => {
  const { id } = req.params;

  await expensesService.remove(id);

  res.sendStatus(204);
};

module.exports.expensesController = {
  get,
  getOne,
  create,
  update,
  remove,
};
