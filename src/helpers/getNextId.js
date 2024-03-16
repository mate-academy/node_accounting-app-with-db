'use strict';

const getNextId = (items) => {
  if (!items.length) {
    return 1;
  }

  const ids = items.map(({ id }) => id);

  return Math.max(...ids) + 1;
};

module.exports = {
  getNextId,
};
