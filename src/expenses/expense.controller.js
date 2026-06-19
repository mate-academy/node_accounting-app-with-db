const repository = require('./expense.repository');
const userRepository = require('../users/user.repository');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  let expenses = await repository.getAll();

  if (userId) {
    expenses = expenses.filter((expense) => +expense.userId === +userId);
  }

  let expenseCategories;

  if (categories) {
    expenseCategories = categories.split(',');

    expenses = expenses.filter(
      (expense) => expenseCategories.includes(expense.category),
      // eslint-disable-next-line function-paren-newline
    );
  }

  if (from && to) {
    const fromDate = new Date(from);
    const toDate = new Date(to);

    expenses = expenses.filter((expense) => {
      const spentDate = new Date(expense.spentAt);

      const isInDateRange = spentDate >= fromDate && spentDate <= toDate;

      return isInDateRange;
    });
  }

  res.send(expenses);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const expense = await repository.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expense);
};

const add = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title) {
    return res.sendStatus(400);
  }

  if (!(await userRepository.getById(userId))) {
    return res.sendStatus(400);
  }

  const newExpense = await repository.add({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const updatedExpense = await repository.update(id, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.status(200).send(updatedExpense);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const deleted = await repository.deleteById(id);

  if (!deleted) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteById,
};
