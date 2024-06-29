const { v4: uuidv4 } = require('uuid');

const generateUniqNumberId = () => {
  const uuid = uuidv4()
    .replace(/[^0-9]/g, '')
    .slice(0, 5);

  return Number(uuid);
};

module.exports = {
  generateUniqNumberId,
};
