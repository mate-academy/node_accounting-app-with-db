const {
  models: { User },
} = require('../models/models');

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

const getById = async (id) => {
  const userbyId = await User.findByPk(id);

  return userbyId;
};

const create = async (data) => {
  const newUser = await User.create({ name: data });

  return newUser;
};

const update = async (data, id) => {
  const [updated] = await User.update(
    { name: data },
    {
      where: {
        id: id,
      },
    },
  );

  return updated;
};

const remove = async (id) => {
  const deletedCount = await User.destroy({
    where: {
      id: id,
    },
  });

  return deletedCount;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
