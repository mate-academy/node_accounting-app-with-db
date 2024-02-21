'use strict';

const generateUniqueId = () => {
  return Math.floor(Math.random() * Date.now());
};

module.exports = { generateUniqueId };
