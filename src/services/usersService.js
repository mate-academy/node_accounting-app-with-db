const { User } = require('../models/User.model');

const normalize = ({ id, name }) => {
  return {
    id,
    name,
  };
};

// async function getAll() {
//   const sql = `
//     SELECT * FROM users
//   `;

//   const users = await client.query(sql, []);

//   return users.rows;
// }

async function getAll() {
  const result = await User.findAll({
    order: ['name'],
  });

  return result;
}

function create(name) {
  return User.create({ name });
}

async function getUserById(userId) {
  return User.findByPk(userId);
}

async function deleteUserById(userId) {
  await User.destroy({
    where: {
      id: userId,
    },
  });
}

async function patchItem(userId, name) {
  await User.update({ name }, { where: { id: userId } });

  return User.findByPk(userId);
}

const usersService = {
  normalize,
  getAll,
  getUserById,
  create,
  patchItem,
  deleteUserById,
};

module.exports = { usersService };
