const { User } = require('../models/User.model');

class UserService {
  getAll = () => User.findAll();
  getById = (id) => User.findByPk(id);
  create = (userData) => User.create(userData);

  update = async (id, { name }) => {
    await User.update({ name }, { where: { id } });

    return this.getById(id);
  };

  remove = (id) => User.destroy({ where: { id } });
}

module.exports = new UserService();
