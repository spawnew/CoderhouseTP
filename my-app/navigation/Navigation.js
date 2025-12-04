import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import VerScreen from '../Screen/VerScreen';
import LoginScreen from '../Screen/LoginScreen';
import MainScreen from '../Screen/MainScreen';
import HomeScreen from '../Screen/HomeScreen';
import SubirScreen from '../Screen/SubirScreen';
import BuscarScreen from '../Screen/BuscarScreen';

const Stack = createNativeStackNavigator();

export default function Navigation({ user }) {
  if (!user) {
    return (
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
      </Stack.Navigator>
    );
  }

  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        animationEnabled: true
      }}
      initialRouteName="Main"
    >
      <Stack.Screen 
        name="Main" 
        component={MainScreen}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen}
      />
      <Stack.Screen 
        name="Subir" 
        component={SubirScreen}
      />
      <Stack.Screen 
        name="Ver" 
        component={VerScreen}
      />
      <Stack.Screen 
        name="Buscar" 
        component={BuscarScreen}
      />
    </Stack.Navigator>
  );
}