'use strict';

function generateId(arr) {
  if (!arr.length) {
    return 1;
  }

  const ids = arr.map(a => a.id);

  return Math.max(...ids) + 1;
}

module.exports = { generateId };
