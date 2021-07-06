import React, { useRef } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { mainWhite } from '../../../../../common/Colors'



const MapViews = ({ navigation, details, data }) => {
    const ref_map = useRef()

    const mapPageNavigation = () => {

        navigation.navigate('Location', {
            profile_details: data,
            userlocation: details
        })
    }

    return (
        <TouchableOpacity
            // onPress={() => mapPageNavigation()}
            style={{ marginLeft: 10, height: 150, borderRadius: 20, backgroundColor: mainWhite, }}
        >
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapLayout}
                ref={ref_map}
                initialRegion={{
                    latitude: details.latitude,
                    longitude: details.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude: details.latitude, longitude: details.longitude }}
                    title={""}
                    description={" "}
                />
            </MapView>
        </TouchableOpacity>


    )
}

const styles = StyleSheet.create({
    mapLayout: {
        position: 'absolute',
        width: '100%',
        height: 150,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    }
})

export default MapViews
