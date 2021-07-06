import React, { useEffect } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { Header, HeaderClientNav, HeaderNotificationIcon, HeaderBackIcon } from '../../../common/Header'
import DefaultProjection from './Projection'
import OhsDetail from './OhsDetail'
import { connect } from 'react-redux'
import { fetch_news_list } from './common/actions'


const Stack = createStackNavigator()

const EnviroProjection = ({ ownProps, fetch_news_data }) => {


    useEffect(() => {
        fetch_news_data(1)

        return () => fetch_news_data.remove
    }, [fetch_news_data]);

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
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(EnviroProjection)






