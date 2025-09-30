// const { where } = require('sequelize');
const { User } = require('../models/User.model');

function createUsersService() {
  function normalize({ id, name }) {
    return {
      id,
      name,
    };
  }

  async function getAll() {
    const result = await User.findAll();

    return result.map((user) => user.toJSON());
  }

  async function getById(id) {
    const user = await User.findByPk(id);

    if (!user) {
      return null;
    }

    return user.toJSON();
  }

  async function create(name) {
    const user = await User.create({ name });

    return user.toJSON();
  }

  async function update({ id, name }) {
    await User.update({ name }, { where: { id } });

    /// /////////////////////////////////////
    return User.findByPk(id);
    /// /////////////////////////////////////
  }

  async function remove(id) {
    await User.destroy({ where: { id } });
  }

  return {
    getAll,
    getById,
    create,
    update,
    remove,
    normalize,
  };
}

module.exports = { createUsersService };
// function createUsersService() {
//   let users = [];
//   let nextUserId = 0;

//   function getAll() {
//     return users;
//   }

//   function getById(id) {
//     return users.find((user) => user.id === +id) || null;
//   }

//   function create(name) {
//     const user = {
//       id: nextUserId,
//       name,
//     };

//     users.push(user);

//     nextUserId += 1;

//     return user;
//   }

//   function update({ id, name }) {
//     const user = getById(id);

//     Object.assign(user, { id: +id, name });

//     return user;
//   }

//   function remove(id) {
//     const user = getById(id);

//     if (!user) {
//       return null;
//     }

//     users = users.filter((u) => u.id !== +id);

//     return user;
//   }

//   return {
//     getAll,
//     getById,
//     create,
//     update,
//     remove,
//   };
// }

// module.exports = { createUsersService };
