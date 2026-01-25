const { ent, mthds } = require('../static/constants');
const { getValError } = require('./utils');

const validationTable = {
  [ent.usr]: {
    [mthds.get]: (path) => /^\/users(\/\d+)?$/.test(path),
    [mthds.patch]: (path) => /^\/users\/\d+$/.test(path),
    [mthds.post]: (path) => path === `/${ent.usr}`,
    [mthds.delete]: (path) => /^\/users\/\d+$/.test(path),
  },
  [ent.exp]: {
    [mthds.get]: (exp) => /^\/expenses(\/\d+)?$/.test(exp),
    [mthds.patch]: (exp) => /^\/expenses(\/\d+)$/.test(exp),
    [mthds.post]: (exp) => exp === `/${ent.exp}`,
    [mthds.delete]: (exp) => /^\/expenses(\/\d+)$/.test(exp),
  },
};

function validateRequest(req) {
  // parse URL and method
  const url = new URL(req.url, 'http://localhost');
  const method = req.method;

  // validate method in mthds
  if (!Object.values(mthds).includes(method)) {
    return getValError(400, 'Unexpected request method');
  }

  // validate path
  const path = url.pathname;
  const segments = path.split('/');
  const reqEnt = segments[1];

  // validate length
  if (segments.length > 3 || segments.length === 1) {
    return getValError(
      400,
      `Expected endpoint to be /entity/id?, received: ${path}`,
    );
  }

  // check requested entity is in whitelist
  if (!Object.values(ent).includes(reqEnt)) {
    return getValError(400, `Unexpected entity: ${reqEnt}`);
  }

  // check whole url
  if (!validationTable[reqEnt][method](path)) {
    return getValError(400, `Unexpected path`);
  }

  // make it return entity + id if needed

  const id = segments[2] ? Number(segments[2]) : null;

  return {
    ok: true,
    ent: reqEnt,
    method,
    id,
  };
}

module.exports = { validateRequest };
