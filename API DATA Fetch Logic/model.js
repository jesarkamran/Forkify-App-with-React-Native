import {Alert} from 'react-native';
import {API_KEY, API_URL, RES_PER_PAGE, USER_STATES_KEY} from './config.js';
// import { getJSON, sendJSON } from './helper';
import {AJAX} from './helper';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: RES_PER_PAGE,
    page: 1,
    maxPages: 0,
  },
  bookmarks: [],
};

const createRecipe = function (data) {
  const {recipe} = data.data;

  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    ...(recipe.key && {key: recipe.key}),
  };
};

export const loadRecipe = async function (id) {
  try {
    const data = await AJAX(`${API_URL}${id}?key=${API_KEY}`);
    state.recipe = createRecipe(data);

    state.recipe.bookmarked = state.bookmarks.some(
      bookmark => bookmark.id === state.recipe.id,
    );
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const loadSearchResults = async function (query) {
  try {
    state.search.query = query;
    state.search.page = 1;
    const data = await AJAX(`${API_URL}?search=${query}&key=${API_KEY}`);

    // console.log(data);
    if (!data.results) {
      throw new Error(`No results found for ${query}`);
    }

    state.search.results = data.data.recipes.map(recipe => {
      return {
        id: recipe.id,
        title: recipe.title,
        publisher: recipe.publisher,
        image: recipe.image_url,
        ...(recipe.key && {key: recipe.key}),
      };
    });

    state.search.maxPages = Math.round(
      state.search.results.length / state.search.resultsPerPage,
    );
  } catch (error) {
    Alert.alert(error.message);
    throw error;
  }
};

export const serachResultsPerPage = function (page = state.search.page) {
  state.search.page = page;
  const start = (page - 1) * state.search.resultsPerPage;
  const end = page * state.search.resultsPerPage;
  return state.search.results.slice(start, end);
};

export const updateServings = function (newServings) {
  state.recipe.ingredients.forEach(ingredient => {
    ingredient.quantity *= newServings / state.recipe.servings;
  });

  state.recipe.servings = newServings;
};

export const uploadRecipe = async function (uploadData, userId) {
  try {
    const recipe = {
      title: uploadData.title,
      source_url: uploadData.sourceUrl,
      image_url: uploadData.imageUrl,
      publisher: uploadData.publisher,
      cooking_time: uploadData.cooking,
      servings: uploadData.servings,
      ingredients: uploadData.ingredients,
    };
    console.log(recipe);

    const respData = await AJAX(`${API_URL}?key=${API_KEY}`, recipe);
    state.recipe = createRecipe(respData);

    setupUserState(userId);

    console.log(state.recipe);
  } catch (e) {
    throw e;
  }
};

// user state Functionality
export const setupUserState = async userId => {
  // Handle user states
  const userStates = await getUserStates();
  userStates[userId] = {
    numOfUploaded: 0,
    numOfBookmarks: 0,
    bookmarks: [],
  };
  await setUserStates(userStates);
};

export const getUserStates = async () => {
  const userStatesJson = await AsyncStorage.getItem(USER_STATES_KEY);
  return userStatesJson != null ? JSON.parse(userStatesJson) : {};
};

export const setUserStates = async userStates => {
  const userStatesJson = JSON.stringify(userStates);
  await AsyncStorage.setItem(USER_STATES_KEY, userStatesJson);
};

export const getUserState = async userId => {
  try {
    const userStates = await getUserStates();
    return userStates[userId] || null;
  } catch (error) {
    console.error('Error fetching user state:', error);
    throw error;
  }
};

export const addBookmark = async (userId, recipe) => {
  try {
    let userStates = await getUserStates();
    let userState = userStates[userId];
    recipe.bookmarked = true;
    if (!userState) {
      // Create new user state if not exists
      userState = {
        numOfUploaded: 0,
        numOfBookmarks: 1,
        bookmarks: [recipe],
      };
    } else {
      // Update existing user state
      userState.bookmarks.push(recipe);
      userState.numOfBookmarks = userState.bookmarks.length;
    }

    userStates[userId] = userState;
    await setUserStates(userStates);
  } catch (error) {
    console.error('Error adding bookmark:', error);
  }
};

export const removeBookmark = async (userId, recipeId) => {
  try {
    let userStates = await getUserStates();
    let userState = userStates[userId];

    if (userState && userState.bookmarks) {
      userState.bookmarks = userState.bookmarks.filter(
        recipe => recipe.id !== recipeId,
      );
      userState.numOfBookmarks = userState.bookmarks.length;

      userStates[userId] = userState;
      await setUserStates(userStates);
    }
  } catch (error) {
    console.error('Error removing bookmark:', error);
  }
};

export const checkBookmarked = async (userId, recipeId) => {
  try {
    const userState = await getUserState(userId);
    if (userState && Array.isArray(userState.bookmarks)) {
      return !!userState.bookmarks.find(recipe => recipe.id === recipeId);
    }
    return false;
  } catch (error) {
    console.error('Error checking bookmark:', error);
    return false;
  }
};
