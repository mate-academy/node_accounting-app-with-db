const {
  models: { User },
} = require('../models/models');

const randomId = () => {
  return Date.now() + Math.floor(Math.random() * 1000);
};

const getAll = async () => {
  return User.findAll();
};

const create = async (name) => {
  const newUser = await User.create({ name });

  return newUser;
};

const getById = async (id) => {
  const targetUser = await User.findOne({
    where: {
      id,
    },
  });

  return targetUser;
};

const remove = async (id) => {
  return User.destroy({
    where: {
      id,
    },
  });
};

const update = async (name, id) => {
  await User.update(
    { name },
    {
      where: {
        id,
      },
    },
  );

  return User.findByPk(id);
};

// const resetUsers = () => {
//   users.splice(0, users.length);
// };

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
  // users,
  randomId,
  // resetUsers,
};
