const getAll = {
  userId: {
    optional: true,
    isInt: {
      errorMessage: 'User ID must be an integer',
    },
  },
  categories: {
    optional: true,
    isString: {
      errorMessage: 'Categories must be a string',
    },
  },
  from: {
    optional: true,
    isISO8601: {
      errorMessage: 'From must be a date fromat ISO8601',
    },
  },
  to: {
    optional: true,
    isISO8601: {
      errorMessage: 'To must be a date fromat ISO8601',
    },
  },
};

const getOne = {
  id: {
    isInt: {
      errorMessage: 'Expense ID must be an integer',
    },
  },
};

const create = {
  userId: {
    isInt: {
      errorMessage: 'User ID must be an integer',
    },
  },
  spentAt: {
    isISO8601: {
      errorMessage: 'Spent At must be a date format ISO8601',
    },
  },
  amount: {
    isInt: {
      errorMessage: 'Amount must be a integer',
    },
  },
  title: {
    isString: {
      errorMessage: 'Title must be a string',
    },
  },
  category: {
    isString: {
      errorMessage: 'Category must be a string',
    },
    optional: true,
  },
  note: {
    isString: {
      errorMessage: 'Note must be a string',
    },
    optional: true,
  },
};

const update = {
  ...getOne,
  spentAt: {
    optional: true,
    isISO8601: {
      errorMessage: 'Spent At must be a date format ISO8601',
    },
  },
  amount: {
    optional: true,
    isInt: {
      errorMessage: 'Amount must be a integer',
    },
  },
  title: {
    optional: true,
    isString: {
      errorMessage: 'Title must be a string',
    },
  },
  category: {
    optional: true,
    isString: {
      errorMessage: 'Category must be a string',
    },
  },
  note: {
    optional: true,
    isString: {
      errorMessage: 'Note must be a string',
    },
  },
};

const remove = {
  ...getOne,
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
