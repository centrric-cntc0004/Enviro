import React, { useEffect } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { Header, HeaderClientNav, HeaderBackIcon, HeaderNotificationIcon } from '../../../common/Header'
import DefaultClient from './components/ClientList'
import ClientProfile from './components/ClientProfile'
import Location from './components/Location'
import SalesDetails from './components/SalesDetails'
import ClientProfileC from './components/ClientProfileC'
import { connect } from 'react-redux'
import { fetch_client_list_init,fetch_temp_clients,get_asset,select_type_data ,select_location_data} from './action'
import CertificateLists from './components/CertificateLists'
import InnerFoldersite from './components/InnerFoldersite'


const Stack = createStackNavigator()

function EnviroClients({client, fetch_clients, ownProps, searchQuery ,fetch_temp_client,set_type,set_loc}) {
    useEffect(() => {
        const { temp_client_location } = client

        set_type("waste")
        fetch_clients("waste")
        fetch_temp_client("waste")
        if(temp_client_location==undefined){
            let loc={"latitude":-33.851971,"longitude":151.188341}
            set_loc(loc)

        }

        return () => fetch_clients.remove,fetch_temp_client.remove
    }, [fetch_clients, searchQuery,fetch_temp_client,set_type])


    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            initialRouteName="enviro-clients"
        >
            <Stack.Screen name="enviro-clients" component={DefaultClient}

                options={{
                    title: '',

                    headerLeft: () => (<HeaderClientNav {...ownProps} />),
                    headerBackground: () => (<Header title="Site " />),
                    headerRight: () => (<HeaderNotificationIcon {...ownProps} />)
                }}

            />
            <Stack.Screen name="clientProfile" component={ClientProfile}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="clientProfile" />),
                    headerBackground: () => (<Header title="Site Profile" />)

                }}

            />
             <Stack.Screen name="clientProfilec" component={ClientProfileC}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="clientProfile" />),
                    headerBackground: () => (<Header title="Site Profile" />)

                }}

            />
            <Stack.Screen name="Location" component={Location}
                options={{
                    title: '',
                    headerShown: false
                }}

            />
            <Stack.Screen name="SalesDetails" component={SalesDetails}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="clientProfile" />),
                    headerBackground: () => (<Header title="Sales Details" />)

                }}

            />
            <Stack.Screen name="CertificateLists" component={CertificateLists}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="clientProfile" />),
                    headerBackground: () => (<Header title="Sales Details" />)

                }}

            />
            <Stack.Screen name="InnerFoldersite" component={InnerFoldersite}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="clientProfile" />),
                    headerBackground: () => (<Header title="Sales Details" />)

                }}

            />
            
        </Stack.Navigator>
    )
}

const mapStateToProps = (state, ownProps) => {
    const { client } = state
    return { ownProps, client };
}

const mapDispatchToProps = dispatch => {
    return {
        fetch_clients: (type) => dispatch(fetch_client_list_init("waste")),
        searchQuery: (val) => dispatch(search_client_list(val)),
        fetch_temp_client:(type)=>dispatch(fetch_temp_clients("waste")),
        set_type:(type)=>dispatch(select_type_data(type)),
        set_loc:(data)=>dispatch(select_location_data(data))


    }

}

export default connect(mapStateToProps, mapDispatchToProps)(EnviroClients)



