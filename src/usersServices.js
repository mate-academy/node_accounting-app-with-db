const { User } = require('./models/User.model');

async function getAllUsers() {
  try {
    return await User.findAll();
  } catch (err) {
    throw err;
  }
}

function addUser(userName) {
  try {
    return User.create({
      id: Math.floor(Math.random() * 1000),
      name: userName,
    });
  } catch (err) {
    throw err;
  }
}

async function getUser(userId) {
  try {
    return await User.findByPk(userId);
  } catch (err) {
    throw err;
  }
}

async function deleteUser(userId) {
  try {
    return await User.destroy({ where: { id: userId } });
  } catch (err) {
    throw err;
  }
}

function updateUser(userId, userName) {
  try {
    return User.update({ name: userName }, { where: { id: userId } });
  } catch (err) {
    throw err;
  }
}

function validateNewUser(req, res, next) {
  if (!req.body.name) {
    return res.sendStatus(400);
  }

  next();
}

module.exports = {
  getAllUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
  validateNewUser,
};
