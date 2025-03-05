const { User } = require('../models/User.model');

const getAll = () => User.findAll();

const getById = (id) => User.findByPk(id);

const create = (name) => {
  return User.create({ name });
};

const remove = async (id) => {
  const deletedCount = await User.destroy({
    where: { id },
  });

  return deletedCount > 0;
};

const update = async (id, name) => {
  const [updatedCount, updatedUsers] = await User.update(
    { name },
    { where: { id }, returning: true },
  );

  if (updatedCount === 0) {
    return null;
  }

  return updatedUsers[0];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
