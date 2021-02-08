import { async } from 'regenerator-runtime/runtime';
import * as model from './model'
import recipeView from './views/recipeView';
import searchView from './views/searchView';

//add polyfills for es6 features  
// this one is for polyfilling everything else
import 'core-js/stable';
// this one is for polyfilling async/await
import 'regenerator-runtime/runtime';

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
    const query = searchView.getQuery();
    if (!query) return;

    await model.loadSearchResults(query)
  } catch (err) {
    console.log(err);
  }
}


const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  searchView.addHandlerSearch(controlSearchResults);
}
init();

