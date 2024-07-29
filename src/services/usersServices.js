/* eslint-disable no-console */
/* eslint-disable no-shadow */
const { User } = require('../models/User.model.js');

const normalize = ({ id, ...rest }) => {
  return {
    id,
    ...rest,
  };
};

const getAll = async () => {
  const users = await User.findAll().then((result) => {
    return result.map((user) => user.dataValues);
  });

  return users;
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const createUser = async (name) => {
  return User.create({ name });
};

const deleteUserById = async (id) => {
  return User.destroy({ where: { id } });
};

const updateUserById = async ({
  id,
  name,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  await User.update(
    {
      id,
      name,
      spentAt,
      title,
      amount,
      category,
      note,
    },
    { where: { id } },
  );

  return User.findByPk(id);
};

module.exports = {
  normalize,
  getAll,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
};
