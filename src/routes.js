/* eslint-disable react/prop-types */
import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import SignIn from './pages/SignIn';
import Dashboard from './pages/Dashboard';
import Settings from './pages/Settings';

const Stack = createStackNavigator();

function App() {
  return (
      <Stack.Navigator initialRouteName="SignIn" screenOptions={{
        headerStyle: {
          backgroundColor: '#7560ec',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
        <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} />           
        <Stack.Screen name="Settings" component={Settings} options={{ title:"Configurações" }} />
      </Stack.Navigator>
  );
}

export default App;