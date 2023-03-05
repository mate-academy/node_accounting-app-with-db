'use strict';

const { User } = require('../models/User');

const getAll = () => User.findAll();

const getById = id => User.findByPk(id);

const add = name => User.create({ name });

const remove = async(id) => {
  await User.destroy({
    where: { id },
  });
};

const update = async(id, data) => {
  await User.update(data, {
    where: { id },
  });
};

module.exports = {
  add,
  remove,
  getAll,
  getById,
  update,
};
