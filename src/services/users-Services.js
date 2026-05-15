const { User } = require('../models/User.model');

const getAll = async () => {
  const users = await User.findAll();

  // if (!users) {
  //   return { error: 'Faild' };
  // }

  return users;
};

const create = async (name) => {
  const user = await User.create({
    name,
  });

  return user;
};

const getById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const deleteById = async (id) => {
  await User.destroy({ where: { id } });
};

const update = async ({ id, name }) => {
  const [affectedCount, affectedRows] = await User.update(
    { name },
    { where: { id }, returning: true },
  );

  if (affectedCount === 0) {
    throw new Error('Something went wrong while updating the user');
  }

  const updatedUser = affectedRows[0];

  return updatedUser;
};

const usersService = {
  getAll,
  create,
  getById,
  deleteById,
  update,
};

module.exports = {
  usersService,
};
