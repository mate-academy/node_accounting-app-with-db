'use strict';

const { userModel } = require('../models/userModel');

// const normalize = ({ id, name }) => ({ id, name });

const getAll = () => {
  return userModel.findAll();
};

const getById = (id) => {
  const result = userModel.findByPk(id);

  return result;
};

const create = (name) => {
  const result = userModel.create({ name });

  return result;
};

const remove = (id) => {
  userModel.destroy({
    where: {
      id,
    },
  });
};

const update = (id, name) => {
  return userModel.update({ name }, {
    where: { id },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
