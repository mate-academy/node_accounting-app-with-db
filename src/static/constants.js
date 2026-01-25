const { User, Expense } = require('../models/models');

const ent = {
  usr: 'users',
  exp: 'expenses',
};

const tableMap = {
  [ent.usr]: User,
  [ent.exp]: Expense,
};

const mthds = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  delete: 'DELETE',
};

const edgeCases = {
  date: 'spentAt',
};

const expSchema = {
  [edgeCases.date]: 'dateIsoString',
  title: 'string',
  amount: 0,
  category: 'string',
  note: 'string',
};

const bodySchemas = {
  [ent.usr]: {
    [mthds.post]: { name: 'string' },
    [mthds.patch]: { name: 'string' },
  },
  [ent.exp]: {
    [mthds.post]: { userId: 0, ...expSchema },
    [mthds.patch]: { ...expSchema },
  },
};

const PORT = 3000;

module.exports = {
  ent,
  PORT,
  bodySchemas,
  mthds,
  edgeCases,
  tableMap,
};
