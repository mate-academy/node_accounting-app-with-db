const { ent, mthds, fields } = require('../static/vocab');

const validationTable = {
  [ent.usr]: {
    [mthds.get]: (path) => /^\/users(\/[0-9a-f-]+)?$/.test(path),
    [mthds.patch]: (path) => /^\/users\/[0-9a-f-]+$/.test(path),
    [mthds.post]: (path) => path === `/${ent.usr}`,
    [mthds.delete]: (path) => /^\/users\/[0-9a-f-]+$/.test(path),
  },
  [ent.exp]: {
    [mthds.get]: (exp) => /^\/expenses(\/[0-9a-f-]+)?$/.test(exp),
    [mthds.patch]: (exp) => /^\/expenses\/[0-9a-f-]+$/.test(exp),
    [mthds.post]: (exp) => exp === `/${ent.exp}`,
    [mthds.delete]: (exp) => /^\/expenses\/[0-9a-f-]+$/.test(exp),
  },
  [ent.cat]: {
    [mthds.get]: (path) => /^\/categories(\/[0-9a-f-]+)?$/.test(path),
    [mthds.patch]: (path) => /^\/categories\/[0-9a-f-]+$/.test(path),
    [mthds.post]: (path) => path === `/${ent.cat}`,
    [mthds.delete]: (path) => /^\/categories\/[0-9a-f-]+$/.test(path),
  },
};

const edgeCaseHandler = {
  [fields[ent.exp].spentAt]: (received) => {
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d{3})?Z?$/;

    if (!isoDateRegex.test(received)) {
      return false;
    }

    const date = new Date(received);

    return !isNaN(date.getTime());
  },
};

module.exports = { validationTable, edgeCaseHandler };
