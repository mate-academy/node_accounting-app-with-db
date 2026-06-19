'use strict';

function createId(arr) {
  const ids = arr.map((item) => item.id);

  return ids.length ? Math.max(...ids) + 1 : 1;
}

module.exports = createId;
