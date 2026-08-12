const { User } = require('../models/User.model');

const getAll = async () => {
  const result = await User.findAll();

  return result;
};
const getById = (id) => User.findByPk(id);
const create = async (name) => {
  const newUser = await User.create({ name });

  return newUser;
};
const remove = async (id) => {
  await User.destroy({
    where: { id },
  });
};
const update = async ({ id, name }) => {
  await User.update(
    { name },
    {
      where: { id },
    },
  );
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
