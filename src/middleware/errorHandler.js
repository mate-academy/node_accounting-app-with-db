const errorHandler = (action) => async (req, res, next) => {
  try {
    await action(req, res, next);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  errorHandler,
};
