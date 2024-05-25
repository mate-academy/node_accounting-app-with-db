const response = {
  200: {
    statusCode: 200,
  },
  201: {
    statusCode: 201,
  },
  204: {
    statusCode: 204,
  },
  400: {
    statusCode: 400,
    messages: {
      noName: `Please make sure you pass correct data. The name should be a strings`,
      noID: `Please make sure you pass correct search params.`,
      noUser: `There are no such user. Please check id number`,
      noData: `Please make sure you pass correct data.`,
      noDataExpense: `Please make sure you pass all and correct data: userId, spentAt, title, amount, category.`,
    },
  },
  404: {
    statusCode: 404,
    messages: {
      notFound: 'Page not found.',
      noUser: 'No user was found.',
      noExpense: 'No expense was found.',
    },
  },
  503: {
    statusCode: 503,
    messages: {
      serviceOrUsers: 'Service unavailable or there are no users.',
      serviceOrExpenses: 'Service unavailable or there are no expenses.',
      service: 'Service unavailable.',
      delete: 'Failed to delete',
    },
  },
};

module.exports = { response };
