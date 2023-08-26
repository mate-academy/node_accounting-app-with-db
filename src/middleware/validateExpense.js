'use strict';

function validateExpense(req, res, next) {
  const requiredFields = [
    'userId',
    'spentAt',
    'title',
    'amount',
    'category',
  ];
  const errors = [];
  const existedFields = Object.keys(req.body);

  for (const requiredField of requiredFields) {
    if (!existedFields.includes(requiredField)) {
      errors.push({
        message: `'${requiredField}' field is required`,
      });
    }
  }

  for (const field of existedFields) {
    if (['userId', 'amount'].includes(field)
      && (isNaN(+req.body[field]) || +req.body[field] <= 0)
    ) {
      errors.push({
        message: `${field} is not a number`,
      });

      continue;
    }

    if (['title', 'category'].includes(field)
      && typeof req.body[field] !== 'string'
    ) {
      errors.push({
        message: `${field} is not a string`,
      });
    }
  }

  if (new Date(req.body.spentAt).toString() === 'Invalid Date') {
    errors.push({
      message: 'Invalid Date',
    });
  }

  if (errors.length > 0) {
    res.status(422).send({ message: 'Bad request' });

    return;
  }

  next();
}

module.exports = {
  validateExpense,
};
