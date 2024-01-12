'use strict';

const { User } = require('../db');

const getAll = async() => {
  const users = await User.findAll();

  return users;
};

const getByID = async id => {
  try {
    const user = await User.findByPk(id);

    return user;
  } catch (err) {
    return null;
  }
};

const create = async name => {
  const user = await User.create({
    name,
  });

  return user;
};

const remove = async id => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const update = async(id, name) => {
  await User.update(
    { name },
    {
      where: {
        id,
      },
    },
  );

  const user = await getByID(id);

  return user;
};

module.exports = {
  getAll,
  getByID,
  create,
  remove,
  update,
};
