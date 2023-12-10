'use strict';

const getNewId = (dataArr) => {
  if (dataArr.length === 0) {
    return 0;
  }

  return Math.max(...dataArr.map((el) => el.id)) || 0;
};

module.exports = {
  getNewId,
};
