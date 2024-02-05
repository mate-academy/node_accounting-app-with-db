'use strict';

const expenseService = require('../services/expense.service.js');

const get = async(req, res) => {
  Object.entries(req.body).length === 0
    ? res.send(await expenseService.getAll())
    : res.send(await expenseService.getSome(req.body));
};

const create = async(req, res) => {
  const newExpense = await expenseService.create(req.body);

  res.status(201).send(newExpense);
};

const getOne = async(req, res) => {
  const { id } = req.params;
  const foundExpense = await expenseService.getById(id);

  res.send(foundExpense);
};

const remove = async(req, res) => {
  const { id } = req.params;

  await expenseService.remove(id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const updatedExpense = await expenseService.update(id, req.body);

  res.send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
