const expenseService = require('../services/expense.service');

const findExpense = async (req, res, next) => {
  const expenseId = Number(req.params.id);
  const expense = await expenseService.getExpenseById(expenseId);

  if (!expense) {
    return res.status(404).json({ error: 'Expense not Found' });
  }
  req.expense = expense;
  next();
};

module.exports = {
  findExpense,
};
