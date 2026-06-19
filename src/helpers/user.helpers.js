const validateName = (name) => !name || typeof name !== 'string';

module.exports = {
  validateName,
};
