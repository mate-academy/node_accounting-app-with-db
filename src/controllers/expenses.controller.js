const {
  getAllExpenses,
  getExpensesById,
  createExpense,
  updateExpense,
  deleteExpense,
} = require('../services/expenses.services.js');
const { noramalize } = require('../services/expenses.services.js');
const { getUserById } = require('../services/users.services.js');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;
  let allExpenses = [];

  try {
    allExpenses = await getAllExpenses(userId, categories, from, to);
  } catch {
    res.sendStatus(404);
  }
  res.send(allExpenses.map((exp) => noramalize(exp)));
};

const getOne = async (req, res) => {
  const { id } = req.params;
  let expense = null;

  try {
    expense = await getExpensesById(id);
  } catch {
    res.sendStatus(422);

    return;
  }

  if (!expense) {
    res.sendStatus(404);

    return;
  }
  res.send(noramalize(expense));
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  let user;

  try {
    user = await getUserById(userId);
  } catch {
    user = null;
  }

  if (!user || !title) {
    res.sendStatus(400);

    return;
  }

  let newExpense;

  try {
    newExpense = await createExpense(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );
  } catch {
    res.sendStatus(400);

    return;
  }
  res.statusCode = 201;
  res.send(noramalize(newExpense));
};

const update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  let expense = null;

  try {
    expense = await getExpensesById(id);
  } catch (error) {
    res.sendStatus(404);

    return;
  }

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  try {
    await updateExpense(id, data);
  } catch (error) {
    res.sendStatus(422);

    return;
  }
  res.send(noramalize({ ...expense.dataValues, ...data }));
};

const deleteOne = async (req, res) => {
  const { id } = req.params;
  let expense = null;

  try {
    expense = await getExpensesById(id);
  } catch {
    res.sendStatus(422);

    return;
  }

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  try {
    await deleteExpense(id);
  } catch {
    res.sendStatus(422);
  }
  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
