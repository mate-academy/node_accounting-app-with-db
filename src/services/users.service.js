/* eslint-disable curly */
const { User } = require('../models/User.model');

const normalize = ({ id, name }) => ({ id, name });

const getAll = () => User.findAll({ order: [['createdAt', 'DESC']] });

const getById = (id) => User.findByPk(id);

const create = (name) => User.create({ name });

const deleteById = async (id) => {
  await User.destroy({ where: { id } });
};

const update = ({ id, name }) => User.update({ name }, { where: { id } });

module.exports = {
  usersService: {
    normalize,
    getAll,
    getById,
    create,
    deleteById,
    update,
  },
};
