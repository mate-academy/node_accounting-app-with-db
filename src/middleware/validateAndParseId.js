'use strict';

const validateAndParseId = (req, res, next) => {
  const { id } = req.params;
  const parsedId = parseInt(id, 10);

  if (isNaN(parsedId)) {
    res.sendStatus(400);

    return;
  }

  req.parsedId = parsedId;
  next();
};

module.exports = { validateAndParseId };
