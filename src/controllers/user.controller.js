const userService = require('./../services/user.service');

const get = (req, res) => {
  res.statusCode = 200;
  res.send(userService.getAll());
};

const getOne = (req, res) => {
  const { id } = req.params;
  const user = userService.getById(id);

  if (!user) {
    res.statusCode = 404;

    return res.end();
  }

  res.statusCode = 200;
  res.send(user);
};

const post = (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send({ error: 'Name is required' });
  }

  const user = userService.create(name);

  if (!user) {
    return res.status(400).send({ error: 'User creation failed' });
  }

  res.status(201).send(user);
};

const remove = (req, res) => {
  const { id } = req.params;

  if (!userService.getById(id)) {
    res.statusCode = 404;

    return res.end();
  }

  userService.remove(id);
  res.statusCode = 204;
  res.end();
};

const patch = (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!userService.getById(id)) {
    res.statusCode = 404;

    return res.end();
  }

  const user = userService.change(id, name);

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
