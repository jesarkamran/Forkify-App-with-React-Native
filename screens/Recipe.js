import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  ImageBackground,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import {controlRecipes} from '../API DATA Fetch Logic/controller';
import styles from '../components/Styles';
import IconButton from '../components/IconButton';
import Item from '../components/IngredientsList';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';
import {
  addBookmark,
  getUserState,
  removeBookmark,
  checkBookmarked,
} from '../API DATA Fetch Logic/model';
import auth from '@react-native-firebase/auth';

const Recipe = ({navigation, route}) => {
  const [recipe, setRecipe] = useState(null);
  const id = route.params?.id;
  const userId = auth().currentUser.uid;

  const checkIfBookmarked = useCallback(async () => {
    const userState = await getUserState(userId);
    if (userState && userState.bookmarks) {
      // Assuming each bookmark object has an 'id' property
      return userState.bookmarks.some(bookmark => bookmark.id === id);
    }
    return false;
  }, [userId, id]);

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const fetchedData = await controlRecipes(id);
        if (fetchedData) {
          const isBookmarked = await checkIfBookmarked();
          setRecipe({...fetchedData, bookmarked: isBookmarked});
        }
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchRecipeDetails();
  }, [id, checkIfBookmarked]);
  const toggleBookmark = async () => {
    try {
      // Optimistically update the UI
      const updatedIsBookmarked = !recipe.bookmarked;
      setRecipe({...recipe, bookmarked: updatedIsBookmarked});

      // Update AsyncStorage
      if (updatedIsBookmarked) {
        await addBookmark(userId, recipe);
        console.log(await checkBookmarked(userId, recipe.id));
      } else {
        await removeBookmark(userId, recipe?.id);
        console.log(await checkBookmarked(userId, recipe.id));
      }
    } catch (error) {
      console.error('Error toggling bookmark:', error);
      // Optionally handle the error, such as showing a message to the user
    }
  };
  const updateServings = newServings => {
    if (!recipe) {
      return;
    }

    const updatedIngredients = recipe.ingredients.map(ingredient => ({
      ...ingredient,
      quantity: ingredient.quantity
        ? (ingredient.quantity * newServings) / recipe.servings
        : null,
    }));

    setRecipe({
      ...recipe,
      servings: newServings,
      ingredients: updatedIngredients,
    });
  };

  const incServingsHandler = () => {
    if (recipe) {
      updateServings(recipe.servings + 1);
    }
  };

  const decServingsHandler = () => {
    if (recipe && recipe.servings > 1) {
      updateServings(recipe.servings - 1);
    }
  };

  const handlePress = () => {
    const url = recipe.sourceUrl; // Assuming recipe.source contains the URL
    Linking.openURL(url).catch(err => console.error("Couldn't load page", err));
  };

  if (!recipe) {
    // Render loading state or nothing if data is not yet available
    return (
      <View style={styles.container}>
        <Text> Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.recipeView}>
      <StatusBar backgroundColor="#fcf6e8" barStyle="dark-content" />
      <View style={styles.backButton}>
        <IconButton
          name="left"
          style={{btn: styles.iconBtn, title: styles.bookmarkBtnTxt}}
          handler={() => navigation.goBack()}
        />
      </View>
      <View style={styles.imgView}>
        <ImageBackground
          source={{uri: recipe.image}}
          resizeMode="cover"
          style={styles.recipeImg}>
          <View style={styles.recipeTitleView}>
            <Text style={styles.recipeTitle}>{recipe.title}</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.bookmarkBtnView}>
        <IconButton
          name={recipe.bookmarked ? 'bookmark' : 'bookmark-o'}
          style={{btn: styles.iconBtn, title: styles.bookmarkBtnTxt}}
          handler={toggleBookmark}
        />
      </View>
      <View style={styles.recipeBtnBar}>
        <View style={styles.btnView}>
          <AntDesign
            name="clockcircleo"
            style={{...styles.recipeBtnTxt, ...styles.iconBtn}}
          />

          <Text style={styles.btnText}>{recipe.cooking_time} Minutes</Text>
        </View>
        <View style={styles.btnView}>
          <AntDesign
            name="team"
            style={{...styles.recipeBtnTxt, ...styles.iconBtn}}
          />
          <Text style={styles.btnText}>{recipe.servings} Servings</Text>
        </View>

        {/* eslint-disable-next-line react-native/no-inline-styles*/}
        <View style={{...styles.btnView, marginLeft: 35}}>
          <IconButton
            name="minuscircleo"
            handler={decServingsHandler}
            style={{btn: styles.iconBtn, title: styles.recipeBtnTxt}}
          />
          <IconButton
            name="pluscircleo"
            handler={incServingsHandler}
            style={{btn: styles.iconBtn, title: styles.recipeBtnTxt}}
          />
        </View>
      </View>

      <ScrollView>
        <View style={styles.ingredientsView}>
          <Text style={styles.ingredientsListTitle}>Recipe Ingredients</Text>
          {recipe.ingredients.map((item, index) => (
            <Item key={index.toString()} item={item} />
          ))}
        </View>

        <View style={styles.footer}>
          <Text style={styles.ingredientsListTitle}>How to Cook it</Text>
          <Text style={styles.desText}>
            This recipe was carefully designed and tested by
            {' ' + recipe.publisher}. Please check out directions at their
            website.
          </Text>

          <TouchableOpacity style={styles.dirBtn} onPress={handlePress}>
            <Text style={styles.dirBtnTxt}>
              Directions{' '}
              <Feather name={'arrow-right'} style={styles.dirBtnTxt} />
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Recipe;
