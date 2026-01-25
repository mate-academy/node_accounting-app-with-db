const { User, Expense } = require('../models/models');
const { ent, fields } = require('../static/vocab');
const { get } = require('./general.service');

// const allowedList = [fields[ent.usr].name];

const postUser = async (body) => {
  return User.create({ ...body });
};

const deleteUser = async (id) => {
  const user = await get(ent.usr, id);

  if (user === null) {
    return false;
  }

  await user.destroy();

  const usrExp = Expense.findAll({
    where: {
      [fields[ent.exp].userId]: id,
    },
  });

  await Promise.all(usrExp.forEach((el) => el.destroy()));

  return true;
};

module.exports = { postUser, deleteUser };
