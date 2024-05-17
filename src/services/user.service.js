const { User } = require('../models/User.model');

const getAll = () => User.findAll();

const getById = (id) => User.findByPk(id);

const create = async (data) => {
  const newUser = {
    ...data,
  };

  const user = await User.create(newUser);

  return user;
};

const deleteById = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const updateById = (id, data) => {
  return User.update(
    {
      ...data,
    },
    {
      where: {
        id,
      },
    },
  );
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  updateById,
};
