function isValidDate(date) {
  return date && !isNaN(Date.parse(date));
}

module.exports = {
  isValidDate,
};
