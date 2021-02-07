import * as model from './model'
import recipeView from './views/recipeView'

//add polyfills for es6 features  
// this one is for polyfilling everything else
import 'core-js/stable';
// this one is for polyfilling async/await
import 'regenerator-runtime/runtime';

const recipeContainer = document.querySelector('.recipe');

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

const init = function () {
  recipeView.addHandlerRender(controlRecipes)
}
init();

