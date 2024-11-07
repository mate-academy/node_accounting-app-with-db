const expenseService = require('./../services/expense.service');
const userService = require('./../services/user.service');

const serverError = {
  message: 'Server error',
};

const userNotFound = {
  message: 'User not found',
};

const getAllExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  try {
    const expenses = await expenseService.getAllExpenses({
      userId,
      categories,
      from,
      to,
    });

    res.status(200).send(expenses);
  } catch (error) {
    res.status(500).send(serverError);
  }
};

const createExpense = async (req, res) => {
  const data = req.body;

  try {
    const user = await userService.getUserById(data.userId);

    if (!user) {
      return res.status(400).send(userNotFound);
    }

    const expense = await expenseService.createExpense(data);

    res.status(201).send(expense);
  } catch (error) {
    res.status(500).send(serverError);
  }
};

const getOneExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await expenseService.getExpenseById(id);

    if (!expense) {
      return res.status(404).send(userNotFound);
    }

    res.status(200).send(expense);
  } catch (error) {
    return res.status(500).send(serverError);
  }
};

const removeExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await expenseService.getExpenseById(id);

    if (!expense) {
      return res.status(404).send(userNotFound);
    }

    await expenseService.deleteExpense(id);
    res.status(204);
  } catch (error) {
    return res.status(500).send(serverError);
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, spentAt, note } = req.body;

  try {
    const expense = await expenseService.getExpenseById(id);

    if (!expense) {
      return res.status(404).send(userNotFound);
    }

    const updatedExpense = await expenseService.updateExpense(id, {
      title: title !== undefined ? title : expense.title,
      amount: amount !== undefined ? amount : expense.amount,
      category: category !== undefined ? category : expense.category,
      spentAt: spentAt !== undefined ? spentAt : expense.spentAt,
      note: note !== undefined ? note : expense.note,
    });

    res.status(200).send(updatedExpense);
  } catch (error) {
    return res.status(500).send(serverError);
  }
};

module.exports = {
  getAllExpenses,
  createExpense,
  getOneExpense,
  removeExpense,
  updateExpense,
};
