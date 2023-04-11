'use strict';

const expensesService = require('../services/expenses.js');
const usersService = require('../services/users.js');
const { Op } = require('sequelize');

const getAll = async(req, res) => {
  const {
    userId = null,
    categories = null,
    from = new Date(0),
    to = new Date(),
  } = req.query;

  const where = {
    spentAt: {
      [Op.between]: [from, to],
    },
    category: {
      [Op.not]: null,
    },
  };

  if (userId) {
    where.userId = Number(userId);
  }

  if (categories) {
    where.category = {
      [Op.in]: Array.isArray(categories)
        ? categories
        : [categories],
    };
  }

  const expenses = await expensesService.getAll({ where });

  res.send(expenses);
};

const getOne = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);
  } else {
    res.send(foundExpense);
  }
};

const add = async(req, res) => {
  const { userId, title, spentAt, amount, category, note } = req.body;

  if (!userId || !title || !spentAt || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const foundUser = await usersService.getById(userId);

  if (!foundUser) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.create({
    userId,
    title,
    spentAt,
    amount,
    category,
    note,
  });

  res.statusCode = 201;
  res.send(newExpense);
};

const remove = async(req, res) => {
  const { expenseId } = req.params;
  const foundUser = await expensesService.getById(expenseId);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await expensesService.remove(expenseId);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { expenseId } = req.params;
  const foundExpense = await expensesService.getById(expenseId);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.update(expenseId, { ...req.body });

  const updatedExpense = await expensesService.getById(expenseId);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
