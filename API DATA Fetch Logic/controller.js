import * as model from './model.js';
import {Alert} from 'react-native';
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
export const controlRecipes = async function (id) {
  try {
    if (!id) {
      console.log('Invalid Id Given');
    }

    // Loading Recipe
    await model.loadRecipe(id);
    return model.state.recipe;
    // Updating bookmarks for active bookmarks in list
    // bookmarksView.updateDOM(model.state.bookmarks);
  } catch (e) {
    console.log(e);
  }
};

export const gotPage = function (page) {
  // Rendering Search Results to the View
  return model.serachResultsPerPage(page);
};
export const controlSearchResults = async function (query) {
  try {
    // Guard Clause
    if (!query) {
      return;
    }
    // Loading Search Results from Model
    await model.loadSearchResults(query);

    return model.state.search;

    // gotPage(model.state.search.page);
  } catch (e) {
    console.log(e);
  }
};

export const controlServings = function (servings) {
  model.updateServings(servings);
};

export const controlAddRecipe = async function (data, userId) {
  try {
    // Upload data to API
    await model.uploadRecipe(data, userId);
    // Success Message
    Alert.alert('Upload Successful: Recipe Uploaded Successfully :)');
  } catch (error) {
    Alert.alert(`Uploading Error: ${error.message}`);
  }
};

export const getUserState = async userId => {
  return await model.getUserState(userId);
};
