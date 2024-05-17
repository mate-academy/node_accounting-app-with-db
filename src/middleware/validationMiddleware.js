const validateExpenseInput = (req, res, next) => {
  const { userId, spentAt, title, amount } = req.body;

  if (!userId || !spentAt || !title || !amount) {
    return res.sendStatus(400);
  }

  next();
};

const validateUserInput = (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  next();
};

const validateId = (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(400);
  }

  next();
};

module.exports = {
  validateExpenseInput,
  validateUserInput,
  validateId,
};
