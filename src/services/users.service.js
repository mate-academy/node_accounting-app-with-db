const { User } = require('../models/User.model');

const normalise = ({ id, name }) => {
  return { id, name };
};

const getAll = async () => {
  const result = await User.findAll();

  return result;
};

const getOneById = async (id) => {
  const result = await User.findByPk(id);

  return result;
};

const create = async (name) => {
  const newUser = await User.create({ name });

  return newUser;
};

const update = async (id, name) => {
  if (!getOneById(id)) {
    return;
  }

  await User.update({ name }, { where: { id: id } });

  const updatedUser = await getOneById(id);

  return updatedUser;
};

const remove = async (id) => {
  await User.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  normalise,
  getAll,
  getOneById,
  create,
  update,
  remove,
};
