const { getUsersArray } = require('./user.service');

let expences = [];

const getAllExpences = () => expences;

const getId = () => Math.floor(Math.random() * 37);

const getExpences = ({ userId, categories, from, to }) => {
  return expences.filter((expence) => {
    if (userId && expence.userId !== userId) {
      return false;
    }

    if (categories && expence.category !== categories) {
      return false;
    }

    const expenceDate = new Date(expence.spentAt);

    if (from) {
      const fromDate = new Date(from);

      if (expenceDate < fromDate) {
        return false;
      }
    }

    if (to) {
      const toDate = new Date(to);

      if (expenceDate > toDate) {
        return false;
      }
    }

    return true;
  });
};

const getExpenceById = (id) => expences.find((expence) => expence.id === id);

const createExpence = (data) => {
  const newExpence = {
    id: getId(),
    ...data,
  };

  const userExists = getUsersArray().some(
    (user) => user.id === newExpence.userId,
  );

  if (!userExists) {
    return null;
  }

  expences = [...expences, newExpence];

  return newExpence;
};

const deleteExpence = (id) => {
  const numberedId = Number(id);
  const expence = getExpenceById(numberedId);

  if (!expence) {
    return null;
  }

  expences = expences.filter((item) => item.id !== numberedId);

  return expence;
};

const patchExpence = (id, data) => {
  const expence = getExpenceById(id);

  if (!expence) {
    return null;
  }

  const newExpence = {
    ...expence,
    ...data,
  };

  expences = expences.map(
    (item) => (item.id === id ? { ...item, ...newExpence } : item),
    // eslint-disable-next-line function-paren-newline
  );

  return newExpence;
};

const deleteExpences = () => {
  expences = [];
};

module.exports = {
  getExpences,
  getExpenceById,
  createExpence,
  deleteExpences,
  getAllExpences,
  deleteExpence,
  patchExpence,
};
