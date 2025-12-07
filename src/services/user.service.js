const { models, normalizeUsers } = require('../models/models');
const { User } = models;

const getAll = async () => {
  const users = await User.findAll();

  return normalizeUsers(users);
};

const getOne = async (id) => {
  const user = await User.findOne({ where: { id: Number(id) } });

  if (!user) {
    return null;
  }

  return normalizeUsers([user]);
};

const create = async (name) => {
  const newUser = await User.create({ name });

  return normalizeUsers([newUser]);
};

const update = async (id, newName) => {
  const [count] = await User.update(
    { name: newName },
    { where: { id: Number(id) } },
  );

  if (count === 0) {
    return null;
  }

  const updatedUser = await getOne(id);

  return updatedUser;
};

const remove = async (id) => {
  const deletedCount = await User.destroy({ where: { id: Number(id) } });

  return deletedCount > 0;
};

module.exports = {
  getOne,
  getAll,
  create,
  update,
  remove,
};
