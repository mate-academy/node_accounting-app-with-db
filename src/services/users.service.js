const { User } = require('../models/User.model');

const getAll = () => {
  return User.findAll();
};

const getOne = (id) => {
  return User.findByPk(id);
};

const create = (name) => {
  return User.create({ name });
};

const update = (id, name) => {
  return User.update(
    {
      name,
    },
    {
      where: {
        id,
      },
    },
  );
};

const deleteUser = (id) => {
  User.destroy({
    where: { id },
  });
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteUser,
};
