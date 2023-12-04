'use strict';

const { User } = require('../db').models;

const get = async() => {
  return User.findAll();
};

const getBySlug = async({ slug }) => {
  return User.findOne({
    where: { slug },
  });
};

const create = async({ name }) => {
  return User.create({
    name,
  });
};

const update = async({ slug, name }) => {
  const user = await getBySlug({ slug });

  if (user) {
    await user.update({ name });

    return user;
  }

  return null;
};

const remove = async({ slug }) => {
  const user = await getBySlug({ slug });

  if (user) {
    await user.destroy();

    return user;
  }

  return null;
};

module.exports = {
  get,
  getBySlug,
  create,
  update,
  remove,
};
