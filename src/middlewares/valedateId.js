'use strict';

const validateId = (req, res, next) => {
  const id = Number(req.params.id);

  if (!id) {
    res.sendStatus(400);

    return;
  }

  next();
};

module.exports = { validateId };
