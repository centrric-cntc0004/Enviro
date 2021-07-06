import React, { useEffect } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import ForkLift from './ForkLiftScreen'
import {fetch_preinspection_list,vehicle_list_pagination, fetch_maintanace_list, fetch_all_forklift_list, fetch_forklift_list } from './common/action'
import { connect } from 'react-redux'
import EditReport from './EditReport'
import VehicleData from './VehicleData'
import AddReport from './AddReport'
import AddExpense from './AddExpense'
import AddInspection from './AddInspection'
import EditInspection from './EditInspection'
import EditFuelExpenses from './EditFuelExpenses'
import FleetList from './FleetList'
import InnerFleetFolder from './InnerFleetFolder'

const Stack = createStackNavigator()

const ForkLiftScreen = ({navigation, companytypes,tabtypes, fetch_vehicles_list, preinspection_list_api,fetch_maintanace, fetch_all_forklifts, fetch_vehicle_list }) => {
    useEffect(() => {
        

        preinspection_list_api(1,companytypes.name,tabtypes)
        fetch_maintanace(1,companytypes.name,tabtypes)
        fetch_all_forklifts(companytypes.name,tabtypes)
        fetch_vehicle_list(1,companytypes.name,tabtypes)
        fetch_vehicles_list(1,companytypes.name,tabtypes)
        return () => fetch_maintanace.remove, fetch_vehicle_list.remove,preinspection_list_api.remove,fetch_vehicles_list.remove

    }, [fetch_maintanace, fetch_all_forklifts, fetch_vehicle_list,preinspection_list_api,fetch_vehicles_list])

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
          <Stack.Screen name="FleetList" component={FleetList}
            options={{
               title: '',
               headerShown: false
            }}

         />
           <Stack.Screen name="InnerFleetFolder" component={InnerFleetFolder}
            options={{
               title: '',
               headerShown: false
            }}

         />

        </Stack.Navigator>
    )
}
const mapStateToProps = (state) => {
    const { companytypes,tabtypes} = state.vehicle__truck

    return {companytypes,tabtypes}
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetch_maintanace: (page,type,tab) => dispatch(fetch_maintanace_list(page,type,tab)),
        fetch_all_forklifts: (type,tab) => dispatch(fetch_all_forklift_list(type,tab)),
        fetch_vehicle_list: (page,type,tab) => dispatch(fetch_forklift_list(page,type,tab)),
        preinspection_list_api: (page,type,tab) => dispatch(fetch_preinspection_list(page,type,tab)),
        fetch_vehicles_list: (page,type,tab) => dispatch(vehicle_list_pagination(page,type,tab))


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ForkLiftScreen)



