const expenseService = require('../services/expenseService');

const getAllExpensesHandler = async (req, res) => {
  const { userId, from, to, categories: category } = req.query;

  const filteredExpenses = await expenseService.getAllExpenses({
    userId,
    from,
    to,
    category,
  });

  res.send(filteredExpenses);
};

const getExpenseByIdHandler = async (req, res) => {
  const { id } = req.params;

  const normalizedId = +id;
  const targetExpense = await expenseService.getExpenseById(normalizedId);

  if (targetExpense.error) {
    return res.sendStatus(404);
  }

  return res.send(targetExpense.data);
};

const createExpenseHandler = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const result = await expenseService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  if (result.error) {
    return res.sendStatus(400);
  }

  return res.status(201).send(result.data);
};

const deleteExpenseHandler = async (req, res) => {
  const { id } = req.params;

  const result = await expenseService.deleteExpense(id);

  if (result.error) {
    return res.sendStatus(404);
  }

  return res.sendStatus(204);
};

const updateExpenseHandler = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const result = await expenseService.updateExpense(id, data);

  if (result.error) {
    return res.sendStatus(404);
  }

  return res.status(200).send(result.data);
};

module.exports = {
  getAllExpensesHandler,
  getExpenseByIdHandler,
  createExpenseHandler,
  deleteExpenseHandler,
  updateExpenseHandler,
};
