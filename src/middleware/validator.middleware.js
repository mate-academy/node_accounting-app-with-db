const {
  getExpenseById,
  getFilteredExpenses,
} = require('../services/expenses.service');
const { getUserById } = require('../services/users.service');

const requestValidatorUser = (req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string' || name.trim().length === 0) {
    return res.sendStatus(400);
  } else {
    next();
  }
};

const requestValidatorUserExpense = async (req, res, next) => {
  const { userId, title } = req.body;
  const userExists = await getUserById(userId);

  if (!title || !userExists || !title.trim().length) {
    return res.sendStatus(400);
  } else {
    next();
  }
};

const currentUserValidator = async (req, res, next) => {
  const { id } = req.params;

  const currentUser = await getUserById(id);

  if (!currentUser) {
    return res.sendStatus(404);
  } else {
    next();
  }
};

const currentExpenseValidator = async (req, res, next) => {
  const { id } = req.params;

  const currentExpense = await getExpenseById(id);

  if (!currentExpense) {
    return res.sendStatus(404);
  } else {
    next();
  }
};

const validateExpenseData = async (req, res, next) => {
  const { userId, from, to, categories } = req.query;

  const expense = await getFilteredExpenses({
    userId,
    from,
    to,
    categories,
  });

  if (!expense) {
    return res.status(404).send('Expense not found');
  } else {
    next();
  }
};

module.exports = {
  requestValidatorUser,
  requestValidatorUserExpense,
  currentUserValidator,
  currentExpenseValidator,
  validateExpenseData,
};
