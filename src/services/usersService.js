'use strict';

const { User } = require('../bd');
const normalize = ({ id, name }) => {
  return {
    id,
    name,
  };
};

const getAll = async() => {
  const result = await User.findAll();

  return result;
};

const getById = async(id) => {
  return User.findByPk(id);
};

const create = (name) => {
  return User.create({ name });
};

const update = async(id, name) => {
  await User.update({ name }, { where: { id } });
};

const remove = async(id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  normalize,
};
