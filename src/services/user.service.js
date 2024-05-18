const { User } = require('../models/User.model');

// let users = [];

// function getRandomNumber() {
//   const min = 0;
//   const max = 100;

//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// const start = () => {
//   users = [];
// };

const getAll = async () => {
  const users = await User.findAll({
    order: ['name'],
  });

  return users;
};

const getById = async (id) => {
  return User.findByPk(id);
};

const create = async (title) => {
  const user = await User.create({ name: title });

  return user;
};

const remove = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const change = async (id, title) => {
  return User.update({ name: title }, { where: { id } });

  // const user = await User.findByPk(id);

  // return user;
};

module.exports = {
  // start,
  getAll,
  getById,
  create,
  remove,
  change,
};
