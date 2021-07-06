import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/dist/MaterialIcons';
import Icon1 from 'react-native-vector-icons/MaterialIcons';
import BackNavIcon from './BackNavIcon'
import { NavigationConsumer } from '../screens/Drawer/Home/index'
import { mainWhite, mainGrey, mainBlue, darkBlue } from './Colors'



let width = Dimensions.get('window').width
let height = Dimensions.get('window').height
let a = 0
const Header = ({ title }) => {
    return (
        <View style={styles.containerStyle} >
            <View style={styles.sliderContainerStyle} >
               
                    <Text style={{marginLeft:20, color: '#000', textAlign: 'center', fontSize: 18,marginBottom:8 }}>{title}</Text>

            </View>
        </View>
    )
}




const styles = StyleSheet.create({
    containerStyle: {
        alignSelf: 'center',
        width: width,
        overflow: 'hidden',
        height: 65,
        zIndex: 65,
        backgroundColor: mainWhite

    },
    riderRatingContainer: {
        alignSelf: 'center',
        width: width,
        overflow: 'hidden',
        height: 230,
        zIndex: 100,
        paddingTop: 20,
        backgroundColor: '#000'
    },
    sliderContainerStyle: {
        borderRadius: width,
        paddingLeft: 40,
        marginTop:13,
        flexDirection: 'row'

    },
    slider: {
        width: width,
        position: 'absolute',
        bottom: 0,

    }
});

const HeaderNavIcon = () => {
    return (
        <NavigationConsumer>
            {navValues => {

                if (navValues) {
                    const { drawerNavigation } = navValues
                    return (
                        <TouchableOpacity style={{ paddingLeft: 15, marginTop: 5 }} onPress={() => drawerNavigation.toggleDrawer()}>
                            <Icon name="menu" size={30} color="#000" />
                        </TouchableOpacity>
                    )
                } else return null

            }}
        </NavigationConsumer>
    )
}

const HeaderNotificationIcon = ({ navigation }) => {

    return (

        <View style={{ paddingRight: 10, marginTop: 5 }} >

            {
                a > 0 ? (
                    <View style={{ position: 'absolute', zIndex: 10, right: 5, height: 18, width: 18, borderRadius: 9, backgroundColor: mainBlue, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: mainWhite, fontSize: 12, fontWeight: 'bold' }}>{a}</Text>
                    </View>
                ) : (null)
            }
            <TouchableOpacity onPress={() => navigation.navigate("Notification")}
                style={{ justifyContent: 'center', alignItems: 'center', width: 40, height: 40, borderRadius: 40, backgroundColor: mainWhite, borderWidth: 0.3, borderColor: darkBlue }}>
                <Icon1 name="notifications-active" size={18} color={mainGrey} />
            </TouchableOpacity>
        </View>

    )
}


const HeaderBackIcon = (props) => {
    return (
        <BackNavIcon {...props} />
    )
}

const HeaderClientNav = ({ navigation }) => {
    return (
        <TouchableOpacity style={{ paddingLeft: 15 }} onPress={() => navigation.toggleDrawer()}>
            <Icon name="menu" size={30} color="#000" />
        </TouchableOpacity>
    )
}


export {
    Header,
    HeaderNavIcon,
    HeaderClientNav,
    HeaderNotificationIcon,
    HeaderBackIcon

}

