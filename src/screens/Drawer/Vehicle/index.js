
import React, { useEffect } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { Header, HeaderNotificationIcon, HeaderClientNav, HeaderBackIcon } from '../../../common/Header'

import VehicleScreen from './VehicleScreen'
import { get_company_type, get_tab_type ,get_sub_header} from './VehicleScreen/TruckScreen/common/action'
import { connect } from 'react-redux'
import TruckScreen from './VehicleScreen/TruckScreen'
import CarScreen from './VehicleScreen/CarScreen/CarScreen'
import VehicleDetail from './VehicleScreen/TruckScreen/VehicleDetail'

const Stack = createStackNavigator()

const EnviroTruck = ({ ownProps, fetch_company_type, fetch_tab_type,fetch_sub_type }) => {
    useEffect(() => {
        fetch_company_type({"name":"waste","option":"Waste"})
        fetch_tab_type("Truck")
        fetch_sub_type(['Truck', 'Car', 'Forklift'])

        return () => fetch_company_type.remove, fetch_tab_type.remove,fetch_sub_type.remove
    }, [fetch_company_type, fetch_tab_type,fetch_sub_type]);
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            initialRouteName="enviro-truck"
        >

            <Stack.Screen name="enviro-truck" component={VehicleScreen}

                options={{
                    title: '',

                    headerLeft: () => (<HeaderClientNav {...ownProps} />),
                    headerBackground: () => (<Header title="Vehicle" />),
                    headerRight: () => (<HeaderNotificationIcon {...ownProps} />)
                }}

            />
              
              <Stack.Screen name="enviro-vehicle" component={VehicleDetail}
            options={{
               title: '',
               headerLeft: (props) => (<HeaderBackIcon {...props} page="clientProfile" />),
                    headerBackground: () => (<Header title="Vehicle Detail" />)
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
        fetch_company_type: (type) => dispatch(get_company_type(type)),
        fetch_tab_type: (type) => dispatch(get_tab_type(type)),
        fetch_sub_type: (data) => dispatch(get_sub_header(data))


    }
}

export default connect(mapStateProps, mapDispatchToProps)(EnviroTruck)


