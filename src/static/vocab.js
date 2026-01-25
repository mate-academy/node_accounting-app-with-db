const ent = {
  usr: 'users',
  exp: 'expenses',
};

const mthds = {
  get: 'GET',
  post: 'POST',
  patch: 'PATCH',
  delete: 'DELETE',
};

const fields = {
  [ent.usr]: {
    id: 'id',
    name: 'name',
  },
  [ent.exp]: {
    userId: 'userId',
    spentAt: 'spentAt',
    title: 'title',
    amount: 'amount',
    category: 'category',
    note: 'note',
  },
};

module.exports = {
  fields,
  ent,
  mthds,
};
