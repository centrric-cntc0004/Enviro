import React, { useRef } from 'react'
import { StyleSheet, TouchableOpacity } from 'react-native'
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { mainWhite } from '../../../../../common/Colors'
import { connect } from 'react-redux'



const MapViews = ({ navigation, details, data ,client}) => {
    const { temp_client_location } = client
    console.log("kjhjh"+JSON.stringify(temp_client_location))

    const ref_map = useRef()

    const mapPageNavigation = () => {

        navigation.navigate('Location', {
            profile_details: data,
            userlocation: temp_client_location
        })
    }

    return (
        <TouchableOpacity
             onPress={() => mapPageNavigation()}
            style={{ marginLeft: 10, height: 150, borderRadius: 20, backgroundColor: mainWhite, }}
        >
            <MapView
                provider={PROVIDER_GOOGLE}
                style={styles.mapLayout}
                ref={ref_map}
                initialRegion={{
                    latitude: temp_client_location.latitude,
                    longitude: temp_client_location.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <Marker
                    coordinate={{ latitude: temp_client_location.latitude, longitude: temp_client_location.longitude }}
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

const mapStateToProps = (state) => {
    const { client } = state
    return { client }
}



export default connect(mapStateToProps)(MapViews)


