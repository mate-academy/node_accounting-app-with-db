/* eslint-disable no-return-await */
const { User } = require('../models/User.model');

class UsersService {
  getAll = async () => await User.findAll();
  getById = async (id) => await User.findByPk(id);
  create = async (name) => await User.create({ name });
  update = async (id, name) => {
    await User.update({ name }, { where: { id } });

    return await this.getById(id);
  };
  delete = async (id) => {
    await User.destroy({ where: { id } });
  };
}

const usersService = new UsersService();

module.exports = { usersService };
