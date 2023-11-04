'use strict';

const generateUniqueID = () => {
  const timestamp = new Date().getTime();
  const randomId = Math.floor(Math.random() * 1000) + 1;
  const uniqueID = `${timestamp}${randomId}`;

  return parseInt(uniqueID);
};

const checkId = (res, id) => {
  if (!/^\d+$/.test(id)) {
    res.sendStatus(400);

    // eslint-disable-next-line no-useless-return
    return;
  }
};

module.exports = {
  generateUniqueID,
  checkId,
};
