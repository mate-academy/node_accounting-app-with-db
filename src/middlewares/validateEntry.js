const expenseService = require('./../services/expense.service');
const userService = require('./../services/user.service');

const validateEntry = (entryType) => {
  return async (req, res, next) => {
    const { id } = req.params;
    const funcTypes = {
      user: userService.getById(id),
      expense: expenseService.getById(id),
    };

    const entry = await funcTypes[entryType];

    if (!entry) {
      res.sendStatus(404);
    } else {
      req.entry = entry;
      next();
    }
  };
};

module.exports = { validateEntry };
