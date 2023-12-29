import React, {useState, useEffect} from 'react';
import {View, StatusBar, Text} from 'react-native';
import styles from '../components/Styles';
import IconButton from '../components/IconButton';
import ResultList from '../components/SearchResultList';
import auth from '@react-native-firebase/auth';
import {getUserState} from '../API DATA Fetch Logic/model';

const Bookmarks = ({navigation}) => {
  const [data, setData] = useState();
  useEffect(() => {
    const uid = auth().currentUser.uid;
    const fetchAndSetUserState = async () => {
      const state = await getUserState(uid);
      if (state) {
        setData({...state.bookmarks});
      }
    };

    fetchAndSetUserState().then(() => console.log('Data Updated of UserState'));
  }, []);

  if (!data) {
    return (
      <View style={styles.container}>
        <Text> Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.dashboard}>
      <View style={styles.customBar}>
        <IconButton
          name="left"
          handler={() => navigation.goBack()}
          style={{btn: styles.iconBtn, title: styles.customIcon}}
        />
        {/* eslint-disable-next-line react-native/no-inline-styles*/}
        <Text style={{...styles.customIcon, fontSize: 20}}>Bookmarks</Text>
      </View>

      <StatusBar backgroundColor="white" barStyle="dark-content" />
      <View style={styles.searchResultView}>
        {data && <ResultList data={data} navigation={navigation} />}
      </View>
    </View>
  );
};

export default Bookmarks;
