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
    order: ['title'],
  });

  return users;
};

const getById = async (id) => {
  return User.findByPk(id);
};

const create = async (title) => {
  return User.create({ name: title });
};

const remove = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const change = async (id, title) => {
  return User.update({ title }, { where: { id } });

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
