import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'react-native-redux';
import {Text, View} from 'react-native';
import ToDoPage from '../screens/todo/todo_page.js';
import LoginScreen from '../screens/login/index.js';
import MainScreen from '../screens/main/index.js';
const LoadingScreen = () => {
  return (
    <View>
      <Text>Loading Screen</Text>
    </View>
  );
};
const Stack = createNativeStackNavigator();

const myInitialState = {
  /* your initial state */
  user: {
    id: 'user_id_1234',
    name: 'Nguyen Hoang Kiet',
  },
};

function MyStack() {
  return (
    <Provider
      initialState={myInitialState}
      // loading={() => <LoadingScreen />}
    >
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={MainScreen}
            options={{title: 'main screen'}}
          />
          <Stack.Screen
            name="Todo"
            component={ToDoPage}
            options={{title: 'todo screen'}}
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
    </Provider>
  );
}

export default MyStack;
