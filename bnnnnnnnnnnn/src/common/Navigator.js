import React from 'react';
import { connect } from 'react-redux'
import { createStackNavigator } from '@react-navigation/stack';
import MainHome from '../screens/Drawer';
import AuthScreen from '../screens/login';



const Stack = createStackNavigator();



const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Home" component={MainHome} />
    </Stack.Navigator>
  )
}

const AuthStack = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        name="Auth"
        component={AuthScreen}
        options={{
          title: 'Sign In',
          animationTypeForReplace: 'pop',
        }}
      />
    </Stack.Navigator>
  )
}

function Navigator({ isLoggedIn }) {
  if (isLoggedIn == true) {
    return (
      <AppStack />)
  }

  else {
    return (
      <AuthStack />)
  }
}

const mapsStateProps = (state) => {
  const { isLoggedIn } = state.userLogin
  return {
    isLoggedIn: isLoggedIn
  }
}

export default connect(mapsStateProps)(Navigator)



