'use strict';

const utils = {
  getItemById(items, itemId) {
    return items.find(({ id }) => id === +itemId) || null;
  },

  deleteItemById(items, itemId) {
    return items.filter(({ id }) => id !== +itemId);
  },
};

module.exports = { utils };
