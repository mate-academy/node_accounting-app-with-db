/*
  métodos:
  getExpenses
  getExpenseById
  createExpense
  updateExpense
  deleteExpense
  */

const { Expense } = require('../models/Expense.model');
const { User } = require('../models/User.model');

const getExpenses = async (req, res) => {
  const where = {};

  if (req.query.userId) {
    where.userId = req.query.userId;
  }

  if (req.query.categories) {
    where.category = req.query.categories;
  }

  const resultado = await Expense.findAll({ where });

  res.status(200).json(resultado);
};

const getExpenseById = async (req, res) => {
  const resultado = await Expense.findByPk(req.params.id);

  if (!resultado) {
    res.status(404).json({
      error: 'Expense not found.',
    });
  } else {
    res.status(200).json(resultado);
  }
};

const createExpense = async (req, res) => {
  try {
    const user = await User.findByPk(req.body.userId);

    if (!user) {
      return res.status(400).json({ error: 'User not found' });
    }

    const resultado = await Expense.create(req.body);

    res.status(201).json(resultado);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const updateExpense = async (req, res) => {
  const resultado = await Expense.findByPk(req.params.id);

  if (!resultado) {
    res.status(404).json({
      error: 'Expense not found.',
    });
  } else {
    await resultado.update(req.body);
    res.status(200).json(resultado);
  }
};

const deleteExpense = async (req, res) => {
  const resultado = await Expense.findByPk(req.params.id);

  if (!resultado) {
    res.status(404).json({
      error: 'Expense not found.',
    });
  } else {
    await resultado.destroy();
    res.status(204).send();
  }
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
