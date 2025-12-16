'use strict';

const { UniqueConstraintError, ValidationError } = require('sequelize');
const { models } = require('../models/models');
const { User } = models;

const parseId = (id) => Number(id);
const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({ message: 'Name is required' });
    }

    const newUser = await User.create({ name });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
    });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(409).json({
        message: 'User with this name already exists',
      });
    }
    // eslint-disable-next-line no-console
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Server error' });
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
    // eslint-disable-next-line no-console
    console.error('Error getting users:', error);

    return res.status(500).json({ message: 'Server error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      id: user.id,
      name: user.name,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const updateUser = async (req, res) => {
  try {
    const id = parseId(req.params.id);
    const { name } = req.body;

    // ВИПРАВЛЕННЯ: Розділяємо перевірки ID та BODY.
    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Перевірка, що name існує і є коректним.
    if (typeof name !== 'string' || name.trim().length === 0) {
      return res.status(400).json({
        message: 'Name must be a non-empty string',
      });
    }

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    await user.save();

    return res.status(200).json({
      id: user.id,
      name: user.name,
    });
  } catch (error) {
    if (error instanceof UniqueConstraintError) {
      return res.status(409).json({
        message: 'User with this name already exists',
      });
    }

    if (error instanceof ValidationError) {
      return res.status(400).json({
        message: 'Validation failed',
        details: error.errors.map((e) => e.message),
      });
    }
    // eslint-disable-next-line no-console
    console.error('Error updating user:', error);

    return res.status(500).json({ message: 'Server error' });
  }
};

const deleteUser = async (req, res) => {
  try {
    const id = parseId(req.params.id);

    if (isNaN(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    const deleted = await User.destroy({
      where: { id },
    });

    if (!deleted) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.sendStatus(204);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Error deleting user:', error);

    return res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};
