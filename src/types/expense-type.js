const updateRequiredFields = [
  { title: 'string' },
  { amount: 'number' },
  { category: 'string' },
  { note: 'string' },
];

const createRequiredFields = [...updateRequiredFields, { userId: 'number' }];

module.exports = { updateRequiredFields, createRequiredFields };
