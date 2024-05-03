const { v4: uuidv4 } = require('uuid');

function getRandomNumberFromUUID() {
  const uuidBuffer = uuidv4(null, Buffer.allocUnsafe(16));

  const randomNumber = uuidBuffer.readUInt32BE(0);

  return randomNumber;
}

module.exports = {
  getRandomNumberFromUUID,
};
