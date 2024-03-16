'use strict';

class UserService {
  constructor(User) {
    this.User = User;
  }

  normalize({ id, name }) {
    return { id, name };
  }

  async getAll() {
    const users = await this.User.findAll();

    return users;
  }

  async getOne(id) {
    const user = this.User.findByPk(id);

    return user;
  }

  async add({ name }) {
    const { dataValues: newUser } = await this.User.create({ name });

    return newUser;
  }

  async remove(id) {
    const deletedCount = await this.User.destroy({ where: { id } });

    return deletedCount;
  }

  async update(user) {
    const { id, name } = user;
    const [, updatedUsers] = await this.User.update(
      { name },
      { where: { id }, returning: true },
    );

    if (updatedUsers.length === 0) {
      throw new Error(404);
    }

    return updatedUsers[0];
  }
}

module.exports = UserService;
