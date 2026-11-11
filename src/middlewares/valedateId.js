'use strict';

const validateId = (req, res, next) => {
  const id = Number(req.params.id);

  if (!id) {
    res.status(400).json({ message: 'Invalid id' });

    return;
  }

  next();
};

module.exports = { validateId };
