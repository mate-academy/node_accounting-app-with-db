'use strict';

const isValidData = (data, method) => {
  const {
    spentAt,
    title,
    amount,
    category,
  } = data;

  if (method === 'POST') {
    return typeof spentAt === 'string'
    && typeof title === 'string'
    && typeof category === 'string'
    && spentAt.length > 0
    && title.length > 0
    && category.length > 0
    && typeof amount === 'number';
  }

  return isValidStringField(spentAt)
    && isValidStringField(title)
    && isValidNumericField(amount)
    && isValidStringField(category);
};

const isValidStringField = (field) => {
  let isValid = true;

  if (typeof field !== 'undefined') {
    isValid = typeof field === 'string' && field.length > 0;
  }

  return isValid;
};

const isValidNumericField = (field) => {
  let isValid = true;

  if (typeof field !== 'undefined') {
    isValid = typeof field === 'number';
  }

  return isValid;
};

module.exports = { isValidData };
