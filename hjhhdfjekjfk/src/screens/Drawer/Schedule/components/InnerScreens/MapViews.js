import React, { useRef } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { mainWhite } from '../../../../../common/Colors'

const MapViews = ({ navigation }) => {
    const ref_map = useRef()


    return (
        <TouchableOpacity

            style={{ height: 150, borderRadius: 20, backgroundColor: mainWhite, }}
        >
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapLayout}
                ref={ref_map}
                initialRegion={{
                    latitude: 10.111171149284564,
                    longitude: 76.45263541353714,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude: 10.111171149284564, longitude: 76.45263541353714 }}
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
