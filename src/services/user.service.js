const { Op } = require('sequelize');
const { User } = require('../models/User.model');

const normilize = ({ id, name }) => {
  return { id, name };
};

const getAll = () => {
  return User.findAll();
};

const create = (name) => {
  return User.create({ name });
};

const getById = (id) => {
  return User.findByPk(id);
};

const remove = (id) => {
  return User.destroy({
    where: {
      id: {
        [Op.eq]: id,
      },
    },
  });
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

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
  normilize,
};
