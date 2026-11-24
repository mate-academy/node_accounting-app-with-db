const { User } = require('./User.model.js');

const getAll = async () => {
  const users = await User.findAll({
    order: [['id', 'ASC']],
  });

  return users;
};

const getOne = async (id) => {
  const user = await User.findOne({ where: { id } });

  return user;
};

const create = async (user) => {
  const newUser = await User.create(user);

  return newUser;
};

const update = async (id, user) => {
  await User.update(user, { where: { id } });

  const updatedUser = await User.findOne({ where: { id } });

  return updatedUser;
};

const deleteById = async (id) => {
  const deletedUser = await User.destroy({ where: { id } });

  return deletedUser;
};

module.exports = {
  getAll,
  getOne,
  create,
  deleteById,
  update,
};
