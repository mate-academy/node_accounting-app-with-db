'use strict';

function checkUuid(uuid) {
  return /^[0-9][a-f][-]+$/.test(uuid);
}

function makeValidDate(date) {
  if (!date) {
    return;
  }

  const firstSpaceIndex = date.indexOf(' ');
  const secondSpaceIndex = date.lastIndexOf(' ');

  const validDate = date.slice(0, firstSpaceIndex) + 'T'
    + date.slice(firstSpaceIndex + 1, secondSpaceIndex) + 'Z';

  return validDate;
}

module.exports = {
  checkUuid,
  makeValidDate,
};
