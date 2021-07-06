
import React, {useEffect} from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { connect } from 'react-redux'
import { fetch_preinspection_list, fetch_maintanace_list, fetch_all_truck_list, fetch_fuel_list, fetch_truck_list } from './common/action'

import Car from './CarScreen'
import AddReport from './AddReport'
import AddExpense from './AddExpense'
import DetailedVehicle from './DetailedVehicle'
import EditPreInspections from './EditPreInspections'
import AddPreInspections from './AddPreInspections'
import EditMaintenance from './EditMaintenance'
import EditFuelExpenses from './EditFuelExpenses'

const Stack = createStackNavigator()
const CarScreen = ({ ownProps, preinspection_list_api, truck, fetch_maintanace, fetch_fuels, fetch_all_trucks, fetch_vehicle_list }) => {

   useEffect(() => {
      preinspection_list_api()
      fetch_maintanace(1)
      fetch_all_trucks()
      fetch_fuels(1)
      fetch_vehicle_list(1)
      return () => preinspection_list_api.remove, fetch_maintanace.remove, fetch_fuels.remove, fetch_vehicle_list.remove
   }, [preinspection_list_api, fetch_maintanace, fetch_all_trucks, fetch_fuels, fetch_vehicle_list]);

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            initialRouteName="enviro-car"
        >
            <Stack.Screen name="enviro-car" component={Car}
                options={{
                   title: '',
                   headerShown:false

                }}
                
            />
             <Stack.Screen name="addreport" component={AddReport}
                options={{
                   title: '',
                   headerShown:false
                }}
                
            />
             <Stack.Screen name="addExpense" component={AddExpense}
                options={{
                   title: '',
                   headerShown:false
                }}
                
            />
             <Stack.Screen name="vehicledetails" component={DetailedVehicle}
            options={{
               title: '',
               headerShown: false
            }}

         />
          <Stack.Screen name="editpreinspections" component={EditPreInspections}
            options={{
               title: '',
               headerShown: false
            }}

         />
        <Stack.Screen name="addpreinspections" component={AddPreInspections}
            options={{
               title: '',
               headerShown: false
            }}

         />
          <Stack.Screen name="editmaintenance" component={EditMaintenance}
            options={{
               title: '',
               headerShown: false
            }}

         />
          <Stack.Screen name="editfuelexpense" component={EditFuelExpenses}
            options={{
               title: '',
               headerShown: false
            }}

         />
        </Stack.Navigator>
    )
}

const mapStateProps = (state, ownProps) => {
   const { cars } = state
   return { cars, ownProps }
}

const mapDispatchToProps = (dispatch) => {
   return {
      preinspection_list_api: () => dispatch(fetch_preinspection_list()),
      fetch_maintanace: (page) => dispatch(fetch_maintanace_list(page)),
      fetch_all_trucks: () => dispatch(fetch_all_truck_list()),
      fetch_fuels: (page) => dispatch(fetch_fuel_list(page)),
      fetch_vehicle_list: (page) => dispatch(fetch_truck_list(page))
   }
}


export default connect(mapStateProps, mapDispatchToProps)(CarScreen)

