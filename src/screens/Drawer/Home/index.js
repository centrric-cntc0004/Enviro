import React, { createContext } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import EnviroPage from './Enviro'
import EnviroBottomTabBar from '../../../common/BottomTabBar'



const Tab = createBottomTabNavigator();
const NavigationContext = createContext()

const HomeScreen = ({ navigation }) => {
    return (
        <NavigationContext.Provider value={{
            drawerNavigation: navigation
        }}>
            <Tab.Navigator
                initialRouteName='Enviro'
                tabBar={porps => <EnviroBottomTabBar {...porps} />}
            >

                <Tab.Screen name="Enviro" component={EnviroPage} />


            </Tab.Navigator>
        </NavigationContext.Provider>
    )
}

export default HomeScreen
export const NavigationConsumer = NavigationContext.Consumer
