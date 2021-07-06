import React from "react";
import { View } from "react-native";
import PickLocation from './Innerscreens/PickLocation'

const Location = ({ navigation, route, }) => {
    let data = route.params.profile_details
    let location = route.params.userlocation

    return (

        <View style={{ height: '100%', width: '100%' }}>
            <PickLocation navigation={navigation} route={route} client={data} locationdata={location} />
        </View>

    )
}
export default Location
