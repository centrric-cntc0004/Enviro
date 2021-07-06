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
import FleetList from './FleetList'
import InnerFleetFolder from './InnerFleetFolder'
import { View } from 'react-native'
import AllTabs from '../common/AllTabs'
import { mainWhite } from '../../../../../common/Colors'
const Stack = createStackNavigator()

const EnviroVehicleT = ({navigation,companytypes, fetch_list, ownProps, preinspection_list_api, truck, fetch_maintanace, fetch_fuels, fetch_all_trucks, }) => {
   useEffect(() => {
      preinspection_list_api(1,"waste")
      fetch_maintanace(1,"waste")
      fetch_all_trucks(1,"waste")
      fetch_fuels(1,"waste")
      fetch_list("waste")
      return () => preinspection_list_api.remove, fetch_maintanace.remove, fetch_fuels.remove ,fetch_list.remove,fetch_all_trucks.remove
   }, [preinspection_list_api, fetch_maintanace, fetch_all_trucks, fetch_fuels,fetch_list]);
   return (
      <>
              
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
      </>
   )
}
const mapStateProps = (state, ownProps) => {
   const { companytypes } = state.vehicle__truck
   return { companytypes, ownProps }
}

const mapDispatchToProps = (dispatch) => {
   return {
      preinspection_list_api: (page,type) => dispatch(fetch_preinspection_list(page,type)),
      fetch_maintanace: (page,type) => dispatch(fetch_maintanace_list(page,type)),
       fetch_all_trucks: (page,type) => dispatch(fetch_truck_list(page,type)),
      fetch_fuels: (page,type) => dispatch(fetch_fuel_list(page,type)),
      fetch_list:(type)=>dispatch(fetch_all_truck_list(type)),


   }
}

export default connect(mapStateProps, mapDispatchToProps)(EnviroVehicleT)



