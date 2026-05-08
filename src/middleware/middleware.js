const isValidId = (req, res, next) => {
  const { id } = req.params;

  const numericId = Number(id);

  if (!id || Number.isNaN(numericId)) {
    return res
      .status(400)
      .send('id: required parameter is not passed or it is not a valid number');
  }

  next();
};

const isValidBody = (req, res, next) => {
  if (typeof req.body !== 'object' || req.body === null) {
    return res.status(400).send('Required content is not passed');
  }

  const validators = {
    '/users': (body) => {
      const { name } = body;

      return typeof name === 'string' && name.trim().length > 0;
    },
    '/categories': (body) => {
      const { name } = body;

      return typeof name === 'string' && name.trim().length > 0;
    },
    '/expenses': (body) => {
      const { userId, spentAt, title, amount } = body;

      return (
        userId != null &&
        spentAt != null &&
        title != null &&
        amount != null &&
        typeof userId === 'number' &&
        typeof amount === 'number' &&
        typeof title === 'string'
      );
    },
  };

  const validator = validators[req.baseUrl];

  if (validator && !validator(req.body)) {
    return res.status(400).send('Invalid request body');
  }

  next();
};

module.exports = {
  isValidId,
  isValidBody,
};
