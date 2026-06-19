'use strict';

const expenseService = require('../services/expenseService');

// Get all expenses (with optional filters)
const getAllExpenses = async (req, res) => {
  try {
    const expenses = await expenseService.getAll(req.query);

    res.status(200).json(expenses);
  } catch (error) {
    // console.error('Error fetching expenses:', error);
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
};

// Get a single expense by ID
const getExpenseById = async (req, res) => {
  try {
    const { id } = req.params;
    const expense = await expenseService.getById(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json(expense);
  } catch (error) {
    // console.error('Error fetching expense:', error);
    res.status(500).json({ message: 'Failed to fetch expense' });
  }
};

// Create a new expense
const createExpense = async (req, res) => {
  try {
    const newExpense = await expenseService.create(req.body);

    res.status(201).json(newExpense);
  } catch (error) {
    // console.error('Error creating expense:', error);
    res.status(400).json({ message: 'Failed to create expense' });
  }
};

// Update an existing expense (supports both PUT & PATCH)
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await expenseService.update({ id, ...req.body });

    if (updated[0] === 0) {
      // Sequelize returns [0] if no rows were updated
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense updated successfully' });
  } catch (error) {
    // console.error('Error updating expense:', error);
    res.status(400).json({ message: 'Failed to update expense' });
  }
};

// Delete an expense
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await expenseService.remove(id);

    if (!deleted) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    // console.error('Error deleting expense:', error);
    res.status(500).json({ message: 'Failed to delete expense' });
  }
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
