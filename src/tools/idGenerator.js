'use strict';

function idGenerator(iterableWithId) {
  let maxId = iterableWithId.length > 0
    ? Math.max(...iterableWithId.map(user => user.id))
    : 0;

  return () => {
    maxId += 1;

    return maxId;
  };
}

module.exports = {
  idGenerator,
};
