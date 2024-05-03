const { User } = require('../models/User.model');

const {
  getRandomNumberFromUUID,
} = require('../helpers/getRandomNumberFromUUID');

const getAll = async () => {
  return User.findAll({
    order: [['createdAt', 'DESC']],
  });
};

const getById = async (id) => {
  return User.findByPk(id);
};

const create = async (name) => {
  return User.create({
    id: getRandomNumberFromUUID(),
    name,
  });
};

const remove = async (id) => {
  return User.destroy({
    where: { id },
  });
};

const update = async ({ id, name }) => {
  await User.update(
    {
      name,
    },
    { where: { id } },
  );

  return User.findByPk(id);
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
