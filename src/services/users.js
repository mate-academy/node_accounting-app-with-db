'use strict';

class Users {
  constructor() {
    this.users = [];
  }

  reset() {
    this.users = [];
  }

  getAll() {
    return this.users;
  }

  getById(id) {
    return this.users.find(user => user.id === +id);
  }

  create(user) {
    const newUser = {
      id: this.users.length + 1,
      ...user,
    };

    this.users.push(newUser);

    return newUser;
  }

  removeById(id) {
    const user = this.getById(id);

    if (!user) {
      return null;
    }

    this.users = this.users.filter(u => u.id !== +id);

    return user;
  }

  updateByName(user, partsToUpdate) {
    Object.assign(user, partsToUpdate);
  }
}

const usersService = new Users();

module.exports = { usersService };
