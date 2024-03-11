'use strict';

const getId = (array) => (
  (array.length && Math.max(...array.map(user => user.id))) + 1
);

module.exports = { getId };
