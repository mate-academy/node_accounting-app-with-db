'use strict';

const { getNewId } = require('../utils/getNewId.js');

const { User } = require('../models/User.js');

const getAll = () => User.findAll();

const getById = (id) => User.findByPk(id);

const create = async(name) => {
  const id = getNewId(await User.findAll());

  const newUser = await User.create({
    id, name,
  });

  return newUser;
};

const remove = async(id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const patch = async(id, name) => {
  await User.update({ name }, {
    where: {
      id,
    },
  });

  return getById(id);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  patch,
};
