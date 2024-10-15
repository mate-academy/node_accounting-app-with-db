const { Expense } = require('../models/Expense.model');

const getAllExpenses = async () => {
  const result = await Expense.findAll();

  return result;
};

const getExpenseById = async (id) => {
  return Expense.findByPk(id);
};

const createExpense = async ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const updateExpense = async ({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const [affectedRows] = await Expense.update(
    {
      spentAt,
      title,
      amount,
      category,
      note,
    },
    { where: { id } },
  );

  if (affectedRows === 0) {
    return null;
  }

  return Expense.findByPk(id);
};

const destroyExpense = async ({ id }) => {
  return Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  destroyExpense,
  updateExpense,
};
