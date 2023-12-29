import React, {useState, useEffect} from 'react';
import {Text, View, Image, StatusBar} from 'react-native';
import styles from '../components/Styles';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';

const SplashScreen = ({navigation}) => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState('');

  useEffect(() => {
    // Handle user state changes
    function onAuthStateChanged(userLogged) {
      setUser(userLogged);
      if (initializing) {
        setInitializing(false);
      }
      console.log('Checking Wether User is logged in or not');
      // If a user is logged in, navigate to the Dashboard
      if (user) {
        navigation.replace('Dashboard');
      }
    }
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initializing]);

  if (initializing) {
    return null;
  }

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle="dark-content" />

      <Image source={require('../img/favicon.png')} />
      <Text style={styles.textTitle}>Forkify</Text>
      <Text style={styles.textDescription}>
        Upload New Recipes or find amazing Recipes!!
      </Text>
      <CustomButton
        title="Register"
        handler={() => navigation.navigate('Register')}
      />

      <CustomButton
        title="Login"
        handler={() => navigation.navigate('Login')}
      />
    </View>
  );
};

export default SplashScreen;
