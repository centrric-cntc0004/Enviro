import React from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { Header, HeaderNavIcon, HeaderNotificationIcon } from '../../../../common/Header'
import DefaultHome from './Home'
import { connect } from 'react-redux'


const Stack = createStackNavigator()

const EnviroPage = ({ dispatch, ownProps }) => {


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




export default connect(mapStateToProps)(EnviroPage)


