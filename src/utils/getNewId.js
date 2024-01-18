'use strict';

const getNewId = (items) => {
  if (!items.length) {
    return 1;
  }

  const ids = items.map((item) => item.id);
  const maxId = Math.max(...ids);

  return maxId + 1;
};

module.exports = {
  getNewId,
};
