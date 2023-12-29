import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from './Styles';
import {controlSearchResults} from '../API DATA Fetch Logic/controller';

const Item = props => {
  const handler = () => {
    props.navigation.navigate('Recipe', {id: props.id});
  };
  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.itemBtn} onPress={handler}>
        <Image
          source={{uri: props.img}}
          resizeMode="contain"
          style={styles.listImg}
        />
        <Text style={styles.title}>
          {props.title.length > 12
            ? props.title.slice(0, 12) + '...'
            : props.title}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const List = ({DATA, navigation}) => {
  const renderItem = ({item}) => (
    <Item
      title={item.title}
      img={item.image}
      navigation={navigation}
      id={item.id}
    />
  );

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      style={styles.list}
    />
  );
};

const getData = async (name, setData) => {
  try {
    // Check if data exists in AsyncStorage
    const storedData = await AsyncStorage.getItem(name);
    if (storedData !== null) {
      // Data exists in AsyncStorage, set it to state
      setData(JSON.parse(storedData));
    } else {
      // Data does not exist, fetch from API
      const {result} = await controlSearchResults(name);
      const data = result ? Object.values(result).slice(0, 10) : [];

      await AsyncStorage.setItem(name, JSON.stringify(data)); // Store the data in AsyncStorage
      setData(data); // Set the fetched data to state
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

const RecipeList = ({name, navigation}) => {
  const [data, setData] = useState({}); // Initialize with an empty object

  useEffect(() => {
    const fetchData = () => {
      getData(name, setData);
    };
    fetchData();
  }, [name]); // Dependency array includes name

  return (
    <View style={styles.viewMargin}>
      <Text style={styles.listTitle}>{name}</Text>
      <List DATA={data} navigation={navigation} />
    </View>
  );
};

export default RecipeList;
