import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import ResetScreen from './screens/ResetScreen';
import AgbScreen from './screens/AgbScreen';
import GSProfile from './screens/GSProfile';


const Stack = createNativeStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
        <Stack.Screen options={{ headerShown: false }} name="SignIn" component={SignInScreen} />
        <Stack.Screen options={{ headerShown: false }} name="Reset" component={ResetScreen} />
        <Stack.Screen options={{ headerShown: false }} name="AGB" component={AgbScreen} />
        <Stack.Screen options={{ headerShown: false }} name="GSP" component={GSProfile} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


