/* eslint-disable no-console */
const expenseService = require('../services/expense.service');
const userService = require('../services/user.service');

const checkIfExists = (entryType) => {
  return async (req, res, next) => {
    const { id } = req.params;
    const entryServices = {
      user: userService,
      expense: expenseService,
    };

    try {
      const entry = await entryServices[entryType].getById(id);

      if (!entry) {
        return res.sendStatus(404);
      }

      req.entry = entry;
      next();
    } catch (error) {
      console.error(`Error fetching ${entryType} with ID ${id}:`, error);

      res.status(500).send({
        error: `An error occurred while retrieving the ${entryType}.`,
      });
    }
  };
};

module.exports = { checkIfExists };
