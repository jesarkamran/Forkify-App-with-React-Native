import {
  View,
  StatusBar,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles from '../components/Styles';
import IconButton from '../components/IconButton';
import Hr from '../components/HorizontalLine';
import {getUserState} from '../API DATA Fetch Logic/controller';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const logout = navigation => {
  auth()
    .signOut()
    .then(() => {
      Alert.alert('Logging Out...!');
      navigation.navigate('Login');
    })
    .catch(err => Alert.alert(err.message));
};

const fetchUserData = async setUserData => {
  try {
    const uid = auth().currentUser.uid;
    const userDocument = await firestore().collection('Users').doc(uid).get();

    if (userDocument.exists) {
      console.log(userDocument.data());
      setUserData(userDocument.data()); // Correctly calling the function
    } else {
      console.log('No such document!');
      return null;
    }
  } catch (error) {
    console.error('Error fetching user data: ', error);
    return null;
  }
};

const UserProfile = ({navigation}) => {
  const [data, setData] = useState();
  const [userData, setUserData] = useState(null);

  const handler = () => {
    logout(navigation);
  };

  useEffect(() => {
    const uid = auth().currentUser.uid;

    const fetchAndSetUserData = async () => {
      await fetchUserData(setUserData);
      console.log('Data Loaded Successfully');
    };

    const fetchAndSetUserState = async () => {
      const state = await getUserState(uid);
      if (state) {
        setData({
          added: state.numOfUploaded,
          bookmarked: state.numOfBookmarks,
        });
        console.log('data updating.....');
        console.log(data);
      }
    };

    fetchAndSetUserData().then(() => console.log('Data Updated of UserData'));
    fetchAndSetUserState().then(() => console.log('Data Updated of UserState'));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <View style={styles.profileView}>
      <StatusBar backgroundColor="#fcf6e8" barStyle="dark-content" />
      <View style={styles.customBar}>
        <IconButton
          name="left"
          handler={() => navigation.goBack()}
          style={{btn: styles.iconBtn, title: styles.customIcon}}
        />
        <Image
          source={require('../img/logo.png')}
          style={styles.barImg}
          resizeMode="contain"
        />
      </View>

      <View style={styles.circularName}>
        <Text style={styles.circularNameTxt}>
          {userData ? userData.user_name?.charAt(0) : '...'}
        </Text>
      </View>

      <Text style={styles.username}>
        {userData ? userData.user_name : 'Loading...'}
      </Text>

      <ScrollView>
        <View>
          <Hr />
          <View style={styles.statsView}>
            <Text style={styles.statsTxt}>Recipes Added: </Text>
            <Text style={styles.statsNum}>{data ? data.added : 0}</Text>
          </View>

          <View style={styles.statsView}>
            <Text style={styles.statsTxt}>Recipes Bookmarked: </Text>
            <Text style={styles.statsNum}>{data ? data.bookmarked : 0}</Text>
          </View>
          <Hr />
        </View>

        <View>
          <TouchableOpacity style={styles.statsView}>
            {/* eslint-disable-next-line react-native/no-inline-styles*/}
            <Text style={{...styles.statsTxt, marginLeft: 20}}>
              Delete Account{' '}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.statsView} onPress={handler}>
            {/* eslint-disable-next-line react-native/no-inline-styles*/}
            <Text style={{...styles.statsTxt, marginLeft: 20}}>Logout</Text>
          </TouchableOpacity>
          <Hr />
        </View>

        <Text style={styles.profileFooter}>
          © Copyright by Forkify Developers. Use for learning or your portfolio.
          Don't use to teach. Don't claim as your own.
        </Text>
      </ScrollView>
    </View>
  );
};

export default UserProfile;
