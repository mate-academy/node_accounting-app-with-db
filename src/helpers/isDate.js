'use strict';

function isDate(dateToTest) {
  return isNaN(dateToTest) && !isNaN(Date.parse(dateToTest));
}

module.exports = { isDate };
