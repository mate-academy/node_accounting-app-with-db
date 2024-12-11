const errorMiddleware = (err, _, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || 'Internal Server Error',
  });
};

module.exports = { errorMiddleware };
