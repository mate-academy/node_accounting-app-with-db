const { Expense } = require('../models/Expense.model.js');

const getAllExpenses = async () => {
  const expenses = await Expense.findAll();

  return expenses || [];
};

// const getId = () =>
//   expenses.length > 0 ? Math.max(...expenses.map((u) => u.id)) + 1 : 1;

const getOne = (id) => {
  return Expense.findByPk(id) || null;
};

const create = ({ userId, spentAt, title, amount, category, note }) => {
  return Expense.create({
    userId: Number(userId),
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const deleteExpense = async (id) => {
  await Expense.destroy({
    where: { id },
  });
};

const updateExpense = async (
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) => {
  await Expense.update(
    {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    },
    {
      where: { id },
    },
  );

  const updatedExpense = getOne(+id);

  return updatedExpense;
};

module.exports = {
  getAllExpenses,
  getOne,
  create,
  deleteExpense,
  updateExpense,
};
