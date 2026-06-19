'use strict';

const { User } = require('../models/User.model');

// let users = [
//   { id: 1, name: "John Doe" },
//   { id: 2, name: "Alan Walker" }
// ];

const getAll = () => {
  return User.findAll();
};

const getByID = (id) => {
  return User.findByPk(id);
};

const create = (name) => {
  return User.create({ name });
};

const update = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });

  return getByID(id);
};

const remove = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getByID,
  create,
  update,
  remove,
};
