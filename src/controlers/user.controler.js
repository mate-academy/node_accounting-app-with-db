const userServices = require('../services/user.services');

const getAll = async (req, res) => {
  const users = await userServices.getAll();

  res.status(200).send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const normalaizedId = Number(id);

  if (isNaN(normalaizedId)) {
    return res.status(400).send('Bad request');
  }

  const user = await userServices.getOne(normalaizedId);

  if (!user) {
    return res.status(404).send('Not found');
  }

  res.status(200).send(user);
};

const add = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Bad request');
  }

  const normalaizedName = name.trim();

  const newUser = await userServices.add(normalaizedName);

  res.status(201).send(newUser);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const normalaizedId = Number(id);

  if (isNaN(normalaizedId)) {
    return res.status(400).send('Bad request');
  }

  const userForRemove = await userServices.getOne(normalaizedId);

  if (!userForRemove) {
    return res.status(404).send('Not found');
  }

  await userServices.remove(normalaizedId);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const normalaizedId = Number(id);

  if (isNaN(normalaizedId) || !name) {
    return res.status(400).send('Bad request');
  }

  const normalaizedName = name.trim();

  const userForUpdate = await userServices.getOne(normalaizedId);

  if (!userForUpdate) {
    return res.status(404).send('Not Found');
  }

  await userServices.update({ id: normalaizedId, name: normalaizedName });

  const updatedUser = await userServices.getOne(normalaizedId);

  res.status(200).send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  update,
  remove,
  add,
};
