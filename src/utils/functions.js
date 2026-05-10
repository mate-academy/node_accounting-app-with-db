function getId(arr) {
  if (arr.length === 0) {
    return 1;
  }

  const maxId = Math.max(...arr.map((item) => item.id || 0));

  return maxId + 1;
}

module.exports = {
  getId,
};
