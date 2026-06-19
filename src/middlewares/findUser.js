const userService = require('../services/user.service');

const findUser = async (req, res, next) => {
  const userId = Number(req.params.id);
  const user = await userService.getUserById(userId);

  if (!user) {
    return res.status(404).json({ error: 'User not Found' });
  }
  req.user = user;
  next();
};

module.exports = { findUser };
