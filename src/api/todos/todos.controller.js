const todosService = require('./todos.service.js');

const getAll = async (req, res) => {
  try {
    const todos = await todosService.getAll();

    res.json(todos);
  } catch (err) {
    res.sendStatus(500);
  }
};

const getOne = async (req, res) => {
  try {
    const todo = await todosService.getOne(req.params.id);

    if (!todo) {
      return res.sendStatus(404);
    }

    res.json(todo);
  } catch (err) {
    res.sendStatus(500);
  }
};

const create = async (req, res) => {
  try {
    const todo = await todosService.create(req.body);

    res.json(todo);
  } catch (err) {
    res.sendStatus(500);
  }
};

const update = async (req, res) => {
  try {
    const todo = await todosService.update(req.params.id, req.body);

    if (!todo) {
      return res.sendStatus(404);
    }

    res.json(todo);
  } catch (err) {
    res.sendStatus(500);
  }
};

const deleteById = async (req, res) => {
  try {
    const todo = await todosService.deleteById(req.params.id);

    if (!todo) {
      return res.sendStatus(404);
    }

    res.json(todo);
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteById,
};
