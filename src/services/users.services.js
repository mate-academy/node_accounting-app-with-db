/* eslint-disable no-console */
'use strict';
require('dotenv').config();

const { v4: uuidv4 } = require('uuid');
const { User } = require('../models/User.model.js');

const getAllUsers = async() => {
  return User.findAll({
    order: [['id', 'DESC']],
  });
};

const getUserById = async(userId) => {
  return User.findByPk(userId);
};

const createUser = async(name) => {
  const id = uuidv4();

  return User.create({
    name, id,
  });
};

const deletUser = async(id) => {
  const result = await User.destroy({
    where: { id },
  });

  if (result !== 1) {
    throw new Error('Id not found');
  }
};

const editNameOfUser = async(id, name) => {
  const [status, updatedRows] = await User.update(
    { name },
    {
      where: { id },
      returning: true,
    }
  );

  if (status !== 1 || updatedRows === undefined) {
    throw new Error('Id not found');
  }

  return updatedRows[0].dataValues;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deletUser,
  editNameOfUser,
};
