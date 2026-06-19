const categoryDTO = (category) => {
  if (!category) {
    return null;
  }

  return {
    id: category.id,
    name: category.name,
  };
};

const categoriesListDTO = (categories) => {
  return categories.map((category) => categoryDTO(category));
};

module.exports = {
  single: categoryDTO,
  list: categoriesListDTO,
};
