// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import AuctionDetailsScreen from './src/screens/AuctionDetailsScreen';
import UserDashboard from './src/screens/UserDashboard';
import SignUpScreen from './src/screens/SignUpScreen';
import LoginScreen from './src/screens/LoginScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="AuctionDetails" component={AuctionDetailsScreen} />
        <Stack.Screen name="Dashboard" component={UserDashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  ); 
}
