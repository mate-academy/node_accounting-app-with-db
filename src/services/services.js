const { ent, mthds } = require('../static/vocab');
const { get, patch } = require('./general.service');
const { postExpense, deleteExpense } = require('./expense.service');
const { postUser, deleteUser } = require('./user.service');

const service = {
  [ent.usr]: {
    [mthds.get]: (id = null) => get(ent.usr, id),
    [mthds.post]: (body) => postUser(body),
    [mthds.delete]: (id) => deleteUser(id),
    [mthds.patch]: (id, body) => patch(ent.usr, id, body),
    normalize: ({ id, name }) => {
      return { id, name };
    },
  },
  [ent.exp]: {
    [mthds.get]: (id = null) => get(ent.exp, id),
    [mthds.post]: (body) => postExpense(body),
    [mthds.delete]: (id) => deleteExpense(id),
    [mthds.patch]: (id, body) => patch(ent.exp, id, body),
    normalize: ({ createdAt, ...args }) => {
      return { ...args };
    },
  },
};

module.exports = { service };
