import React, { useEffect } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { Header, HeaderClientNav, HeaderNotificationIcon, HeaderBackIcon } from '../../../common/Header'
import DefaultNotification from './Notification'
import NotificationDetail from './NotificationDetail'
import { connect } from 'react-redux'
import { fetch_notify_list } from './common/action'



const Stack = createStackNavigator()

const EnviroNotification = ({ ownProps, navigation, fetch_notif_list }) => {


    useEffect(() => {
        fetch_notif_list(1)

        return () => fetch_notif_list.remove
    }, [fetch_notif_list]);

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            initialRouteName="enviro-noti"
        >
            <Stack.Screen name="enviro-noti" component={DefaultNotification}
                options={{
                    title: '',
                    headerLeft: () => (<HeaderClientNav {...ownProps} />),
                    headerBackground: () => (<Header title="Notifications" />),
                    headerRight: () => (<HeaderNotificationIcon  {...ownProps} />)
                }}

            />
            <Stack.Screen name="enviro-notificationdetail" component={NotificationDetail}
                options={{
                    title: '',
                    headerBackground: () => (<Header title="Notifications Detail" />),
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),

                }}

            />
        </Stack.Navigator>
    )
}
const mapStateToProps = (state, ownProps) => {
    const { client } = state
    return { ownProps, client };
}

const mapDispatchToProps = (dispatch) => {
    return {
        fetch_notif_list: (page) => dispatch(fetch_notify_list(page)),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EnviroNotification)






