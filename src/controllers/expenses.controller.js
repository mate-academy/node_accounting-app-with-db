'use strict';

const expensesServices = require('../services/expenses.services');

const getAll = async(req, res) => {
  res.send(await expensesServices.findAll(req.body));
};

const getById = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  const expense = await expensesServices.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = async(req, res) => {
  const expense = req.body;

  if (!expense) {
    res.sendStatus(400);

    return;
  }

  try {
    const newExpense = await expensesServices.create(expense);

    res.status(201).json(newExpense);
  } catch (error) {
    res.sendStatus(500);
  }
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  try {
    await expensesServices.remove(id);

    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
};

const update = async(req, res) => {
  const { id } = req.params;
  const newProperties = req.body;

  if (!id) {
    res.sendStatus(400);
  }

  const updatedExpense = await expensesServices
    .update(id, newProperties);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
