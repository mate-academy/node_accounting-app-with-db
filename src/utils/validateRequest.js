'use strict';

const validateExpenseGetRequestQuery = ({ userId, categories, from, to }) => {
  return (userId ? !isNaN(parseInt(userId)) : true)
    && (categories
      ? (Array.isArray(categories) || typeof categories === 'string')
      : true)
    && (from ? !isNaN(new Date(from)) : true)
    && (to ? !isNaN(new Date(to)) : true);
};

const validateExpensePatchRequestBody = (
  { spentAt, title, amount, category, note }
) => {
  return (spentAt
    ? (typeof spentAt === 'string' && !isNaN(new Date(spentAt)))
    : true)
    && (title ? typeof title === 'string' : true)
    && (amount ? Number.isInteger(amount) : true)
    && (category ? typeof category === 'string' : true)
    && (note ? typeof note === 'string' : true);
};

const validateExpensePostRequestBody = (
  { userId, spentAt, title, amount, category, note }
) => {
  return Number.isInteger(userId)
    && (typeof spentAt === 'string' && !isNaN(new Date(spentAt)))
    && typeof title === 'string'
    && Number.isInteger(amount)
    && typeof category === 'string'
    && (note ? typeof note === 'string' : true);
};

module.exports = {
  validateExpenseGetRequestQuery,
  validateExpensePatchRequestBody,
  validateExpensePostRequestBody,
};
