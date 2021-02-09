import { async } from 'regenerator-runtime/runtime';
import * as model from './model'
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultsView from './views/resultsView';

//add polyfills for es6 features  
// this one is for polyfilling everything else
import 'core-js/stable';
// this one is for polyfilling async/await
import 'regenerator-runtime/runtime';
import paginationView from './views/paginationView';

// this is not real js this is coming from parcel
// if (module.hot) {
//   module.hot.accept()
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log('id: ', id);

    if (!id) return;
    // render spinner
    recipeView.renderSpinner();

    // 0) update results view to mark selected search result
    resultsView.update(model.getSearchResultsPage())

    // 1) loading recipe
    await model.loadRecipe(id)

    // 2) rendering recipe
    recipeView.render(model.state.recipe)

  } catch (err) {
    recipeView.renderError()
  }
}

const controlSearchResults = async function () {
  try {
    resultsView.renderSpinner();
    console.log(resultsView)

    // 1) get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2) load search results
    await model.loadSearchResults(query);

    // 3) render results
    console.log(model.state.search.results);
    // resultsView.render(model.state.search.results)
    resultsView.render(model.getSearchResultsPage());

    // 4) render initial pagination buttons
    paginationView.render(model.state.search)
  } catch (err) {
    console.log(err);
  }
}

const controlPagination = function (goToPage) {
  console.log('pagination controller')
  console.log(goToPage)

  // 1) render NEW results
  resultsView.render(model.getSearchResultsPage(goToPage))

  // 2) render NEW pagination buttons
  paginationView.render(model.state.search)
}

const controlServings = function (newServings) {
  // update the recipe servings (in state)
  model.updateServings(newServings)
  // update the recipe view 
  // recipeView.render(model.state.recipe)
  recipeView.update(model.state.recipe)
}

const controlAddBookmark = function () {
  // console.log(model.state.recipe)
  if (!model.state.recipe.bookmarked) {
    model.addBookmark(model.state.recipe);
  } else {
    model.deleteBookmark(model.state.recipe.id);
  }

  // console.log(model.state.recipe);
  recipeView.update(model.state.recipe)
}


const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
}
init();

