'use strict';

const moment = require('moment');

const checkType = (key, value) => {
  switch (key) {
    case 'amount':
      if (!isNaN(+value)) {
        return true;
      }
      break;

    case 'userId':
      if (!isNaN(+value)) {
        return true;
      }
      break;

    case 'spentAt':
      return moment(value, moment.ISO_8601, true).isValid();

    case 'title':
      if (typeof value === 'string') {
        return true;
      }
      break;

    case 'category':
      if (typeof value === 'string') {
        return true;
      }
      break;

    case 'note':
      if (typeof value === 'string') {
        return true;
      }
      break;

    default:
      return false;
  }
};

module.exports = {
  checkType,
};
