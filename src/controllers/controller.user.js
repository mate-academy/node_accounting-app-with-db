'use strict';

const { User } = require('../models/User.model');
const { normalizeData } = require('../service/normalize');

async function getAll(req, res) {
  try {
    const users = await User.findAll({
      order: [['name', 'DESC']],
    });

    const preparedUsers = users.map(({ dataValues }) => {
      return normalizeData(dataValues);
    });

    res.json(preparedUsers);
  } catch (err) {
    res.sendStatus(500);
  }
}

async function postById(req, res) {
  const { name } = req.body;

  if (!name || name.trim() === '') {
    res.sendStatus(400);

    return;
  }

  try {
    const { dataValues } = await User.create({
      name,
    });

    res.status(201).json(normalizeData(dataValues));
  } catch (err) {
    res.sendStatus(500);
  }
}

async function getById(req, res) {
  const id = req.params.id;

  try {
    const user = await User.findByPk(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.json(normalizeData(user.dataValues));
  } catch (err) {
    res.sendStatus(500);
  }
}

async function patchById(req, res) {
  const id = req.params.id;
  const { name } = req.body;

  if (!name || name.trim() === '') {
    res.sendStatus(400);

    return;
  }

  try {
    const result = await User.update({ name }, { where: { id } });

    if (!result[0]) {
      res.sendStatus(404);

      return;
    }

    const user = await User.findByPk(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.status(200).json(normalizeData(user.dataValues));
  } catch (err) {
    res.sendStatus(500);
  }
}

async function deleteById(req, res) {
  const id = req.params.id;

  try {
    const result = await User.destroy({
      where: { id },
    });

    if (!result) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(204);
  } catch (err) {
    res.sendStatus(500);
  }
}

module.exports = {
  userController: {
    getAll,
    postById,
    getById,
    patchById,
    deleteById,
  },
};
