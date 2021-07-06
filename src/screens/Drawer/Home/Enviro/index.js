import React,{useEffect} from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { Header, HeaderNavIcon, HeaderNotificationIcon } from '../../../../common/Header'
import DefaultHome from './Home'
import { connect } from 'react-redux'
import {get_company_type,get_tab_type} from '../../../Drawer/Vehicle/VehicleScreen/TruckScreen/common/action'

const Stack = createStackNavigator()

const EnviroPage = ({ dispatch, ownProps,fetch_company_type,fetch_tab_type }) => {
    useEffect(() => {
        fetch_company_type({"name":"waste","option":"Waste"})
        fetch_tab_type("Truck")

        return () => fetch_company_type.remove, fetch_tab_type.remove
    }, [fetch_company_type, fetch_tab_type]);

    return (

        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            initialRouteName="enviro-home"
        >
            <Stack.Screen name="enviro-home" component={DefaultHome}
                options={{
                    title: '',
                    headerLeft: () => (<HeaderNavIcon />),
                    headerBackground: () => (<Header title="Home" />),
                    headerRight: () => (<HeaderNotificationIcon  {...ownProps} />),

                }} />

        </Stack.Navigator>

    )
}

const mapStateToProps = (state, ownProps) => {
    const { } = state
    return { ownProps };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetch_company_type: (type) => dispatch(get_company_type(type)),
        fetch_tab_type: (type) => dispatch(get_tab_type(type)),


    }
}



export default connect(mapStateToProps,mapDispatchToProps)(EnviroPage)


