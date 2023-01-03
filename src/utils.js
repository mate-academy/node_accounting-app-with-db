'use strict';

const findMaxId = (arr) => arr.length
  ? Math.max(...arr.map(({ id }) => id))
  : 0;

module.exports.findMaxId = findMaxId;
