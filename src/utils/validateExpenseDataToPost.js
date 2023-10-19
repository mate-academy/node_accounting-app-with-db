'use strict';

function validateExpenseDataToPost({ spentAt, title, amount, category }) {
  return typeof spentAt === 'string'
  || typeof title === 'string'
  || typeof amount === 'number'
  || typeof category === 'string';
}

module.exports = {
  validateExpenseDataToPost,
};
