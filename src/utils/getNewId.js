'use strict';

const getNewId = (entry) => {
  if (!entry.length) {
    return 1;
  }

  const ids = entry.map(entryPart => entryPart.id);
  const maxId = Math.max(...ids);

  return maxId + 1;
};

module.exports = { getNewId };
