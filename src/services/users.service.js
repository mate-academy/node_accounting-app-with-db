'use strict';

const { User } = require('../datebase/users.database');

const getAll = async() => {
  const users = await User.findAll({
    order: [
      'id',
    ],
  });

  return users;
};

const findById = (userId) => {
  return User.findByPk(userId);
};

function normalize({ id, name }) {
  return {
    id,
    name,
  };
}

const create = (name) => {
  return User.create({ name });
};

const remove = (userId) => {
  User.destroy({
    where: { id: userId },
  });
};

const update = ({ id, name }) => {
  return User.update({ name }, {
    where: { id },
  });
};

const reset = () => {
};

module.exports.userService = {
  getAll,
  findById,
  create,
  remove,
  update,
  reset,
  normalize,
};
