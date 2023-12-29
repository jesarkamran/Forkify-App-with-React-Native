import React, {useState} from 'react';
import {View, Image, StatusBar, TextInput, Alert} from 'react-native';
import auth from '@react-native-firebase/auth';
import styles from '../components/Styles';
import CustomButton from '../components/CustomButton';

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');

  const sendResetEmail = async () => {
    if (email === '') {
      Alert.alert('Enter your email');
      return;
    }
    try {
      await auth().sendPasswordResetEmail(email);
      Alert.alert('Check your email for the link to reset your password.');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fcf6e8" barStyle="dark-content" />

      <Image
        source={require('../img/logo.png')}
        style={styles.img}
        resizeMode="contain"
      />

      <View style={styles.viewMargin}>
        <TextInput
          style={styles.inputs}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
        <View style={styles.loginBtnView}>
          <CustomButton title="Send Reset Email" handler={sendResetEmail} />
          <CustomButton
            title="Go Back"
            handler={() => navigation.navigate('Login')}
          />
        </View>
      </View>
    </View>
  );
};

export default ForgotPasswordScreen;
