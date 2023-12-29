/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * */

import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
// /*

import auth from '@react-native-firebase/auth';

import SplashScreen from './screens/SplashScreen';
import RegisterScreen from './screens/Register';
import LoginScreen from './screens/Login';
import ForgotPasswordScreen from './screens/ForgotPass';
import DashboardScreen from './screens/Dashboard';
import Search from './screens/Search';
import Recipe from './screens/Recipe';
import AddNewRecipe from './screens/AddNewRecipe';
import UserProfile from './screens/UserProfile';
import Bookmarks from './screens/Bookmarks';

const Stack = createNativeStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(currentUser => {
      setUser(currentUser);
      if (initializing) {
        setInitializing(false);
      }
    });

    // Unsubscribe on unmount
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  } // Or a loading indicator

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // This hides the header for all screens
        }}>
        {user ? (
          // User is signed in
          <>
            <Stack.Screen name="Dashboard" component={DashboardScreen} />
            <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Recipe" component={Recipe} />
            <Stack.Screen name="AddRecipe" component={AddNewRecipe} />
            <Stack.Screen name="Profile" component={UserProfile} />
            <Stack.Screen name="Bookmark" component={Bookmarks} />
          </>
        ) : (
          // No user signed in
          <>
            <Stack.Screen name="Home" component={SplashScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen
              name="ForgotPassword"
              component={ForgotPasswordScreen}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// */

// const App = () => {
//   return <UserProfile />;
// };

export default App;
