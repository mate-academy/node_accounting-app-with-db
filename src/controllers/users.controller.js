const users = require('../entitys/users.reposytory');

// const isUUID = (d) => {
//   // eslint-disable-next-line max-len, prettier/prettier
//   const pattern =
//     /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/;

//   return pattern.test(d);
// };

const getAll = async (req, res) => {
  res.send(await users.getAll());
};

const create = async (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(await users.create({ name }));
};

const getById = async (req, res) => {
  const { id } = req.params;

  const intId = Number(id);

  if (Number.isNaN(intId)) {
    res.sendStatus(400);

    return;
  }

  const user = await users.getById(intId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const removeById = async (req, res) => {
  const { id } = req.params;

  const intId = Number(id);

  if (Number.isNaN(intId)) {
    res.sendStatus(400);

    return;
  }

  const result = await users.remove(intId);

  if (result <= 0) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  const intId = Number(id);

  if (typeof name !== 'string' || Number.isNaN(intId)) {
    res.sendStatus(400);

    return;
  }

  const [, updatedUsers] = await users.update(intId, { name });

  if (!updatedUsers[0]) {
    res.sendStatus(404);

    return;
  }

  res.send(updatedUsers[0]);
};

module.exports = {
  getAll,
  create,
  getById,
  removeById,
  update,
};
