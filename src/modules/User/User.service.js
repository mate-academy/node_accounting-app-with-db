'use strict';

class UserService {
  constructor(User) {
    this.User = User;
  }

  normalize({ id, name }) {
    return {
      id, name,
    };
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

  async update(userToUpdate) {
    const { id } = userToUpdate;
    const user = await this.User.findByPk(id);

    if (!user) {
      throw new Error(404);
    }

    await user.update(userToUpdate);

    return user;
  }
}

module.exports = UserService;
