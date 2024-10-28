const expenseService = require('./../services/expense.service');

const validateExpense = () => {
  return async (req, res, next) => {
    const { id } = req.params;
    const entry = await expenseService.getById(id);

    if (!entry) {
      res.sendStatus(404);
    } else {
      req.entry = entry;
      next();
    }
  };
};

module.exports = { validateExpense };
