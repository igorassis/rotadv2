import 'react-native-gesture-handler';
import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/login';
import Register from './screens/register';
import Home from './screens/home';

const Stack = createStackNavigator();

export default function App() {
    return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Register" 
          component={Register} 
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Home" 
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
    )
}
