'use strict';

class Users {
  constructor() {
    this.users = [
      {
        id: 1,
        name: 'John Irwin',
      },
      {
        id: 2,
        name: 'Daniel Short',
      },
      {
        id: 3,
        name: 'Tony Lane',
      },
      {
        id: 4,
        name: 'Pamela Robinson',
      },
    ];
  }

  getLastId() {
    return this.users.length
      ? Math.max(...this.users.map((user) => user.id))
      : 0;
  }

  resetAll() {
    this.users = [];
  }

  getAll() {
    return this.users;
  }

  getById(userId) {
    const foundUser = this.users.find(({ id }) => id === Number(userId));

    return foundUser || null;
  }

  create(name) {
    const newUser = {
      id: this.getLastId() + 1,
      name,
    };

    this.users.push(newUser);

    return newUser;
  }

  remove(userId) {
    this.users = this.users.filter(({ id }) => id !== Number(userId));
  }

  update(user, name) {
    Object.assign(user, { name });
  }
}

module.exports = { users: new Users() };
