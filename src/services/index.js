'use strict';

const generateID = (data) => {
  const id = data.length > 0 ? +data[data.length - 1].id + 1 : data.length + 1;

  return id;
};

module.exports = { generateID };
