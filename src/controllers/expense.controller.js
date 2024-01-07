'use strict';

const { expenseService } = require('../services/expense.service.js');
const { userService } = require('../services/user.service.js');

const getAllFiltered = async(req, res) => {
  const { userId, categories, from, to } = req.query;

  const filteredExpenses = await expenseService.getAllFiltered({
    userId,
    categories,
    from,
    to,
  });

  res.send(filteredExpenses);
};

const create = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.status(400)
      .send('Request is missing one or more of the expense properties');
  }

  const user = await userService.getById(+userId);

  if (!user) {
    return res.status(400).send('User not found');
  }

  const expense = await expenseService.create(req.body);

  res.statusCode = 201;

  res.send(expense);
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.status(400).send('Id is not a number');
  }

  const expense = await expenseService.getById(+id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  res.send(expense);
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.status(400).send('Id is not a number');
  }

  const expense = await expenseService.getById(+id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  await expenseService.remove(+id);

  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const {
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (isNaN(+id)) {
    return res.status(400).send('Id is not a number');
  }

  if (!spentAt && !title && !amount && !category && !note) {
    return res.status(400)
      .send('Request is missing at least one of the expense properties');
  }

  const expense = await expenseService.getById(+id);

  if (!expense) {
    return res.status(404).send('Expense not found');
  }

  const updatedExpense = await expenseService.update({
    id: +id,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.send(updatedExpense);
};

module.exports = {
  expenseController: {
    getAllFiltered,
    create,
    getOne,
    remove,
    update,
  },
};
