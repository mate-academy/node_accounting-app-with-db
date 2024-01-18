'use strict';

const { User } = require('../repository/db');

const findAll = async() => {
  return User.findAll();
};

const getById = async(id) => {
  return User.findByPk(+id);
};

const create = async(name) => {
  try {
    const lastUser = await User.findOne({
      attributes: ['id'],
      order: [['id', 'DESC']],
    });

    const getMaxId = lastUser ? lastUser.id : 0;

    const newUser = {
      id: getMaxId + 1,
      name,
    };

    return User.create(newUser);
  } catch (error) {
    throw error;
  }
};

const remove = (id) => {
  return User.destroy({
    where: {
      id: +id,
    },
  });
};

const update = async(name, id) => {
  return User.update({ name }, {
    where: {
      id,
    },
  });
};

const setAll = async(newUsers) => {
  await Promise.all(newUsers.map(async(newUser) => {
    const existingUser = await User.findOne({ where: { id: newUser.id } });

    if (existingUser) {
      await existingUser.update(newUser);
    } else {
      await User.create(newUser);
    }
  }));

  const allUsers = await User.findAll();

  return allUsers;
};

const clearUsers = async() => {
  await User.destroy({
    where: {},
    truncate: true,
  });
};

module.exports = {
  findAll,
  getById,
  create,
  remove,
  update,
  setAll,
  clearUsers,
};
