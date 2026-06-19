const { User } = require('./user.model');

const getAll = () => {
  return User.findAll();
};

const getById = (id) => {
  return User.findByPk(+id);
};

const add = ({ name }) => {
  return User.create({
    name,
  });
};

const update = async (id, { name }) => {
  const [updatedCount, updatedRows] = await User.update(
    { name },
    {
      where: {
        id,
      },
      returning: true,
    },
  );

  if (updatedCount === 0) {
    return;
  }

  return updatedRows[0];
};

const deleteById = async (id) => {
  const deletedCount = await User.destroy({
    where: { id },
  });

  if (deletedCount === 0) {
    return null;
  }

  return true;
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteById,
};
