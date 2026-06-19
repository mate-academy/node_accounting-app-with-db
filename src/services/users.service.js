const { User } = require('../models/User.model');

const getAll = async () => {
  return User.findAll();
};

const getOne = async (id) => {
  return User.findByPk(id);
};

const create = ({ name }) => {
  return User.create({ name });
};

const update = async (id, { name }) => {
  await User.update(
    {
      name,
    },
    {
      where: { id },
    },
  );

  return User.findByPk(id);
};

const remove = (id) => {
  return User.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
