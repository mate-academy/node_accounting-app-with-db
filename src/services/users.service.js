const { User } = require('../models/User.model');
const { customAlphabet } = require('nanoid');

const generateNumericId = customAlphabet('1234567890', 9);

const getAll = async () => {
  const result = await User.findAll();

  return result;
};

const getById = async (id) => {
  return User.findByPk(id);
};

const create = async (name) => {
  let id;

  do {
    id = Number(generateNumericId());
  } while (await User.findByPk(id));

  const user = await User.create({ id, name });

  return user;
};

const update = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });
};

const remove = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
