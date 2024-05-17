function middlewareCheckIdAsInteger (req, res, next, id) {
  if (!Number.isInteger(+id)) {
    res.sendStatus(400);

    return;
  }

  next();
};

module.exports = {
  middlewareCheckIdAsInteger,
};
