'use strict';

const { User } = require('../models/User');

const getAll = () => User.findAll();

const getById = id => User.findByPk(id);

const add = data => User.create(data);

const remove = async(id) => {
  await User.destroy({
    where: { id },
  });
};

const update = async(id, data) => {
  const [, [user]] = await User.update(data, {
    where: { id },
    returning: true,
  });

  return user;
};

module.exports = {
  add,
  remove,
  getAll,
  getById,
  update,
};
