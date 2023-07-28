'use strict';

function createErrorStatus(res, code, entity) {
  let message = '';

  if (code === 400) {
    message = `Parameter '${entity}' is required.`;
  }

  if (code === 404) {
    message = `Expected entity with id:${entity} doesn't exist.`;
  }

  return res.status(code).send(message);
}

module.exports.createErrorStatus = createErrorStatus;
