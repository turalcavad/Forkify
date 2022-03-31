export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  if (!id) return;

  const res = await fetch(
    `https://forkify-api.herokuapp.com/api/v2/recipes/${id}`
  );
  const data = await res.json();

  const { recipe } = data.data;

  state.recipe = {
    id: recipe.id,
    title: recipe.title,
    image: recipe.image_url,
    publisher: recipe.publisher,
    servings: recipe.servings,
    cooking_time: recipe.cooking_time,
    source_url: recipe.source_url,
    ingredients: recipe.ingredients,
  };
};
