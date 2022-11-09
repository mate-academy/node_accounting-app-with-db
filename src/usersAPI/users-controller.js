'use strict';

// Imports:
const { getUsersFromDB } = require('./users-service');
const { v4: uuidv4 } = require('uuid');
const { Users } = require('../models');

// Functions names below describes well what does it do :)
async function getAllUsers(request, response) {
  try {
    const usersFromDB = await Users.findAll({
      order: [
        ['created_at', 'ASC'],
      ],
    });

    response.statusCode = 200;
    response.json(usersFromDB);
  } catch (e) {
    response.sendStatus(500);
  }
}

async function getOneUsers(request, response) {
  const { userID } = request.params;

  try {
    const userFromDB = await Users.findAll({
      where: {
        id: userID,
      },
    });

    if (!userFromDB) {
      response.sendStatus(404);

      return;
    }

    response.statusCode = 200;
    response.json(userFromDB);
  } catch (e) {
    response.sendStatus(500);
  }
}

async function createOneUser(req, res) {
  try {
    const newData = req.body;

    if (!newData.name) {
      res.sendStatus(400);

      return;
    }

    newData.id = uuidv4();

    await Users.create({
      id: newData.id,
      name: newData.name,
    });

    res.statusCode = 201;
    res.json(newData);
  } catch (e) {
    res.sendStatus(500);
  }
}

async function updateUser(req, res) {
  const { userID } = req.params;

  try {
    const userToUpdate = await Users.findOne({
      where: {
        id: userID,
      },
    });
    const newName = req.body.name;

    if (!userToUpdate || !newName) {
      res.sendStatus(400);

      return;
    }

    userToUpdate.name = newName;
    await userToUpdate.save();

    res.statusCode = 200;
    res.json(userToUpdate);
  } catch (e) {
    res.sendStatus(500);
  }
}

async function deleteUser(req, res) {
  const { userID } = req.params;

  try {
    const userToDelete = await Users.findOne({
      where: {
        id: userID,
      },
    });

    if (!userToDelete) {
      res.sendStatus(404);

      return null;
    }

    userToDelete.destroy();

    res.sendStatus(204);
  } catch (e) {
    res.sendStatus(500);
  }
}

module.exports = {
  getAllUsers,
  getOneUsers,
  createOneUser,
  updateUser,
  deleteUser,
  getUsersFromDB,
};
