'use strict';

const idGenerator = (arr) => {
  if (!arr.length) {
    return 1;
  }

  const maxId = Math.max(...arr.map(({ id }) => id));

  return maxId + 1;
};

module.exports = idGenerator;
