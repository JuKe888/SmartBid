import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

// Import your screens here
import HomeScreen from './Screens/HomeScreen';
import AuctionDetailsScreen from './Screens/AuctionDetailsScreen';
import UserDashboardScreen from './Screens/UserDashboardScreen';
import NotificationsScreen from './Screens/NotificationsScreen';
import ProfileScreen from './Screens/ProfileScreen';
import PlaceBidScreen from './Screens/PlaceBidScreen'; // Assume you have this screen

// Stack Navigator Setup
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Home Stack Navigator
const HomeStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false, // You can customize your header as needed
    }}
  >
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="AuctionDetails" component={AuctionDetailsScreen} />
    <Stack.Screen name="PlaceBid" component={PlaceBidScreen} />
  </Stack.Navigator>
);

// User Dashboard Stack Navigator
const DashboardStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false, // You can customize your header as needed
    }}
  >
    <Stack.Screen name="UserDashboard" component={UserDashboardScreen} />
    <Stack.Screen name="Profile" component={ProfileScreen} />
  </Stack.Navigator>
);

// Notifications Stack Navigator
const NotificationsStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false,
    }}
  >
    <Stack.Screen name="Notifications" component={NotificationsScreen} />
  </Stack.Navigator>
);

// Main App Tab Navigator
const AppTabs = () => (
  <Tab.Navigator
    screenOptions={{
      tabBarActiveTintColor: '#6200EE',
      tabBarInactiveTintColor: 'gray',
      tabBarStyle: { height: 60 },
    }}
  >
    <Tab.Screen
      name="Home"
      component={HomeStack}
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="Dashboard"
      component={DashboardStack}
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="person" size={24} color={color} />,
      }}
    />
    <Tab.Screen
      name="Notifications"
      component={NotificationsStack}
      options={{
        tabBarIcon: ({ color }) => <Ionicons name="notifications" size={24} color={color} />,
      }}
    />
  </Tab.Navigator>
);

// Main Navigator (Navigation Container)
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <AppTabs />
    </NavigationContainer>
  );
};

export default AppNavigator;
