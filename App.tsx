/* eslint-disable prettier/prettier */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Homepage from './components/Homepage';
import PostScreen from './components/PostScreen';

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    // <View style={styles.container}>
    //   <Homepage />
    // </View>
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Homepage">
        <Stack.Screen name="Homepage" component={Homepage} />
        <Stack.Screen name="PostScreen" component={PostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'skyblue',
    flex: 1,
  }
});

export default App;
