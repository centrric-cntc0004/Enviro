import React, { useEffect } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { Header, HeaderClientNav, HeaderNotificationIcon, HeaderBackIcon } from '../../../common/Header'
import DefaultProjection from './Projection'
import OhsDetail from './OhsDetail'
import { connect } from 'react-redux'
import { fetch_news_list ,fetch_notify_list} from './common/actions'
import NotificationDetail from './NotificationDetail'
import InnerFolder from './InnerFolder'


const Stack = createStackNavigator()

const EnviroProjection = ({ ownProps, fetch_news_data,fetch_notif_list }) => {


    useEffect(() => {
        fetch_news_data(1)
        fetch_notif_list(1)

        return () => fetch_news_data.remove,fetch_notif_list.remove
    }, [fetch_news_data,fetch_notif_list]);

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            initialRouteName="enviro-team"
        >
            <Stack.Screen name="enviro-team" component={DefaultProjection}
                options={{
                    title: '',
                    headerLeft: () => (<HeaderClientNav {...ownProps} />),
                    headerBackground: () => (<Header title="OH & S" />),
                    headerRight: () => (<HeaderNotificationIcon {...ownProps} />)
                }}

            />
            <Stack.Screen name="enviro-detail" component={OhsDetail}
                options={{
                    title: '',
                    headerBackground: () => (<Header title="Ohs Detail" />),
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),

                }}

            />
            <Stack.Screen name="enviro-noficationdetail" component={NotificationDetail}
                options={{
                    title: '',
                    headerBackground: () => (<Header title="Notification Detail" />),
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),

                }}

            />
              <Stack.Screen name="innerfolder" component={InnerFolder}
                options={{
                    title: '',
                    headerBackground: () => (<Header title="Folders" />),
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
        fetch_news_data: (page) => dispatch(fetch_news_list(page)),
        fetch_notif_list: (page) => dispatch(fetch_notify_list(page)),

    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EnviroProjection)






