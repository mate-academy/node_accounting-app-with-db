'use strict';

function uuidToNumber(uuidString) {
  // eslint-disable-next-line no-undef
  const uuidInt = BigInt('0x' + uuidString.replace(/-/g, ''));

  return Number(
    // eslint-disable-next-line no-undef
    uuidInt % BigInt(10 ** 9));
}

module.exports = { uuidToNumber };
