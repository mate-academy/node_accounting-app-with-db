const parseDate = (value) => {
  if (!value) {
    return undefined;
  }

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return null; // invalid date
  }

  return date;
};

module.exports = {
  parseDate,
};
