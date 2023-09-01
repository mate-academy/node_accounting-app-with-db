'use strict';

const validateExpense = ({ required } = { required: true }) => {
  return (req, res, next) => {
    const { title, amount, category, note, userId } = req.body;
    let errorMessage = '';
    const areAllFieldsEntered = title !== undefined
    && amount !== undefined
    && category !== undefined
    && note !== undefined
    && userId !== undefined;

    if (required && !areAllFieldsEntered) {
      errorMessage
        = 'Fields title, amount, category, note, userId are required';
    } else if (
      areAllFieldsEntered
      && (
        typeof title !== 'string'
        || typeof amount !== 'number'
        || typeof category !== 'string'
        || typeof note !== 'string'
        || typeof userId !== 'string'
      )
    ) {
      errorMessage = 'Wrong types of fields';
    }

    if (errorMessage) {
      res.statusCode = 400;
      res.send(errorMessage);

      return;
    }

    next();
  };
};

const validateQueries = () => {
  return (req, res, next) => {
    const { userId, categories, from, to } = req.query;
    let errorMessage = '';
    // eslint-disable-next-line max-len
    const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const isValidUserId = uuidRegExp.test(userId);
    const isCategoriesValid = Array.isArray(categories)
      ? categories.every(category => typeof category === 'string')
      : typeof categories === 'string';
    const isFromToValid = !isNaN(new Date(from)) && !isNaN(new Date(to));

    if (
      (userId && !isValidUserId)
      || (categories && isCategoriesValid)
      || (from && to && isFromToValid)
    ) {
      errorMessage = 'Wrong types of fields';
    }

    if (errorMessage) {
      res.statusCode = 400;
      res.send(errorMessage);

      return;
    }

    next();
  };
};

module.exports = {
  validateExpense,
  validateQueries,
};
