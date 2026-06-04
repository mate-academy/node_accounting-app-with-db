const { body, validationResult } = require('express-validator');

const createExpenseValidationRules = [
  body('userId')
    .exists()
    .withMessage('userId is required')
    .custom((value) => {
      if (typeof value !== 'number' || value <= 0) {
        throw new Error('userId must be a positive integer');
      }

      return true;
    }),
  body('spentAt')
    .exists()
    .withMessage('spentAt is required')
    .isISO8601()
    .withMessage('spentAt must be a valid date'),
  body('title')
    .exists()
    .withMessage('title is required')
    .isString()
    .withMessage('title must be a string')
    .isLength({ max: 255 })
    .withMessage('title is too long'),
  body('amount')
    .exists()
    .withMessage('amount is required')
    .custom((value) => {
      if (typeof value !== 'number' || value < 0) {
        throw new Error('amount must be a positive number');
      }

      return true;
    }),
  body('category')
    .optional()
    .isString()
    .withMessage('category must be a string')
    .isLength({ max: 255 })
    .withMessage('category is too long'),
  body('note')
    .optional()
    .isString()
    .withMessage('note must be a string')
    .isLength({ max: 255 })
    .withMessage('note is too long'),
];

const updateExpenseValidationRules = [
  body('title')
    .optional()
    .isString()
    .withMessage('title must be a string')
    .isLength({ max: 255 })
    .withMessage('title is too long'),
  body('spentAt')
    .optional()
    .isISO8601()
    .withMessage('spentAt must be a valid date'),
  body('amount')
    .optional()
    .custom((value) => {
      if (typeof value !== 'number' || value < 0) {
        throw new Error('amount must be a positive number');
      }

      return true;
    }),
  body('category')
    .optional()
    .isString()
    .withMessage('category must be a string')
    .isLength({ max: 255 })
    .withMessage('category is too long'),
  body('note')
    .optional()
    .isString()
    .withMessage('note must be a string')
    .isLength({ max: 255 })
    .withMessage('note is too long'),
];

const validateExpense = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  createExpenseValidationRules,
  updateExpenseValidationRules,
  validateExpense,
};
