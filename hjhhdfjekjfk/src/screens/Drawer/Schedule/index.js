import React, { useEffect } from 'react'
import { createStackNavigator, CardStyleInterpolators } from '@react-navigation/stack'
import { Header, HeaderClientNav, HeaderNotificationIcon, HeaderBackIcon } from '../../../common/Header'

import DefaultReport from './components/Schedule'
import DefaultCalendar from './components/Calendar'
import Detail from './components/Details'
import AddMedia from './components/AddMedia'
import Jobcard from './components/JobCard'
import { connect } from 'react-redux'
import AddImage from './components/AddImage'
import { schedule_list, select_date, complete_schedule_list, daywise_schedule_list, fetch_comment_list } from './components/common/action'

const Stack = createStackNavigator()
let date2 = ""


const EnviroReport = ({ ownProps, fetch_schedule_data, dispatch }) => {
    var day = new Date().getDate()
    var month = new Date().getMonth() + 1
    var year = new Date().getFullYear()
    let date = day + '-' + month + '-' + year
    let newdate = date.split("-").reverse().join("-");
    if (day.toString().length <= 1) {
        day = '0' + day;
        date2 = year + '-' + month + '-' + day;
       

    }
    if (month.toString().length <= 1) {
        month = '0' + month;
        date2 = year + '-' + month + '-' + day;
      
    } else {
        date2 = year + '-' + month + '-' + day;
       


    }

    useEffect(() => {
        dispatch(schedule_list(date2, "waste"))
        dispatch(complete_schedule_list("waste"))
        dispatch(select_date(date2))
        dispatch(daywise_schedule_list(date2, date2, "waste"))


    }, []);
    return (
        <Stack.Navigator
            screenOptions={{
                cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            }}
            initialRouteName="enviro-report"
        >
            <Stack.Screen name="enviro-report" component={DefaultReport}
                options={{
                    title: '',
                    headerLeft: () => (<HeaderClientNav {...ownProps} />),
                    headerBackground: () => (<Header title="Scheduling" />),
                    headerRight: () => (<HeaderNotificationIcon {...ownProps} />)
                }}

            />
            <Stack.Screen name="enviro-calendar" component={DefaultCalendar}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Scheduling" />)
                }}

            />
            <Stack.Screen name="enviro-detail" component={Detail}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Scheduling" />)
                }}

            />
            <Stack.Screen name="enviro-media" component={AddMedia}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Scheduling" />)
                }}

            />
            <Stack.Screen name="enviro-jobcard" component={Jobcard}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Scheduling" />)
                }}

            />
            <Stack.Screen name="enviro-addimage" component={AddImage}
                options={{
                    title: '',
                    headerLeft: (props) => (<HeaderBackIcon {...props} page="teamProfile" />),
                    headerBackground: () => (<Header title="Scheduling" />)
                }}

            />
        </Stack.Navigator>
    )
}
const mapStateToProps = (state, ownProps) => {
    const { client } = state
    return { ownProps, client };
}




export default connect(mapStateToProps)(EnviroReport)








