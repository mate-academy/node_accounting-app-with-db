'use strict';

module.exports.getMaxId = (array) => {
  let max = -1;

  array.forEach(item => {
    if (item.id > max) {
      max = item.id;
    }
  });

  return max;
};
