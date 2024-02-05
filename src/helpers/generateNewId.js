'use strict';

function generateNewId(array) {
  if (array.length === 0) {
    return 1;
  }

  const ids = array.map(obj => obj.id);

  return Math.max(...ids) + 1;
}

module.exports = { generateNewId };
