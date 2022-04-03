import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    if (!id) return;

    //loading spinner while fetching data
    recipeView.renderspinner();

    // 1) loading recipe
    await model.loadRecipe(id);

    // 2) rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
  }
};

const controlSearchResults = async function () {
  // get search query
  const query = searchView.getQuery();
  if (!query) return;

  //loading spinner while fetching data
  resultsView.renderspinner();

  // 1) loading search results
  await model.loadSearchResults(query);

  // 2) rendering search results
  resultsView.render(model.state.search.results);
};
controlSearchResults();
const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
};
init();
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
