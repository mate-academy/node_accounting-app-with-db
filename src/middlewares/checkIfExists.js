const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const checkIfExists = (entryType) => {
  return async (req, res, next) => {
    const { id } = req.params;
    const entryServices = {
      user: userService,
      expense: expenseService,
    };

    const entry = await entryServices[entryType].getById(id);

    if (!entry) {
      res.sendStatus(404);
    } else {
      req.entry = entry;
      next();
    }
  };
};

module.exports = { checkIfExists };
