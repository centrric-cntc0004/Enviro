
import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { Header, HeaderNotificationIcon, HeaderClientNav, } from '../../../common/Header'

import VehicleScreen from './VehicleScreen'




const Stack = createStackNavigator()

const EnviroTruck = (props) => {
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            initialRouteName="enviro-truck"
        >
            <Stack.Screen name="enviro-truck" component={VehicleScreen}
                options={({ navigation }) => ({
                    title: '',
                    headerLeft: () => (<HeaderClientNav {...props} />),
                    headerBackground: () => (<Header title="Vehicle " />),
                    headerRight: () => (<HeaderNotificationIcon {...props} />)
                })}

            />

        </Stack.Navigator>
    )
}

export default EnviroTruck


