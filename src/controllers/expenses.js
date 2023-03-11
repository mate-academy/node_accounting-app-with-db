'use strict';

const expensesService = require('../services/expenses');
const { ApiError } = require('../exceptions/ApiError');

const getAll = async(req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res.send(expenses);
};

const getById = async(req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getById(id);

  if (!expense) {
    throw ApiError.NotFound();
  }

  res.send(expense);
};

const add = async(req, res) => {
  const expense = await expensesService.add(req.body);

  res.status(201).send(expense);
};

const remove = async(req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getById(id);

  if (!expense) {
    throw ApiError.NotFound();
  }

  await expensesService.remove(id);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const data = req.body;
  const expense = await expensesService.update(id, data);

  if (!expense) {
    throw ApiError.NotFound();
  }

  res.send(expense);
};

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
