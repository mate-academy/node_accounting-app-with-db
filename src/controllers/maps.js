const { mthds, ent, httpStatus } = require('../static/vocab');
const services = require('../services');
const {
  userDTO,
  userListDTO,
  expenseDTO,
  expenseListDTO,
  categoryDto,
} = require('../dto');

const serviceMap = {
  [ent.usr]: {
    [mthds.get]: services.getUser,
    [mthds.post]: services.postUser,
    [mthds.patch]: services.patchUser,
    [mthds.delete]: services.deleteUser,
  },
  [ent.exp]: {
    [mthds.get]: services.getExpense,
    [mthds.post]: services.postExpense,
    [mthds.patch]: services.patchExpense,
    [mthds.delete]: services.deleteExpense,
  },
  [ent.cat]: {
    [mthds.get]: services.getCategory,
    [mthds.post]: services.postCategory,
    [mthds.patch]: services.patchCategory,
    [mthds.delete]: services.deleteCategory,
  },
};

const dtoMap = {
  [ent.usr]: {
    single: userDTO,
    list: userListDTO,
  },
  [ent.exp]: {
    single: expenseDTO,
    list: expenseListDTO,
  },
  [ent.cat]: categoryDto,
};

const statusCodeMap = {
  [mthds.get]: httpStatus.ok,
  [mthds.post]: httpStatus.created,
  [mthds.patch]: httpStatus.ok,
  [mthds.delete]: httpStatus.noContent,
};

module.exports = { serviceMap, dtoMap, statusCodeMap };
