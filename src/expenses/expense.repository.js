const { Expense } = require('./expense.model');

const getAll = () => {
  return Expense.findAll();
};

const getById = (id) => {
  return Expense.findByPk(+id);
};

const add = ({ userId, spentAt, title, amount, category, note }) => {
  return Expense.create({
    userId: +userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const update = async (id, data) => {
  const [updatedCount, updatedRows] = await Expense.update(
    { ...data },
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
  const deletedCount = await Expense.destroy({
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
