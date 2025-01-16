const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

let expenses = [];

const clearExpenses = () => {
  expenses = [];
};

const getAllExpenses = async (
  userId = null,
  categories = null,
  from = null,
  to = null,
) => {
  let filterExp = await Expense.findAll();
  const whereConditions = {};

  if (userId) {
    filterExp = await Expense.findAll({
      where: { userId: +userId },
    });
  }

  if (from && to) {
    whereConditions.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  }

  if (from || to) {
    filterExp = await Expense.findAll({
      where: whereConditions,
    });
  }

  if (categories) {
    filterExp = await Expense.findAll({
      where: {
        category: categories,
      },
    });
  }

  return filterExp;
};

const getExpenseById = async (id) => {
  try {
    const normalizedId = +id;
    const expenseById = await Expense.findByPk(normalizedId);

    if (!expenseById) {
      return { error: 'Expense not found in DB' };
    }

    return { data: expenseById };
  } catch (error) {
    return { error: 'Error to get Expense by ID' };
  }
};

const createExpense = async ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  try {
    const normalizedUserId = +userId;

    const newExpense = await Expense.create({
      userId: normalizedUserId,
      spentAt: new Date(spentAt).toISOString(),
      title,
      amount,
      category,
      note: note || '',
    });

    // Додавання нового витратного запису до масиву expenses
    expenses.push(newExpense);

    return { data: newExpense };
  } catch (error) {
    return { error: 'Error with create Expense (Sorry!)' };
  }
};

const deleteExpense = async (expenseId) => {
  try {
    const delExpense = await Expense.destroy({
      where: { id: expenseId },
    });

    if (delExpense === 0) {
      return { error: 'Expense does not exist' };
    }

    return { data: 'Expense deleted successfully' };
  } catch (error) {
    return { error: `Error deleting expense: ${error.message}` };
  }
};

const updateExpense = async (expenseId, updatedExpense) => {
  try {
    const normalizedId = +expenseId;
    const expenseToUpdate = await Expense.findByPk(normalizedId);

    if (!expenseToUpdate) {
      return { error: 'Expense not found' };
    }

    await expenseToUpdate.update({ ...updatedExpense });

    return { data: expenseToUpdate }; // Повертаємо оновлену витрату
  } catch (error) {
    return { error: `Failed to update expense: ${error.message}` };
  }
};

const expensesService = {
  clearExpenses,
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};

module.exports = expensesService;
