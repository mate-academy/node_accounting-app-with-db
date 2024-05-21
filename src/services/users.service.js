const { User } = require('../models/User.model');

const normalize = ({ id, name }) => {
  return {
    id,
    name,
  };
};

const allUsers = async () => {
  const result = await User.findAll();

  return result;
};

const userById = async (id) => {
  return User.findByPk(id);
};

const createUser = (name) => {
  const id = Math.floor(Math.random() * 10000);

  return User.create({ id, name });
};

const deleteUser = async (id) => {
  await User.destroy({ where: { id } });
};

const updateUser = async (id, name) => {
  await User.update({ name }, { where: { id } });
};

const clearUsers = async () => {
  await User.destroy({ where: {} });
};

module.exports = {
  allUsers,
  userById,
  createUser,
  deleteUser,
  updateUser,
  normalize,
  clearUsers,
};

// const clearUsers = (usrs) => {
//   usrs = [];
// };
// let users = [];

// const result = await client.query(`SELECT * FROM users`);

// const read = async () => {
//   const filePath = path.resolve('data', 'users.json');

//   const data = await fs.readFile(filePath, 'utf-8');

//   return JSON.parse(data);
// };

// const write = async (usrs) => {
//   const filePath = path.resolve('data', 'users.json');

//   await fs.writeFile(filePath, JSON.stringify(usrs), 'utf-8');
// };
