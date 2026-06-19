const { ent, mthds, httpStatus } = require('../static/vocab');
const { ValidationError, errorMsg } = require('../errors');
const { validationTable } = require('./utils');

function validateRequest(req) {
  // parse URL and method
  const url = new URL(req.url, 'http://localhost');
  const method = req.method;

  // validate method in mthds
  if (!Object.values(mthds).includes(method)) {
    throw new ValidationError(errorMsg.method(method), httpStatus.badRequest);
  }

  // validate path
  const path = url.pathname;
  const segments = path.split('/');
  const reqEnt = segments[1];

  // validate length
  if (segments.length > 3 || segments.length === 1) {
    throw new ValidationError(errorMsg.endpoint(path), httpStatus.badRequest);
  }

  // check requested entity is in whitelist
  if (!Object.values(ent).includes(reqEnt)) {
    throw new ValidationError(errorMsg.entity(reqEnt), httpStatus.badRequest);
  }

  // check whole url
  if (!validationTable[reqEnt][method](path)) {
    throw new ValidationError(errorMsg.wholeUrl(path), httpStatus.badRequest);
  }

  const id = segments[2] ? segments[2] : null;

  return {
    ent: reqEnt,
    method,
    id,
  };
}

module.exports = { validateRequest };
