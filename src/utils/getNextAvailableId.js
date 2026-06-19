const getNextAvailableId = (array) => {
  if (array.length === 0) {
    return 1;
  }

  const idsArray = array.map((arr) => arr.id);
  const nexId = Math.max(...idsArray) + 1;

  return nexId;
};

module.exports = getNextAvailableId;
