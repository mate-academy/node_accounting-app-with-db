const { User } = require('./models/User.model');

async function isValid(data) {
  const { userId, spentAt, title, amount } = data;

  let response;

  try {
    response = await User.findByPk(+userId);

    if (!response.dataValues) {
      throw Error;
    }
  } catch (error) {
    return false;
  }

  if (!userId || !spentAt || !title || !amount) {
    return false;
  }

  return true;
}

module.exports = {
  isValid,
};
