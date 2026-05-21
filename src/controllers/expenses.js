/*
  métodos:
  getExpenses
  getExpenseById
  createExpense
  updateExpense
  deleteExpense
  */

const Expense = require('../models/Expense.model');

const getExpenses = async (req, res) => {
  const resultado = await Expense.findAll();

  res.status(200).json(resultado);
};

const getExpenseById = async (req, res) => {
  const resultado = await Expense.findByPk(req.params.id);

  if (!resultado) {
    res.status(400).json({
      error: 'Expense not found.',
    });
  } else {
    res.status(200).json(resultado);
  }
};

const createExpense = async (req, res) => {
  try {
    const resultado = await Expense.create(req.body);

    res.status(200).json(resultado);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const updateExpense = async (req, res) => {
  const resultado = await Expense.findByPk(req.params.id);

  if (!resultado) {
    res.status(400).json({
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
    res.status(400).json({
      error: 'Expense not found.',
    });
  } else {
    await resultado.destroy();
    res.status(200).json(resultado);
  }
};

module.exports = {
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
