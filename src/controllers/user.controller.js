const userService = require('./../services/user.service.js');

const get = async (req, res) => {
  res.statusCode = 200;
  res.send(await userService.getAll());
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getById(id);

  if (!user) {
    res.statusCode = 404;

    res.end();
  }

  res.statusCode = 200;
  res.send(user);
};

const post = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.statusCode = 400;

    res.end();
  }

  const item = await userService.create(name);

  if (!item) {
    res.statusCode = 400;

    res.end();
  }

  res.statusCode = 201;
  res.send(item);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await userService.getById(id))) {
    res.statusCode = 404;

    res.end();
  }

  await userService.remove(id);

  res.statusCode = 204;
  res.end();
};

const patch = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!(await userService.getById(id))) {
    res.statusCode = 404;

    res.end();
  }

  const user = await userService.change(id, name);

  res.statusCode = 200;
  res.send(user);
};

module.exports = {
  get,
  getOne,
  post,
  remove,
  patch,
};
