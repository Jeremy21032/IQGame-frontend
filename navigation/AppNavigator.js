import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CustomBottomNavigationBar from '../components/CustomBottomNavigationBar';
import LevelScreen from '../screens/LevelScreen';
import GameScreen from '../screens/GameScreen';
import { useAuth } from '../context/AuthContext';

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isAuthenticated ? (
          <>
            <Stack.Screen name="Home" component={CustomBottomNavigationBar} />
            <Stack.Screen name="LevelScreen" component={LevelScreen} />
            <Stack.Screen name="GameScreen" component={GameScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
