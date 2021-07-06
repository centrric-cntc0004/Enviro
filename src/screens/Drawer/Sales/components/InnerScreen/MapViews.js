import React, { useRef } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { mainWhite } from '../../../../../common/Colors'
import { connect } from 'react-redux'

const MapViews = ({ navigation, data }) => {
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
                    latitude: data.latitude,
                    longitude: data.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude: data.latitude, longitude: data.longitude }}
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

const mapStateProps = (state) => {
    const { selected_client, job_performance_detail } = state.sales_enviroWaste
    return { selected_client, job_performance_detail }

}



export default connect(mapStateProps)(MapViews)
