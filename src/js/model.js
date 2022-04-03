import { API_URL } from './config.js';
import { getJSON } from './helpers.js';
export const state = {
  recipe: {},
};

export const loadRecipe = async function (id) {
  try {
    const data = await getJSON(`${API_URL}/${id}`);

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
  } catch (err) {
    throw err;
  }
};
