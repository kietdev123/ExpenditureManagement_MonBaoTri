import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/login/index.js';
import MainScreen from '../screens/main/index.js';
const Stack = createNativeStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={MainScreen}
          options={{title: 'main screen'}}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerLeft: () => <></>, // Hide back button
            title: 'kiet',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default MyStack;
