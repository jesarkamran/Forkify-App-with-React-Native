import {
  View,
  StatusBar,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

import styles from '../components/Styles';
import IconButton from '../components/IconButton';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {controlAddRecipe} from '../API DATA Fetch Logic/controller';
import auth from '@react-native-firebase/auth';

const AddNewRecipe = ({navigation}) => {
  styles.heading = {...styles.customIcon, fontSize: 20};
  const [recipeData, setRecipeData] = useState({
    title: '',
    publisher: '',
    imageUrl: '',
    sourceUrl: '',
    servings: '',
    cooking: '',
    ingredients: [],
  });

  const handleInputChange = (name, value) => {
    setRecipeData({...recipeData, [name]: value});
  };

  const handleIngredientChange = (value, index) => {
    let newIngredients = [...recipeData.ingredients];
    newIngredients[index] = value;
    setRecipeData({...recipeData, ingredients: newIngredients});
  };

  const handleUpload = () => {
    // Process the recipeData for upload
    const newIngredients = recipeData.ingredients
      .filter(ingredientString => ingredientString.trim().length > 0) // Filter out empty or whitespace-only strings
      .map(ingredientString => {
        const [quantity, unit, ...descParts] = ingredientString
          .split(',')
          .map(part => part.trim());

        // You may also want to check if quantity, unit, and description are not empty
        if (!quantity || !unit || descParts.join(', ').trim().length === 0) {
          return null;
        }

        return {
          quantity: quantity ? +quantity : null,
          unit: unit ? unit : '',
          description: descParts ? descParts.join(', ') : '',
        };
      })
      .filter(ingredient => ingredient !== null); // Filter out any null values created from empty quantity, unit, or description

    const recipe = {...recipeData, ingredients: newIngredients};
    console.log('Preserved Data');
    controlAddRecipe(recipe, auth().currentUser.uid);
    // console.log(recipe);
    // You would typically send this data to a backend server or similar
    setRecipeData({
      title: '',
      publisher: '',
      imageUrl: '',
      sourceUrl: '',
      servings: '',
      cooking: '',
      ingredients: Array(6).fill(''), // Assuming you always want 6 ingredient inputs
    });
  };

  return (
    <View style={styles.dashboard}>
      <StatusBar backgroundColor="#fcf6e8" barStyle="dark-content" />
      <View style={styles.customBar}>
        <IconButton
          name="left"
          handler={() => navigation.goBack()}
          style={{btn: styles.iconBtn, title: styles.customIcon}}
        />
        <Text style={styles.heading}>Add New Recipe</Text>
      </View>

      <ScrollView style={styles.addScroll}>
        <View style={styles.inputViews}>
          <Text style={styles.heading}>Reference Details</Text>
          <TextInput
            placeholder="Enter Recipe Title"
            style={styles.addInputs}
            onChangeText={text => handleInputChange('title', text)}
            value={recipeData.title}
          />
          <TextInput
            placeholder="Enter Publisher Name"
            style={styles.addInputs}
            onChangeText={text => handleInputChange('publisher', text)}
            value={recipeData.publisher}
          />
          <TextInput
            placeholder="Enter Image Url"
            style={styles.addInputs}
            onChangeText={text => handleInputChange('imageUrl', text)}
            value={recipeData.imageUrl}
          />
          <TextInput
            placeholder="Enter Source Url"
            style={styles.addInputs}
            onChangeText={text => handleInputChange('sourceUrl', text)}
            value={recipeData.sourceUrl}
          />
          <TextInput
            placeholder="Enter Servings"
            style={styles.addInputs}
            onChangeText={text => handleInputChange('servings', text)}
            value={recipeData.servings}
          />
          <TextInput
            placeholder="Enter Cooking Time"
            style={styles.addInputs}
            onChangeText={text => handleInputChange('cooking', text)}
            value={recipeData.cooking}
          />
        </View>
        <View style={styles.inputViews}>
          <Text style={styles.heading}>Ingredient Details</Text>
          {Array.from({length: 6}).map((_, index) => (
            <TextInput
              key={index}
              placeholder="Format: 'Quantity,Unit,Description'"
              style={styles.addInputs}
              onChangeText={text => handleIngredientChange(text, index)}
              value={recipeData.ingredients[index] || ''} // This should be a string
            />
          ))}
        </View>

        <TouchableOpacity style={styles.uploadBtn} onPress={handleUpload}>
          <Ionicons
            name="cloud-upload-outline"
            style={styles.uploadBtnTxtIcon}
          />
          <Text style={styles.uploadBtnTxt}>upload</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default AddNewRecipe;
