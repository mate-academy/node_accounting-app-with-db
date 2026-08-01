const { User } = require('../models/User.model');
const { Expense } = require('../models/Expense.model');
const { sequelize } = require('../db.js');

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const create = async (name) => {
  const newUser = await User.create({ name });

  return newUser;
};

const remove = async (id) => {
  await sequelize.transaction(async (t) => {
    await Expense.destroy({ where: { userId: id }, transaction: t });
    await User.destroy({ where: { id }, transaction: t });
  });
};

const update = async (id, name) => {
  await User.update({ name }, { where: { id } });

  return getById(id);
};

const normalize = ({ name, id }) => ({ name, id });

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  normalize,
};
