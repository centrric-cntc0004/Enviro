import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'

import HomeScreen from './Home'
import ClientData from './Clients'
import Vehicle from './Vehicle'
import TeamScreen from './Team'
import SalesScreen from './Sales'
import IntranetScreen from './Intranet'
import ReportScreen from './Schedule'
import ProjectionScreen from './Projections'
import NotificationScreen from './Notification'
import EnviroDrawer from '../../common/Drawer'
import ProfileScreen from './Profile/component'

const Drawer = createDrawerNavigator()
const MainHome = () => {
    return (

        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={props => <EnviroDrawer {...props} />}
        >
            <Drawer.Screen name="Home" component={HomeScreen} options={{ swipeEnabled: true }} />
            <Drawer.Screen name="Clients" component={ClientData} options={{ swipeEnabled: true }} />
            <Drawer.Screen name="Vehicle" component={Vehicle} />
            <Drawer.Screen name="Team"  component={TeamScreen} />
            <Drawer.Screen name="Sales" component={SalesScreen} />
            <Drawer.Screen name="Intranet" component={IntranetScreen} />
            <Drawer.Screen name="Report" component={ReportScreen} />
            <Drawer.Screen name="Projection" component={ProjectionScreen} />
            <Drawer.Screen name="Notification" component={NotificationScreen} />
            <Drawer.Screen name="Profile" component={ProfileScreen} />








        </Drawer.Navigator>

    )
}


export default MainHome

