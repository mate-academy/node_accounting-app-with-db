const { Todo } = require('./Todo.model.js');

const getAll = async () => {
  const todos = await Todo.findAll({
    order: [['createdAt', 'DESC']],
  });

  return todos;
};

const getOne = async (id) => {
  const todo = await Todo.findOne({ where: { id } });

  return todo;
};

const create = async (todo) => {
  const newTodo = await Todo.create(todo);

  return newTodo;
};

const update = async (id, todo) => {
  const updatedTodo = await Todo.update(todo, { where: { id } });

  return updatedTodo;
};

const deleteById = async (id) => {
  const deletedTodo = await Todo.destroy({ where: { id } });

  return deletedTodo;
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteById,
};
