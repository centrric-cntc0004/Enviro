/* eslint-disable prettier/prettier */
import React, { createContext } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { lightGreen } from '../../../../common/Colors'
import TruckScreen from './TruckScreen'
import CarScreen from './CarScreen'
import ForkLiftScreen from './ForkLiftScreen'

const Tab = createMaterialTopTabNavigator();
const NavigationContext = createContext()

const VehicleScreen = ({ navigation }) => {
    return (
        <NavigationContext.Provider value={{
            drawerNavigation: navigation
        }}>

            <Tab.Navigator

                tabBarOptions={{
                    labelStyle: {
                        textAlign: 'center',
                        marginTop:15
                    },
                    indicatorStyle: {
                        borderBottomColor: lightGreen,
                        borderBottomWidth: 3,
                        borderRadius: 50,
                        width: 50, left: "10%",
                        
                    },
                }}>



                <Tab.Screen name="Truck" component={TruckScreen} />
                <Tab.Screen name="Car" component={CarScreen} />
                <Tab.Screen name="ForkLifts" component={ForkLiftScreen} />

            </Tab.Navigator>
        </NavigationContext.Provider>
    )
}

export default VehicleScreen
export const NavigationConsumer = NavigationContext.Consumer
