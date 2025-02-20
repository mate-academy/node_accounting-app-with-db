function isValidId(id) {
  if (isNaN(id) || Number(id) <= 0) {
    return false;
  }

  return true;
}

module.exports = {
  isValidId,
};
