'use strict';

const moment = require('moment');
const { Op } = require('sequelize');

const { Expense } = require('../models/Expense.js');
const { User } = require('../models/User.js');

const getAllExpenses = async(req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  const whereClause = {};

  if (userId) {
    whereClause.userId = userId;
  }

  if (categories) {
    whereClause.category = categories;
  }

  if (from && to) {
    const fromDate = moment(from, 'YYYY-MM-DD HH:mm:ss.SSSSSSZ')
      .startOf('second')
      .toDate();
    const toDate = moment(to, 'YYYY-MM-DD HH:mm:ss.SSSSSSZ')
      .endOf('second')
      .toDate();

    whereClause.createdAt = {
      [Op.between]: [fromDate, toDate],
    };
  }

  const filteredExpenses = await Expense.findAll({
    where: whereClause,
    order: [
      ['createdAt', 'ASC'],
    ],
  });

  res.json(filteredExpenses);
};

const getOneExpense = async(req, res) => {
  const { expenseId } = req.params;

  const findExpense = await Expense.findByPk(expenseId);

  if (!findExpense) {
    return res.sendStatus(404);
  }

  res.json(findExpense);
};

const addExpense = async(req, res) => {
  const {
    userId,
    title,
    amount,
    category,
    note,
  } = req.body;

  const findUser = await User.findByPk(userId);

  if (!findUser) {
    res.status(400);
    res.json({ error: 'User not found' });

    return;
  }

  const newExpense = await Expense.create({
    userId,
    title,
    amount,
    category,
    note,
  });

  res.status(201);
  res.json(newExpense);
};

const removeExpense = async(req, res) => {
  const { expenseId } = req.params;

  const findExpense = await Expense.findByPk(expenseId);

  if (!findExpense) {
    return res.sendStatus(404);
  }

  await Expense.destroy({
    where: { id: expenseId },
  });

  res.sendStatus(204);
};

const updateExpense = async(req, res) => {
  const { expenseId } = req.params;
  const findExpense = await Expense.findByPk(expenseId);

  if (!findExpense) {
    return res.sendStatus(404);
  }

  await Expense.update({ ...req.body }, {
    where: { id: expenseId },
  });

  const findUpdatedExpense = await Expense.findByPk(expenseId);

  res.json(findUpdatedExpense);
};

const expenseController = {
  getAllExpenses,
  getOneExpense,
  addExpense,
  removeExpense,
  updateExpense,
};

module.exports = { expenseController };
