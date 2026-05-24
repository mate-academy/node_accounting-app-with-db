const { User } = require('../models');

const normalize = ({ id, name }) => ({ id, name });

const create = async (name) => {
  const user = await User.create({ name });

  return user;
};

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

const getOne = (id) => {
  const user = User.findByPk(id);

  return user;
};

const update = async (id, { name }) => {
  // eslint-disable-next-line no-unused-vars
  const [_usersUpdated, [updatedUser]] = await User.update(
    { name },
    { where: { id }, returning: true },
  );

  return updatedUser;
};

const remove = async (id) => {
  const usersRemoved = await User.destroy({ where: { id } });

  return usersRemoved;
};

const usersService = {
  normalize,
  getAll,
  getOne,
  create,
  update,
  remove,
};

exports.usersService = usersService;
