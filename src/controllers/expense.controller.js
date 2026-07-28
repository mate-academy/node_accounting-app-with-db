const expenseService = require('../services/expense.service');

function cleanExpense(expense) {
  if (!expense) {
    return null;
  }

  const data = expense.toJSON ? expense.toJSON() : { ...expense };

  delete data.createdAt;
  delete data.updatedAt;

  return data;
}

const getAll = async (req, res, next) => {
  try {
    const expenses = await expenseService.getAll(req.query);
    const cleanedExpenses = expenses.map(cleanExpense);

    res.send(cleanedExpenses);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await expenseService.getById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    res.send(cleanExpense(expense));
  } catch (error) {
    next(error);
  }
};

const create = async (req, res, next) => {
  try {
    const { userId, title, amount } = req.body;

    if (!userId || !title || amount === undefined) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newExpense = await expenseService.create(req.body);

    const responseData = cleanExpense(newExpense);

    return res.status(201).json(responseData);
  } catch (error) {
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await expenseService.getById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    const updatedExpense = await expenseService.update(id, req.body);

    res.send(cleanExpense(updatedExpense));
  } catch (error) {
    next(error);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const expense = await expenseService.getById(id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await expenseService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
