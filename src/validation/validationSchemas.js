const { fields, ent, mthds } = require('../static/vocab');

const expSchema = {
  [fields[ent.exp].spentAt]: 'dateIsoString',
  [fields[ent.exp].title]: 'string',
  [fields[ent.exp].amount]: 0,
  [fields[ent.exp].categoryId]: 'uuid',
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
  [ent.cat]: {
    [mthds.post]: { [fields[ent.cat].name]: 'string' },
    [mthds.patch]: { [fields[ent.cat].name]: 'string' },
  },
};

const requiredFields = {
  [ent.usr]: {
    [mthds.post]: [fields[ent.usr].name],
  },
  [ent.exp]: {
    [mthds.post]: [
      fields[ent.exp].userId,
      fields[ent.exp].spentAt,
      fields[ent.exp].title,
      fields[ent.exp].amount,
      fields[ent.exp].categoryId,
    ],
  },
  [ent.cat]: {
    [mthds.post]: [fields[ent.cat].name],
  },
};

module.exports = { bodySchemas, requiredFields };
