const expensesService = require('../services/expense.service');
const { existUser } = require('../services/user.service');

const getAllExpense = (request, response) => {
  const query = request.query;
  const expenses = expensesService.getAllExpense();

  if (!query.userId && !query.from && !query.to && !query.categories) {
    response.status(200).json(expenses);

    return;
  }

  const categories = query.categories?.split(',');

  const filteredExpenses = expensesService.filterQuery({
    userId: query.userId,
    from: query.from,
    to: query.to,
    categories: categories,
  });

  response.status(200).json(filteredExpenses);
};

const createExpense = (request, response) => {
  const { userId, spentAt, title, amount, category, note } = request.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    response.status(400).send();

    return;
  }

  if (!existUser(userId)) {
    response.status(400).send();

    return;
  }

  const newExpense = expensesService.addExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!newExpense) {
    response.status(500).send();

    return;
  }

  response.status(201).send(newExpense);
};

const getOneExpense = (request, response) => {
  const expenseId = Number(request.params.id);
  const expense = expensesService.getExpenseById(expenseId);

  if (!expense) {
    response.status(404).send();

    return;
  }

  response.status(200).send(expense);
};

const deleteExpense = (request, response) => {
  const expenseId = Number(request.params.id);
  const expenseToDelete = expensesService.getExpenseById(expenseId);

  if (!expenseToDelete) {
    return response.status(404).send();
  }

  expensesService.deleteExpense(expenseId);

  return response.status(204).send();
};

const updateExpense = (request, response) => {
  const expenseId = Number(request.params.id);
  const { title } = request.body;

  const expenseToUpdate = expensesService.getExpenseById(expenseId);

  if (!expenseToUpdate) {
    response.status(404).send();

    return;
  }

  if (title) {
    expenseToUpdate.title = title;
  }

  response.status(200).json({
    id: expenseId,
    ...expenseToUpdate,
  });
};

module.exports = {
  getAllExpense,
  createExpense,
  getOneExpense,
  deleteExpense,
  updateExpense,
};
