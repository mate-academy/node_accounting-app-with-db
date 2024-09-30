function getNewId(objects) {
  const maxId = Math.max(...objects.map((item) => item.id), -1);

  return maxId + 1;
}

module.exports = { getNewId };
