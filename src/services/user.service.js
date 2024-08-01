const { User } = require('../models/User.model');

const getAll = async () => {
  const result = await User.findAll({
    order: [['name', 'ASC']],
  });

  return result;
};

const create = (name) => {
  return User.create({ name });
};

const getById = (id) => {
  return User.findByPk(id);
};

const remove = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const update = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
