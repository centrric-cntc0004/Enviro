/* eslint-disable prettier/prettier */
import React, { createContext } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { lightGreen } from '../../../../common/Colors'
import TruckScreen from './TruckScreen'
import CarScreen from './CarScreen'
import ForkLiftScreen from './ForkLiftScreen'
import AllTabs from './common/AllTabs'
import { StyleSheet, View, Text, TouchableOpacity, RefreshControl, PermissionsAndroid, SafeAreaView, ActivityIndicator, FlatList, ScrollView, Alert } from 'react-native'
import { mainWhite, darkGrey, textRed, mainGrey, lightGrey, mainBlue, mediumGrey, } from '../../../../common/Colors'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'

const Tab = createMaterialTopTabNavigator();
const NavigationContext = createContext()
const Stack = createStackNavigator()
import VehicleDetail from '../VehicleScreen/TruckScreen/VehicleDetail'
function VehicleScreen({ navigation }) {
    return (
         <>
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            initialRouteName="Truck"
        >
            <Stack.Screen name="Truck" component={TruckScreen}

                options={{
                    title: '',
                    headerShown: false,
                    animationEnabled: false,


                }}

            />
             <Stack.Screen name="Car" component={CarScreen}

options={{
    title: '',
    headerShown: false,
    animationEnabled: false,


}}

/>
<Stack.Screen name="ForkLifts" component={ForkLiftScreen}

options={{
    title: '',
    headerShown: false,
    animationEnabled: false,


}}

/>

        </Stack.Navigator>
        </>


        // </>
        // <NavigationContext.Provider value={{
        //     drawerNavigation: navigation
        // }}>

        //     <Tab.Navigator

        //         tabBarOptions={{
        //             labelStyle: {
        //                 textAlign: 'center',
        //                 marginTop:15
        //             },
        //             indicatorStyle: {
        //                 borderBottomColor: lightGreen,
        //                 borderBottomWidth: 3,
        //                 borderRadius: 50,
        //                 width: 50, left: "10%",

        //             },
        //         }}>



        //         <Tab.Screen name="Truck" component={TruckScreen} />
        //         <Tab.Screen name="Car" component={CarScreen} />
        //         <Tab.Screen name="ForkLifts" component={ForkLiftScreen} />

        //     </Tab.Navigator>
        // </NavigationContext.Provider>

    )
}

export default VehicleScreen
// export const NavigationConsumer = NavigationContext.Consumer
