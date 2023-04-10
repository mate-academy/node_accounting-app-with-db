'use strict';

const generateId = () => {
  return Math.trunc(Math.random() * 100000);
};

module.exports = { generateId };
