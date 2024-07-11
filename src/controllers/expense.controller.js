const {
  getAllExpensesService,
  createExpenseService,
  getExpenseByIdService,
  getExpenseByQueryService,
} = require('../services/expenses.service');

const normalize = ({ id, userId, spentAt, title, amount, category, note }) => {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
};

const getAllExpenses = async (req, res) => {
  const expenses = await getAllExpensesService();

  res.send(expenses.map((expense) => normalize(expense)));
};

const createExpense = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    return res.sendStatus(400);
  }

  const newExpense = await createExpenseService(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(newExpense);
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;
  const expense = await getExpenseByIdService(+id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(normalize(expense));
};

const getExpenseByQuery = async (req, res) => {
  const query = req.query;
  const expenses = await getExpenseByQueryService(query);

  res.send(expenses.map((expense) => normalize(expense)));
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await getExpenseByIdService(+id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expense.destroy();
  res.sendStatus(204);
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { spentAt, title, amount, category, note } = req.body;

  const expense = await getExpenseByIdService(+id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expense.update({
    spentAt,
    title,
    amount,
    category,
    note,
    id,
  });

  res.send(normalize(updatedExpense));
};

module.exports = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  getExpenseByQuery,
  deleteExpense,
  updateExpense,
};
