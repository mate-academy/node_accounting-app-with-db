const { User } = require('../models/User.model');

const getAll = async () => {
  const result = await User.findAll();

  return result;
};

const getUser = async (id) => {
  const result = await User.findByPk(+id);

  return result;
};

const addNew = async (name) => {
  const result = await User.create({ name });

  return result;
};

const updateUser = async (id, name) => {
  const [affectedRows, [updatedUser]] = await User.update(
    { name },
    {
      where: { id },
      returning: true,
    },
  );

  return affectedRows > 0 ? updatedUser : null;
};

const deleteUser = async (id) => {
  const result = await User.destroy({
    where: {
      id: +id,
    },
  });

  return result;
};

module.exports = {
  getAll,
  getUser,
  addNew,
  updateUser,
  deleteUser,
};
