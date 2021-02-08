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

// this is not real js this is coming from parcel
if (module.hot) {
  module.hot.accept()
}

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);
    console.log('id: ', id);

    if (!id) return;
    // render spinner
    recipeView.renderSpinner();

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
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query);

    // 3) render results
    console.log(model.state.search.results);
    resultsView.render(model.state.search.results)
  } catch (err) {
    console.log(err);
  }
}


const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}
init();

