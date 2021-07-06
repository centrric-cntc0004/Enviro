import React, { useEffect } from 'react'

import { createStackNavigator, CardStyleInterpolators ,createAppContainer} from '@react-navigation/stack'
import { Header, HeaderBackIcon, HeaderClientNav, HeaderNotificationIcon } from '../../../common/Header'
import { connect } from 'react-redux'
import {certificate_list, team_list,team_list_term1, all_vehicle_folders, designation_list,team_list_current } from './action'
import DefaultTeam from './components/TeamList'
import TeamProfile from './components/TeamProfile'
import AddTeam from './components/AddTeam'
import EditTeam from './components/EditTeam'
import EmployeeFiles from './components/EmployeeFiles'


const Stack = createStackNavigator()

function EnviroTeam({data,getTeamTerm, team_list_api, ownProps, all_folders, designation_list,get_certificate }) {
    
    useEffect(() => {
         team_list_api()
        // all_folders_api()
        get_certificate(1)
        designation_list()
        getTeamTerm()
        return () => team_list_api.remove,designation_list.remove,getTeamTerm.remove,get_certificate.remove
    }, [team_list_api, designation_list,getTeamTerm,get_certificate]);


    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            initialRouteName="enviro-team"
        >
            <Stack.Screen name="enviro-team" component={DefaultTeam}
                options={{
                    title: '',
                    path:"",
                    
                    headerLeft: (props) => (<HeaderClientNav {...ownProps} />),
                    headerBackground: () => (<Header title="Team" />),
                    headerRight: () => (<HeaderNotificationIcon {...ownProps} />)
                }}
                

            />
            <Stack.Screen name="TeamProfile" component={TeamProfile}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Team Profile" />)
                }}

            />
            <Stack.Screen name="AddTeam" component={AddTeam}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Add Team" />)
                }}

            />
            <Stack.Screen name="EditTeam" component={EditTeam}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Edit Team" />)
                }}

            />
            <Stack.Screen name="EmployeeFiles" component={EmployeeFiles}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Employee Files" />)
                }}

            />
             
        </Stack.Navigator>
    )
}

const mapStateProps = (state, ownProps) => {
    const { team, all_folders } = state
    return { team, ownProps, all_folders }
}

const mapDispatchToProps = (dispatch) => {
    return {
        team_list_api: () => dispatch(team_list_current()),
        getTeamTerm: () => dispatch(team_list_term1()),

        //  all_folders_api: () => dispatch(all_vehicle_folders()),
        designation_list: () => dispatch(designation_list()),
        get_certificate: (id) => dispatch(certificate_list(id)),


    }
}


  export default connect(mapStateProps, mapDispatchToProps,)(EnviroTeam)


