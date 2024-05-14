const userService = require('../services/user.service');
const { ERRORS } = require('../utils/errors');

const checkUserExist = (userId) => !!userService.getUserById(userId);

const validateRequestData = ({
  userId,
  title,
  amount,
  category,
  isCreatingExpense = true,
}) => {
  if (isCreatingExpense && !userId) {
    return ERRORS.userIdRequired;
  }

  if (!title || typeof title !== 'string') {
    return ERRORS.titleRequired;
  }

  if (typeof amount !== 'number') {
    return ERRORS.amountRequired;
  }

  if (!category || typeof category !== 'string') {
    return ERRORS.categoryRequired;
  }
};

module.exports = {
  checkUserExist,
  validateRequestData,
};
