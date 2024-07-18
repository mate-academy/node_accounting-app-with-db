const expensesService = require('../services/expenses.services');
/* const usersService = require('../services/users.services'); */

const getAll = async (req, res) => {
  const expenses = await expensesService.getAllExpenses(req.query);

  res.send(expenses);
};

const addExpense = async (req, res) => {
  const { userId, title, amount, category, note, spentAt } = req.body;

  /*  const user = await usersService.findUser(+userId); */

  if (!title || !userId || !amount) {
    res.sendStatus(400);
  } else {
    const expense = await expensesService.addExpense({
      title,
      amount,
      category,
      note,
      userId,
      spentAt,
    });

    res.status(201).send(expense);
  }
};

const getExpense = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.findExpense(+id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expense);
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;

  let expense = await expensesService.findExpense(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  expense = Object.assign(expense, { title });

  expensesService.changeExpense(expense);

  res.send(expense);
};

const removeExpense = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.findExpense(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  expensesService.deleteExpense(expense.id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  addExpense,
  removeExpense,
  getExpense,
  updateExpense,
};
