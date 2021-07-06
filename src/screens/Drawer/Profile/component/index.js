import React, { useEffect } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { Header, HeaderClientNav, HeaderNotificationIcon, HeaderBackIcon } from '../../../../common/Header'
import EditProfile from './EditProfile'
import { connect } from 'react-redux'
import {fetch_profile} from './common/action'



const Stack = createStackNavigator()

const Profile = ({ ownProps, navigation, get_profile_info}) => {


    useEffect(() => {
        get_profile_info()

        return () => get_profile_info.remove
    }, [get_profile_info]);

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            initialRouteName="enviro-profile"
        >
            <Stack.Screen name="enviro-profile" component={EditProfile}
                options={{
                    title: '',
                    headerLeft: () => (<HeaderClientNav {...ownProps} />),
                    headerBackground: () => (<Header title="Profile" />),
                    headerRight: () => (<HeaderNotificationIcon  {...ownProps} />)
                }}

            />
            
        </Stack.Navigator>
    )
}
const mapStateToProps = (state, ownProps) => {
     const { profile_enviro } = state
    return { ownProps, profile_enviro };
}

const mapDispatchToProps = (dispatch) => {
    return { 
        get_profile_info: () => dispatch(fetch_profile()),

     };
    }

export default connect(mapStateToProps, mapDispatchToProps)(Profile)






