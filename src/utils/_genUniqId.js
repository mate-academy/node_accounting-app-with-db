'use strict';

const generateUniqueId = () => {
  const timestamp = new Date().getTime();
  const randomNumber = Math.random() * 1000000;
  const uniqueId = Math.floor(timestamp + randomNumber);

  return uniqueId;
};

module.exports = { generateUniqueId };
