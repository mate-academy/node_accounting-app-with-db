const {
  createExpenseService,
  getExpenseByIdService,
  updateExpenseService,
  deleteExpenseService,
  getAllExpensesService,
} = require('../services/expense-services');
const { getUserByIdService } = require('../services/user-service');

const createExpenseController = async (req, res) => {
  try {
    const expense = req.body;

    await getUserByIdService(expense.userId);

    const newExpense = await createExpenseService(expense);

    res.status(201).json(newExpense);
  } catch (error) {
    res.status(400).json({ issue: error.message.split(',') });
  }
};

const getAllExpensesController = async (req, res) => {
  try {
    const expenses = await getAllExpensesService(req.query);

    return res.status(200).json(expenses);
  } catch (error) {
    if (error.message.includes('No expenses found')) {
      return res.status(404).json({ issue: error.message });
    }

    res.status(400).json({ issue: error.message });
  }
};

const getExpenseByIdController = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await getExpenseByIdService(Number(id));

    res.status(200).json(expense);
  } catch (error) {
    if (error.message.includes('Expense not found')) {
      return res.status(404).json({ issue: error.message });
    }

    res.status(400).json({ issue: error.message });
  }
};

const updateExpenseController = async (req, res) => {
  const { id } = req.params;
  const expense = req.body;

  try {
    const updatedExpense = await updateExpenseService(Number(id), expense);

    res.status(200).json(updatedExpense);
  } catch (error) {
    if (error.message.includes('Expense not found')) {
      return res.status(404).json({ issue: error.message });
    }

    res.status(400).json({ issue: error.message.split(',') });
  }
};

const deleteExpenseController = async (req, res) => {
  const { id } = req.params;

  try {
    await deleteExpenseService(Number(id));

    res.status(204).send();
  } catch (error) {
    res.status(404).json({ issue: error.message });
  }
};

module.exports = {
  createExpenseController,
  getAllExpensesController,

  getExpenseByIdController,
  updateExpenseController,
  deleteExpenseController,
};
