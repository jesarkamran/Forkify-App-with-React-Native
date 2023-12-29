import React, {useState} from 'react';
import {
  View,
  Image,
  StatusBar,
  TextInput,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import styles from '../components/Styles';
import CustomButton from '../components/CustomButton';
import {setupUserState} from '../API DATA Fetch Logic/model';

const RegisterScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');

  const handleRegister = async () => {
    try {
      // Register user with Firebase Authentication
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      // Save additional user data in Firestore
      await firestore().collection('Users').doc(user.uid).set({
        user_name: username,
        user_email: email,
        // You can store other additional fields here
      });

      // Optional: Update the display name in Firebase Authentication
      await user.updateProfile({
        displayName: username,
      });
      setupUserState(auth().currentUser.uid);
      navigation.navigate('Dashboard');
    } catch (error) {
      Alert.alert(error.message);
      console.log(error);
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
          placeholder="Enter Full Name"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Enter Email"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.inputs}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      <CustomButton title="Register" handler={handleRegister} />

      <View style={styles.msgView}>
        <Text style={styles.msgText}>Already have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.msgBtnText}>Sign in</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
