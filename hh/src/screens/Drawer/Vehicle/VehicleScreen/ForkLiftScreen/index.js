import React, { useEffect } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import ForkLift from './ForkLiftScreen'
import {fetch_preinspection_list, fetch_maintanace_list, fetch_all_forklift_list, fetch_forklift_list } from './common/action'
import { connect } from 'react-redux'
import EditReport from './EditReport'
import VehicleData from './VehicleData'
import AddReport from './AddReport'
import AddExpense from './AddExpense'
import AddInspection from './AddInspection'
import EditInspection from './EditInspection'
import EditFuelExpenses from './EditFuelExpenses'

const Stack = createStackNavigator()

const ForkLiftScreen = ({ preinspection_list_api,fetch_maintanace, fetch_all_forklifts, fetch_vehicle_list }) => {
    useEffect(() => {
        preinspection_list_api()
        fetch_maintanace(1)
        fetch_all_forklifts()
        fetch_vehicle_list(1)
        return () => fetch_maintanace.remove, fetch_vehicle_list.remove,preinspection_list_api.remove

    }, [fetch_maintanace, fetch_all_forklifts, fetch_vehicle_list,preinspection_list_api])

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            initialRouteName="enviro-forklift"
        >
            <Stack.Screen name="enviro-forklift" component={ForkLift}
                options={{
                    title: '',
                    headerShown: false

                }}

            />
            <Stack.Screen name="addreport" component={AddReport}
                options={{
                    title: '',
                    headerShown: false
                }}

            />
            <Stack.Screen name="editreport" component={EditReport}
                options={{
                    title: '',
                    headerShown: false
                }}

            />
            <Stack.Screen name="addExpense" component={AddExpense}
                options={{
                    title: '',
                    headerShown: false
                }}

            />
            <Stack.Screen name="forklift-vehicle" component={VehicleData}
                options={{
                    title: '',
                    headerShown: false
                }}

            />
            <Stack.Screen name="addinspection" component={AddInspection}
            options={{
               title: '',
               headerShown: false
            }}

         />
         <Stack.Screen name="editinspection" component={EditInspection}
            options={{
               title: '',
               headerShown: false
            }}

         />
          <Stack.Screen name="editfuel" component={EditFuelExpenses}
            options={{
               title: '',
               headerShown: false
            }}

         />

        </Stack.Navigator>
    )
}
const mapStateToProps = () => {
    return {}
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetch_maintanace: (page) => dispatch(fetch_maintanace_list(page)),
        fetch_all_forklifts: () => dispatch(fetch_all_forklift_list()),
        fetch_vehicle_list: (page) => dispatch(fetch_forklift_list(page)),
        preinspection_list_api: () => dispatch(fetch_preinspection_list()),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForkLiftScreen)



