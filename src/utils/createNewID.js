'use strict';

function findMaxID(array) {
  return Number.isInteger(Math.max(...array))
    ? Math.max(...array)
    : 0;
}

module.exports = {
  findMaxID,
};
