// /* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {Text, View, FlatList, Image, TouchableOpacity} from 'react-native';
import styles from './Styles';

const Item = ({title, img, publisher, navigation, id}) => {
  const handler = () => {
    navigation.navigate('Recipe', {id: id});
  };
  return (
    <View style={styles.searchItem}>
      <TouchableOpacity style={styles.searchItemBtn} onPress={handler}>
        <Image
          source={{uri: img}}
          resizeMode="contain"
          style={styles.searchItemImg}
        />
        <View>
          <Text style={styles.searchItemTitle}>
            {title.length > 12 ? title.slice(0, 12) + '...' : title}
          </Text>
          <Text style={styles.searchItemUploader}>{publisher}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const List = ({DATA, navigation}) => {
  const renderItem = ({item}) => (
    <Item
      title={item.title}
      img={item.image}
      publisher={item.publisher}
      id={item.id}
      navigation={navigation}
    />
  );

  return (
    <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()} // Make sure keyExtractor returns a string
      style={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const ResultList = ({data, navigation}) => {
  // Convert the object to an array
  const dataArray = Object.values(data);

  return (
    <View style={styles.searchView}>
      <List DATA={dataArray} navigation={navigation} />
    </View>
  );
};

export default ResultList;
