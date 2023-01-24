/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Authenticator from './views/AuthenticatorScreen/Authenticator';
import ListScreen from './views/ListScreen/ListScreen';
import DetailsScreen from './views/DetailsScreen/Details';


function App(): JSX.Element {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{
        headerShown: false
      }} initialRouteName="Authenticator">
        <Stack.Screen name="Authenticator" component={Authenticator} />
        <Stack.Screen name="ListScreen" component={ListScreen} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
