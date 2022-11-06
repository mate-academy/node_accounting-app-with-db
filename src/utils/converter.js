'use strict';

function convertToSec(str) {
  const dateS = new Date(str).getTime();

  return Math.trunc(dateS / 1000);
}
module.exports = { convertToSec };
