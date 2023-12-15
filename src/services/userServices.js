'use strict';

const { User } = require('../models/userModel');

const getAll = () => {
  return User.findAll({
    attributes: ['id', 'name'],
  });
};

const getOne = (id) => {
  return User.findByPk(id);
};

const createUser = (name) => {
  return User.create({ name });
};

const deleteOne = (id) => {
  return User.destroy({
    where: {
      id,
    },
  });
};

const updateOne = async ({ name, id }) => {
  return User.update(
    { name },
    {
      where: {
        id,
      },
      returning: true,
    }
  );
};

module.exports = {
  getAll,
  createUser,
  getOne,
  deleteOne,
  updateOne,
};
