const expenseService = require('../services/expensesService');

const isExpenseExist = async (id) => {
  if (!(await expenseService.getExpenseById(id))) {
    return true;
  }
};

const validateRequestBodyFields = ({
  userId,
  title,
  amount,
  isCreatingExpense = true,
}) => {
  if (isCreatingExpense && !userId) {
    throw new Error('provide userId');
  }

  if (!title || typeof title !== 'string') {
    throw new Error(
      'Invalid request: "title" is required and must be a string.',
    );
  }

  if (typeof amount !== 'number') {
    throw new Error('Invalid request: "amount" must be a number.');
  }
};

const normalize = ({ dataValues: expense }) => {
  const { password, ...rest } = expense;

  return rest;
};

module.exports = {
  isExpenseExist,
  validateRequestBodyFields,
  normalize,
};
