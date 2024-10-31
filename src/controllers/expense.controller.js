const expenseService = require('../services/expense.service');
const userService = require('./../services/user.service');

const getExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  try {
    const expenses = await expenseService.getAllExpense({
      userId,
      categories,
      from,
      to,
    });

    res.status(200).send(expenses);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

const getOneExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await expenseService.getExpenseById(id);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }
    res.send(expense);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

const createExpense = async (req, res) => {
  const data = req.body;

  try {
    const user = await userService.getUserById(data.userId);

    if (!user) {
      return res.status(400).send('User not found');
    }

    const expense = await expenseService.createExpense(data);

    res.status(201).send(expense);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;
  const { title, amount, category, spentAt, note } = req.body;

  try {
    const expense = await expenseService.getExpenseById(id);

    if (!expense) {
      return res.status(404).send('Expense not found');
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
    res.status(500).send('Server error');
  }
};

const removeExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const exp = await expenseService.getExpenseById(id);

    if (!exp) {
      return res.status(404).send('Expense not found');
    }

    await expenseService.removeExpense(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send('Server error');
  }
};

module.exports = {
  getExpenses,
  getOneExpense,
  createExpense,
  updateExpense,
  removeExpense,
};
