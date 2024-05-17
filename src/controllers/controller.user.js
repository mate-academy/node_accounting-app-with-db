'use strict';

const { User } = require('../models/User.model');
const { normalizeData } = require('../service/normalize');

async function getAll(req, res) {
  try {
    const users = await User.findAll({
      order: [['firstName', 'DESC']],
    });

    const preparedUsers = users.map(({ dataValues }) => {
      return normalizeData(dataValues);
    });

    res.send(JSON.stringify(preparedUsers));
  } catch (err) {
    res.sendStatus(500);
  }
}

async function postById(req, res) {
  const { firstName } = req.body;

  if (!firstName || firstName.trim() === '') {
    res.send(400);

    return;
  }

  try {
    const { dataValues } = await User.create({
      firstName,
    });

    res.send(JSON.stringify(normalizeData(dataValues)));
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

    res.send(JSON.stringify(normalizeData(user.dataValues)));
  } catch (err) {
    res.sendStatus(500);
  }
}

async function patchById(req, res) {
  const id = req.params.id;
  const { firstName } = req.body;

  if (!firstName || firstName.trim() === '') {
    res.sendStatus(400);

    return;
  }

  try {
    const result = await User.update({ firstName }, { where: { id } });

    if (!result[0]) {
      res.sendStatus(404);

      return;
    }

    res.sendStatus(200);
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

    res.sendStatus(200);
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
