'use strict';

const service = require('./../services/expenses.service');

const get = async(req, res) => {
  const expenses = await service.get(req.query);

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { id } = req.params;
  const expense = await service.getById(id);

  if (!expense) {
    res.status(404).send('Expense not found');

    return;
  }

  res.send(expense);
};

const create = async(req, res) => {
  const props = req.body;

  const [
    arePropsValid,
    validatedProps,
  ] = (await service.validateOnCreate(props));

  if (!arePropsValid) {
    res.status(400).send('Invalid props for expense creation');

    return;
  }

  const expense = await service.create(validatedProps);

  res.status(201).send(expense);
};

const remove = async(req, res) => {
  const { id } = req.params;

  const expense = await service.getById(id);

  if (!expense) {
    res.status(404).send('Expense not found');

    return;
  }

  await service.remove(id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const props = req.body;

  const expense = await service.getById(id);

  if (!expense) {
    res.status(404).send('Expense not found');

    return;
  }

  const [
    arePropsValid,
    validatedProps,
  ] = service.validateOnUpdate(props);

  if (!arePropsValid) {
    res.status(400).send('Invalid props for expense update');

    return;
  }

  const updatedExpense = await service.update(id, validatedProps);

  res.send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
