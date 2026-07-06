const { User } = require('../models/User.model');

const getAll = async () => {
  return User.findAll();
};

// id: Math.max(...users.map((u) => u.id), 0) + 1,
const create = async (name) => {
  return User.create({ name });
};

const getById = async (id) => {
  return User.findByPk(id);
};

const remove = async (id) => {
  return User.destroy({
    where: {
      id: id,
    },
  });
};

const update = async (id, name) => {
  const [updatedRows] = await User.update(
    { name },
    {
      where: { id },
    },
  );

  if (!updatedRows) {
    return null;
  }

  return User.findByPk(id);
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  remove,
};
