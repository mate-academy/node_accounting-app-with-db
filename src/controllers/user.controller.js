'use strict';

const { models } = require('../models/models');
const { User } = models;

const createUser = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      return res.statusCode(400);
    }

    const newUser = await User.create({ name });

    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
    });
  } catch (error) {
    return error.message;
  }
};

module.exports = {
  createUser,
};
