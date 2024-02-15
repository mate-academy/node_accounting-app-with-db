'use strict';

const { User } = require('../models/User.model');
const readAll = async() => {
  const users = await User.findAll();

  return users;
};

const read = async(id) => {
  const user = await User.findByPk(id);

  return user;
};

const create = async({ name }) => {
  const user = await User.create({ name });

  return user;
};

const remove = async(id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const update = async(id, fields) => {
  await User.update({ ...fields }, {
    where: {
      id,
    },
  });
};

module.exports = {
  readAll,
  read,
  create,
  remove,
  update,
};
