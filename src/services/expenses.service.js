const { Expense } = require('../models/Expense.model');
const { generateRandomId } = require('../Random');

const getAllExpenses = async () => {
  return Expense.findAll();
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const normalizeCategory = (categories) => {
  return Array.isArray(categories) || !categories ? categories : [categories];
};

const filterExpensesById = (expenses, id) => {
  return expenses.filter((exp) => exp.userId === parseInt(id));
};

const filterExpensesByCategory = (expenses, category) => {
  return expenses.filter((exp) => category.includes(exp.category));
};

const filterExpensesByDate = (expenses, from, to) => {
  return expenses.filter((exp) => {
    const spentAt = new Date(exp.spentAt);

    return spentAt >= from && spentAt <= to;
  });
};

const create = async ({
  userId,
  spentAt,
  title,
  amount,
  category = null,
  note = null,
}) => {
  const id = generateRandomId();

  return Expense.create({
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const removeExpense = async (id) => {
  return Expense.destroy({
    where: {
      id,
    },
  });
};

const updateExpense = async (exp, req, id) => {
  const updatedFields = { ...req.body };

  await Expense.update(updatedFields, {
    where: { id },
  });

  return getById(id);
};

module.exports = {
  getById,
  getAllExpenses,
  normalizeCategory,
  filterExpensesById,
  filterExpensesByCategory,
  filterExpensesByDate,
  create,
  removeExpense,
  updateExpense,
};
