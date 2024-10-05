const { Expense } = require('./models/Expense.model');

async function getAllExpenses(queries) {
  if (!queries || Object.keys(queries).length === 0) {
    try {
      return await Expense.findAll();
    } catch (err) {
      throw err;
    }
  }

  if (queries.userId) {
    return Expense.findAll({
      where: { userId: queries.userId },
    });
  }

  if (queries.categories) {
    return Expense.findAll({
      where: { userId: queries.categories },
    });
  }

  if (queries.from) {
    return Expense.findAll({
      where: { userId: queries.from },
    });
  }

  if (queries.to) {
    return Expense.findAll({
      where: { userId: queries.to },
    });
  }
}

async function getExpenseById(expenseId) {
  try {
    return await Expense.findByPk(expenseId);
  } catch (err) {
    throw err;
  }
}

async function addExpense(userId, spentAt, amount, title, category, note) {
  try {
    return await Expense.create({
      id: Math.floor(Math.random() * 1000),
      userId: userId,
      spentAt: spentAt,
      amount: amount,
      title: title,
      category: category,
      note: note,
    });
  } catch (err) {
    throw err;
  }
}

async function deleteExpense(expenseId) {
  try {
    return await Expense.destroy({ where: { id: expenseId } });
  } catch (err) {
    throw err;
  }
}

function updateExpense(expenseId, updating) {
  try {
    return Expense.update(updating, { where: { id: expenseId } });
  } catch (err) {
    throw err;
  }
}

function validateNewExpense(req, res, next) {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId || !spentAt || !title || !amount || !category || !note) {
    return res.sendStatus(400);
  }

  next();
}

module.exports = {
  getAllExpenses,
  addExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
  validateNewExpense,
};
