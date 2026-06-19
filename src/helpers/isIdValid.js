'use strict';

const isIdValid = (id) => {
  return !isNaN(+id);
};

module.exports = {
  isIdValid,
};
