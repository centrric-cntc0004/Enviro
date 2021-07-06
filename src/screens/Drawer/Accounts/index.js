import React, { useEffect } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { Header, HeaderClientNav, HeaderBackIcon, HeaderNotificationIcon } from '../../../common/Header'
import { connect } from 'react-redux'
import DefaultAccounts from './components/AccountsMain'
import AccountFolder from './components/AccountFolder'
const Stack = createStackNavigator()

function Accounts({ ownProps, fetch_inner_data }) {



    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            initialRouteName="enviro-accounts"
        >
            <Stack.Screen name="enviro-accounts" component={DefaultAccounts}

                options={{
                    title: '',

                    headerLeft: () => (<HeaderClientNav {...ownProps} />),
                    headerBackground: () => (<Header title="Accounts" />),
                    headerRight: () => (<HeaderNotificationIcon {...ownProps} />)
                }}

            />
            <Stack.Screen name="accountFolder" component={AccountFolder}

                options={{
                    title: '',

                    headerLeft: (props) => (<HeaderBackIcon {...props} page="clientProfile" />),
                    headerBackground: () => (<Header title="Accounts Folder" />)
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

export default connect(mapStateToProps, mapDispatchToProps)(Accounts)








