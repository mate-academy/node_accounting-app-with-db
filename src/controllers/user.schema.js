const getOne = {
  id: {
    isInt: {
      errorMessage: 'Id must be an integer',
    },
  },
};

const create = {
  name: {
    isString: {
      errorMessage: 'Name must be a string',
    },
  },
};

const update = {
  ...getOne,
  ...create,
};

const remove = {
  ...getOne,
};

module.exports = {
  getOne,
  create,
  update,
  remove,
};
