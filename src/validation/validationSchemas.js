const { fields, ent, mthds } = require('../static/vocab');

const expSchema = {
  [fields[ent.exp].spentAt]: 'dateIsoString',
  [fields[ent.exp].title]: 'string',
  [fields[ent.exp].amount]: 0,
  [fields[ent.exp].category]: 'string',
  [fields[ent.exp].note]: 'string',
};

const bodySchemas = {
  [ent.usr]: {
    [mthds.post]: { [fields[ent.usr].name]: 'string' },
    [mthds.patch]: { [fields[ent.usr].name]: 'string' },
  },
  [ent.exp]: {
    [mthds.post]: { [fields[ent.exp].userId]: 'uuid', ...expSchema },
    [mthds.patch]: { ...expSchema },
  },
};

module.exports = { bodySchemas };
