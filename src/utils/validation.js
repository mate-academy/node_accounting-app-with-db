const { getErrorWithStatus } = require('./getError');

const getValidId = (id, errorMessage) => {
  const numberId = Number(id);

  if (isNaN(numberId)) {
    throw getErrorWithStatus(400, errorMessage);
  }

  return numberId;
};

const getValidString = (value, fieldName) => {
  if (typeof value !== 'string') {
    throw getErrorWithStatus(400, `Type of ${fieldName} must be string`);
  }

  return value;
};

module.exports = {
  getValidId,
  getValidString,
};
