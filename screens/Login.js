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
import styles from '../components/Styles';
import CustomButton from '../components/CustomButton';
import auth from '@react-native-firebase/auth';

const loginUser = (email, password, navigation) => {
  auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      console.log('User signed in!');
      navigation.navigate('Dashboard');
    })
    .catch(error => {
      if (error.code === 'auth/invalid-credentials') {
        Alert.alert('Invalid Email or Password Entered');
      }

      if (error.code === 'auth/invalid-email') {
        console.log('That email address is invalid!');
      }
    });
};

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    if (email !== '' && password !== '') {
      loginUser(email, password, navigation);
      setEmail('');
      setPassword('');
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
        <TextInput
          style={styles.inputs}
          placeholder="Enter Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
        <View style={styles.loginBtnView}>
          <CustomButton title="Login" handler={handleLogin} />
          <CustomButton
            title="Forgot Password"
            handler={() => navigation.navigate('ForgotPassword')}
          />
        </View>
      </View>

      <View style={styles.msgView}>
        <Text style={styles.msgText}>Don't have an account ?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.msgBtnText}>register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
