'use strict';

const validateData = (data) => {
  const { userId, title, spentAt, amount, category } = data;

  const requiredFields = ['userId', 'spentAt', 'title', 'amount', 'category'];
  const requestFields = Object.keys(data);

  const isReqFieldsValid = requiredFields.every((field) =>
    requestFields.includes(field)
  );

  const isDataValid
    = typeof userId === 'number'
    && typeof title === 'string'
    && Date.parse(spentAt)
    && typeof amount === 'number'
    && typeof category === 'string';

  return isReqFieldsValid && isDataValid;
};

module.exports = validateData;
