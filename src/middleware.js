const isValidDate = (date) => {
  return !isNaN(new Date(date).getTime());
};

module.exports = {
  isValidDate,
};
