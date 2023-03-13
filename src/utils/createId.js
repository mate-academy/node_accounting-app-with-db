'use strict';

const createId = (data) => {
  const ids = data.map(item => item.id);

  if (!ids.length) {
    return 1;
  }

  const maxId = Math.max(...ids);

  return maxId + 1;
};

module.exports = { createId };
