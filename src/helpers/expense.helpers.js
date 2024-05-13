const userService = require('../services/user.service');
const {
  USER_NOT_FOUND_ERROR,
  AMOUNT_REQUIRED_ERROR,
  USER_ID_REQUIRED_ERROR,
  TITLE_REQUIRED_ERROR,
  CATEGORY_REQUIRED_ERROR,
} = require('../utils/config');

const isUserExist = (userId, res) => {
  const user = userService.getUserById(userId);

  if (!user) {
    res.status(400).send(USER_NOT_FOUND_ERROR);

    return true;
  }
};

const validateRequestData = ({
  userId,
  title,
  amount,
  category,
  res,
  isCreatingExpense = true,
}) => {
  if (isCreatingExpense && !userId) {
    res.status(400).send(USER_ID_REQUIRED_ERROR);

    return true;
  }

  if (!title || typeof title !== 'string') {
    res.status(400).send(TITLE_REQUIRED_ERROR);

    return true;
  }

  if (typeof amount !== 'number') {
    res.status(400).send(AMOUNT_REQUIRED_ERROR);

    return true;
  }

  if (!category || typeof category !== 'string') {
    res.status(400).send(CATEGORY_REQUIRED_ERROR);

    return true;
  }
};

module.exports = {
  isUserExist,
  validateRequestData,
};
