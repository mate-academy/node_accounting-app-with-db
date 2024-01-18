'use strict';

const getNewId = (arr) => {
  if (!arr.length) {
    return 1;
  }

  return Math.max(...arr.map(el => el.id)) + 1;
};

module.exports = { getNewId };
