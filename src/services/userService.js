const { User } = require('../models/User.model');

module.exports = {
  getAll() {
    return User.findAll();
  },
  getById(id) {
    return User.findByPk(id);
  },
  create({ name }) {
    return User.create({ name });
  },
  update({ currentId, id, name }) {
    return User.update(
      { id, name },
      {
        where: {
          id: currentId,
        },
      },
    );
  },
  async remove(id) {
    await User.destroy({ where: { id } });
  },
};
