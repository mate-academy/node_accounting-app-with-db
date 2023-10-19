'use strict';

function validateId(id) {
  return !id || isNaN(id);
}

module.exports = {
  validateId,
};
