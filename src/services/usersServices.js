const { User } = require('../models/User.model');

function getAllUsers() {
  try {
    return User.findAll();
  } catch (err) {
    throw err;
  }
}

function addUser(userName) {
  try {
    return User.create({
      name: userName,
    });
  } catch (err) {
    throw err;
  }
}

function getUser(userId) {
  try {
    return User.findByPk(userId);
  } catch (err) {
    throw err;
  }
}

function deleteUser(userId) {
  try {
    return User.destroy({ where: { id: userId } });
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
