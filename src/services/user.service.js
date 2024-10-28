const { User } = require('./../models/User.model');

const normalize = ({ id, name }) => {
  return { id, name };
};
const getAll = () => {
  return User.findAll();
};

const getById = (id) => {
  return User.findByPk(id);
};

const create = (name) => {
  return User.create({ name });
};

const remove = async (id) => {
  await User.destroy({ where: { id } });
};

const update = ({ id, name }) => {
  return User.update({ name }, { where: { id } });
};

module.exports = {
  normalize,
  getAll,
  getById,
  create,
  remove,
  update,
};
