import React, { useEffect } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { connect } from 'react-redux'
import { fetch_preinspection_list, fetch_maintanace_list, fetch_all_truck_list, fetch_fuel_list, fetch_truck_list,vehicle_list_pagination1 } from './common/action'

import Truck from './TruckScreen'
import AddTruck from './AddTruck'
import AddFuelExpense from './AddFuelExpense'
import VehicleDetail from './VehicleDetail'
import EditTruck from './EditTruck'
import EditFuelExpense from './EditFuelExpense'
import EditPreInspection from './EditPreInspection'
import AddPreInspection from './AddPreInspection'
const Stack = createStackNavigator()

const EnviroVehicleT = ({ ownProps, preinspection_list_api, truck, fetch_maintanace, fetch_fuels, fetch_all_trucks, fetch_vehicle_list }) => {
   useEffect(() => {
      preinspection_list_api()
      fetch_maintanace(1)
      fetch_all_trucks(1)
      fetch_fuels(1)
      fetch_vehicle_list(1)
      return () => preinspection_list_api.remove, fetch_maintanace.remove, fetch_fuels.remove, fetch_vehicle_list.remove
   }, [preinspection_list_api, fetch_maintanace, fetch_all_trucks, fetch_fuels, fetch_vehicle_list]);
   return (
      <Stack.Navigator
         screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
         }}
         initialRouteName="enviro-truck"
      >
         <Stack.Screen name="enviro-truck" component={Truck}
            options={{
               title: '',
               headerShown: false
            }}

         />
         <Stack.Screen name="addtruck" component={AddTruck}
            options={{
               title: '',
               headerShown: false
            }}

         />
         <Stack.Screen name="edittruck" component={EditTruck}
            options={{
               title: '',
               headerShown: false
            }}

         />
         <Stack.Screen name="addfuelExpense" component={AddFuelExpense}
            options={{
               title: '',
               headerShown: false
            }}

         />
         <Stack.Screen name="editfuelExpense" component={EditFuelExpense}
            options={{
               title: '',
               headerShown: false
            }}

         />
         <Stack.Screen name="editpreinspection" component={EditPreInspection}
            options={{
               title: '',
               headerShown: false
            }}

         />
         <Stack.Screen name="addpreinspection" component={AddPreInspection}
            options={{
               title: '',
               headerShown: false
            }}

         />
         <Stack.Screen name="enviro-vehicle" component={VehicleDetail}
            options={{
               title: '',
               headerShown: false
            }}

         />

      </Stack.Navigator>
   )
}
const mapStateProps = (state, ownProps) => {
   const { truck } = state
   return { truck, ownProps }
}

const mapDispatchToProps = (dispatch) => {
   return {
      preinspection_list_api: () => dispatch(fetch_preinspection_list()),
      fetch_maintanace: (page) => dispatch(fetch_maintanace_list(page)),
      fetch_all_trucks: (page) => dispatch(vehicle_list_pagination1(page)),
      fetch_fuels: (page) => dispatch(fetch_fuel_list(page)),
      fetch_vehicle_list: (page) => dispatch(vehicle_list_pagination1(page))


   }
}

export default connect(mapStateProps, mapDispatchToProps)(EnviroVehicleT)



