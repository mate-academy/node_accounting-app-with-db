const { Expense } = require('../models/Expense.model');
const expensesService = require('../services/expense.service');

const getAllExpense = async (request, response) => {
  const query = request.query;

  try {
    const expenses = await expensesService.getAllExpense();

    if (!query.userId && !query.from && !query.to && !query.categories) {
      response.status(200).json(expenses);

      return;
    }

    const categories = query.categories?.split(',');

    const filteredExpenses = await expensesService.filterQuery({
      userId: query.userId,
      from: query.from,
      to: query.to,
      categories: categories,
    });

    response.status(200).json(filteredExpenses);
  } catch (error) {
    response.status(404);
  }
};

const createExpense = async (request, response) => {
  const { userId, spentAt, title, amount, category, note } = request.body;

  if (!userId || !spentAt || !title || !amount) {
    response.status(400).send();

    return;
  }

  try {
    const newExpense = await expensesService.addExpense({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    response.status(201).send(newExpense);
  } catch (error) {
    response.status(404);
  }
};

const getOneExpense = async (request, response) => {
  const expenseId = Number(request.params.id);

  try {
    const expense = await expensesService.getExpenseById(expenseId);

    if (!expense) {
      response.status(404).send();

      return;
    }

    response.status(200).send(expense);
  } catch (error) {
    response.status(404);
  }
};

const deleteExpense = async (request, response) => {
  const expenseId = Number(request.params.id);

  try {
    const expenseToDelete = await expensesService.getExpenseById(expenseId);

    if (!expenseToDelete) {
      return response.status(404).send();
    }

    expensesService.deleteExpense(expenseId);

    return response.status(204).send();
  } catch (error) {
    response.status(404);
  }
};

const updateExpense = async (request, response) => {
  const expenseId = Number(request.params.id);
  const { title, spentAt, amount, category, note } = request.body;

  try {
    const expenseToUpdate = await Expense.findByPk(expenseId);

    if (!expenseToUpdate) {
      return response.status(404).send();
    }

    if (title) {
      expenseToUpdate.title = title;
    }

    if (spentAt) {
      expenseToUpdate.spentAt = spentAt;
    }

    if (amount) {
      expenseToUpdate.amount = amount;
    }

    if (category) {
      expenseToUpdate.category = category;
    }

    if (note) {
      expenseToUpdate.note = note;
    }

    await expenseToUpdate.save();

    response.status(200).json(expenseToUpdate);
  } catch (error) {
    response.status(500).send();
  }
};

module.exports = {
  getAllExpense,
  createExpense,
  getOneExpense,
  deleteExpense,
  updateExpense,
};
