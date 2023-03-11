'use strict';

const dateNormalize = (dateString) => {
  const dateParts = dateString.split(' ');

  const date = dateParts[0];
  const time = dateParts[1];
  const timezone = dateParts[2];

  const normalized = `${date} ${time}+${timezone}`;

  return normalized;
};

module.exports = { dateNormalize };
