const { User } = require('../models/User.model');
const { generateRandomId } = require('../Random');

const getAll = async () => {
  return User.findAll();
};

const getById = async (id) => {
  return User.findByPk(+id);
};

const updateUser = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });
};

const createUser = async (name) => {
  const id = generateRandomId();

  return User.create({ id, name });
};

const deleteUser = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getById,
  updateUser,
  createUser,
  deleteUser,
};
