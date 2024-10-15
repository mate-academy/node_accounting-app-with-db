const { User } = require('../models/User.model');

const getAllUsers = async () => {
  const result = await User.findAll();

  return result;
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

// Функція для отримання наступного порядкового номера для users
// const getNextUserId = async () => {
//   const users = await getAllUsers(); // Wait for the users to be fetched

//   if (users.length === 0) {
//     return 1; // Start with 1 if there are no users
//   }

//   // eslint-disable-next-line max-len
//   return Math.max(...users.map((user) => user.id)) + 1;
// Get the max ID and add 1
// };

const createUser = async ({ name }) => {
  return User.create({ name });
};

const updateUser = async ({ id, name }) => {
  const [affectedRows] = await User.update({ name }, { where: { id } });

  if (affectedRows === 0) {
    return null;
  }

  return User.findByPk(id);
};

const destroyUser = async ({ id }) => {
  return User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  destroyUser,
};
