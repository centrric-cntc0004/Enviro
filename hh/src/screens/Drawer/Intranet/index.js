import React, { useEffect } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { Header, HeaderClientNav, HeaderBackIcon, HeaderNotificationIcon } from '../../../common/Header'
import { connect } from 'react-redux'
import DefaultIntranet from './components/Intranets'
import IntranetFolders from './components/IntranetFolders'
import { fetch_folders_files ,fetch_ohs_folders_files} from './components/common/action'

const Stack = createStackNavigator()

function Intranet({ ownProps, fetch_inner_data }) {

    
    useEffect(() => {
        fetch_inner_data()

        return () => fetch_inner_data.remove
    }, [fetch_inner_data]);

    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            initialRouteName="enviro-intranet"
        >
            <Stack.Screen name="enviro-intranet" component={DefaultIntranet}

                options={{
                    title: '',

                    headerLeft: () => (<HeaderClientNav {...ownProps} />),
                    headerBackground: () => (<Header title="Intranet" />),
                    headerRight: () => (<HeaderNotificationIcon {...ownProps} />)
                }}

            />
            <Stack.Screen name="enviro-Folders" component={IntranetFolders}

                options={{
                    title: '',

                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Intranet" />),
                    headerRight: () => (<HeaderNotificationIcon {...ownProps} />)
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
        fetch_inner_data: () => dispatch(fetch_ohs_folders_files()),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Intranet)








