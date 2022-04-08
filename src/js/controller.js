import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

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

    //test
  } catch (err) {
    recipeView.renderError();
    console.log(err);
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
  resultsView.render(model.getSearchResultsPage(1));

  // 3) render initial pagination buttons
  paginationView.render(model.state.search);
};

const controlPagination = function (goToPage) {
  console.log(goToPage);
  // 2) render NEW search results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 3) render NEW initial pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  //Update the recipe servings (in state)
  model.updateServings(newServings);
  console.log('test');
  //Update the servings in the view
  recipeView.render(model.state.recipe);
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings)
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
};
init();
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
