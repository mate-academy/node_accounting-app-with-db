const userService = require('../services/user.service');
const expenseService = require('../services/expense.service');

const isUserExist = async (userId, res) => {
  if (!(await userService.getById(userId))) {
    res.status(400).send('User not found');

    return true;
  }

  return false;
};

const isExpenseExist = async (id, res) => {
  if (!(await expenseService.getExpenseById(id))) {
    res.status(404).send('Expense with this id not found');

    return true;
  }

  return false;
};

const validateRequestBodyFields = ({
  userId,
  title,
  amount,
  category,
  res,
  isCreatingExpense = true,
}) => {
  if (isCreatingExpense && !userId) {
    res.status(400).send('provide userId');

    return true;
  }

  if (!title || typeof title !== 'string') {
    res
      .status(400)
      .send('Invalid request: "title" is required and must be a string.');

    return true;
  }

  if (typeof amount !== 'number') {
    res.status(400).send('Invalid request: "amount" must be a number.');

    return true;
  }

  if (!category || typeof category !== 'string') {
    res
      .status(400)
      .send('Invalid request: "category" is required and must be a string.');

    return true;
  }
};

const normalize = ({ id, userId, spentAt, title, amount, category, note }) => {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
};

module.exports = {
  isUserExist,
  isExpenseExist,
  validateRequestBodyFields,
  normalize,
};
