const { User } = require('../User.model');

const normalizeUser = ({ id, name }) => {
  return {
    id: +id,
    name,
  };
};

const getAll = async () => {
  const userAll = await User.findAll({
    order: [['id', 'ASC']],
  });

  return userAll;
};

const getById = async (id) => {
  const userById = await User.findByPk(+id);

  return userById;
};

const create = async (name) => {
  const userCreate = await User.create({ name });

  return userCreate;
};

const upDate = async ({ id, name }) => {
  await User.update({ name }, { where: { id: +id } });

  return { id: +id, name };
};

const deleteById = async (id) => {
  const userDelete = await User.destroy({ where: { id } });

  return userDelete;
};

module.exports = {
  getAll,
  getById,
  create,
  upDate,
  deleteById,
  normalizeUser,
};
