'use strict';

const { models } = require('../models/models');
const { User } = models;

const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'зазначте, будь ласка, Name ' });
    }

    const newUser = await User.create({ name });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
    });
  } catch (error) {
    res.status(500).json({ message: 'помилка сервера при створені User' });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'name'],
      order: [['name', 'ASC']],
    });

    return res.status(200).json(users);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Помилка сервера при отриманні користувача.' });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'user з таким id не існує' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: 'Помилка сервера при отриманні користувачів.' });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
};
