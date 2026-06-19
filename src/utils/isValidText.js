function isValidText(field) {
  return typeof field === 'string' && field.trim().length > 0;
}

module.exports = {
  isValidText,
};
