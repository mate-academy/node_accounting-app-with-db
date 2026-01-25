const { dbActions, mthds, ent } = require('../static/constants');
const { User, Expense } = require('../models/models');

const entToActionMap = {
  [ent.usr]: User,
  [ent.exp]: Expense,
};

const methodsToDbActions = {
  [mthds.post]: dbActions.post,
  [mthds.patch]: dbActions.patch,
  [mthds.delete]: dbActions.delete,
};

const controllerRouter = (entity, method, id = null, body = null) => {
  const table = entToActionMap[entity];

  let action = methodsToDbActions[method];

  if (!action) {
    action = id === null ? table.findAll() : table.getOne;
  }

  const args = [entity, id, body].filter((arg) => arg !== null);

  return { action: action, args: args };
};

module.exports = { controllerRouter };
