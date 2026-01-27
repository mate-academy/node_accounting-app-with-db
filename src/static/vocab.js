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

const httpStatus = {
  ok: 200,
  created: 201,
  noContent: 204,
  badRequest: 400,
  notFound: 404,
  serverError: 500,
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

const contentTypes = {
  json: 'application/json; charset=utf-8',
};

module.exports = {
  fields,
  ent,
  mthds,
  httpStatus,
  contentTypes,
};
