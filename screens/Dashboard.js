import React from 'react';
import {View, Image, StatusBar, Text, ScrollView} from 'react-native';
import styles from '../components/Styles';
import IconButton from '../components/IconButton';
import RecipeList from '../components/RecipeList';

const DashboardScreen = ({navigation}) => {
  return (
    <View style={styles.dashboard}>
      <StatusBar backgroundColor="#fcf6e8" barStyle="dark-content" />
      <View style={styles.customBar}>
        <IconButton
          name="right"
          handler={() => navigation.navigate('Profile')}
          style={{btn: styles.iconBtn, title: styles.customIcon}}
        />
        <Image
          source={require('../img/logo.png')}
          style={styles.barImg}
          resizeMode="contain"
        />
        <View style={styles.barBtnView}>
          <IconButton
            name="search1"
            handler={() => navigation.navigate('Search')}
            style={{btn: styles.iconBtn, title: styles.customIcon}}
          />
          <IconButton
            name="plus"
            style={{btn: styles.iconBtn, title: styles.customIcon}}
            handler={() => navigation.navigate('AddRecipe')}
          />
          <IconButton
            name="bookmark-o"
            style={{btn: styles.iconBtn, title: styles.customIcon}}
            handler={() => navigation.navigate('Bookmark')}
          />
        </View>
      </View>
      <View style={styles.listView}>
        <ScrollView style={styles.dashboardScroll}>
          <RecipeList name="Pizza" navigation={navigation} />

          <RecipeList name="Burger" navigation={navigation} />

          <RecipeList name="Avocado" navigation={navigation} />

          <View style={styles.copyrightView}>
            <Text style={styles.copyrightText}>
              All copyrights reservered at forkify@gmail.com, Don't use it as
              your own, you are free to use it for learning.
            </Text>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default DashboardScreen;
