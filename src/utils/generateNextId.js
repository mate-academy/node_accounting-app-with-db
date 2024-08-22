function generateNextId(items) {
  return items.length ? Math.max(...items.map((item) => item.id)) + 1 : 1;
}

module.exports = generateNextId;
