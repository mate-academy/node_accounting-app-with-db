/*
  métodos:
  getUsers
  getUserById
  createUser
  updateUser
  deleteUser
  */

const { User } = require('../models/User.model');

const getUsers = async (req, res) => {
  const resultado = await User.findAll();

  res.status(200).json(resultado);
};

const getUserById = async (req, res) => {
  const resultado = await User.findByPk(req.params.id);

  if (!resultado) {
    res.status(404).json({
      error: 'User not found.',
    });
  } else {
    res.status(200).json(resultado);
  }
};

const createUser = async (req, res) => {
  try {
    const resultado = await User.create(req.body);

    res.status(201).json(resultado);
  } catch (error) {
    return res.status(400).json({
      error: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  const resultado = await User.findByPk(req.params.id);

  if (!resultado) {
    res.status(404).json({
      error: 'User not found.',
    });
  } else {
    await resultado.update(req.body);
    res.status(200).json(resultado);
  }
};

const deleteUser = async (req, res) => {
  const resultado = await User.findByPk(req.params.id);

  if (!resultado) {
    res.status(404).json({
      error: 'User not found.',
    });
  } else {
    await resultado.destroy();
    res.status(204).json(resultado);
  }
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
