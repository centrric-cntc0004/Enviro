import React, { useRef } from 'react'
import { StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native'
// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps"
import { mainWhite } from '../../../../../common/Colors'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome5'

let width = Dimensions.get('window').width

const MapViews = ({ navigation, details, data, client }) => {
    const { temp_client_location } = client
    console.log("kjhjh" + JSON.stringify(temp_client_location))
    const ref_map = useRef()

    const mapPageNavigation = () => {

        navigation.navigate('Location', {
            profile_details: data,
            userlocation: temp_client_location
        })
    }

    return (
        <TouchableOpacity
            onPress={() =>mapPageNavigation() }
            style={{ marginLeft: 10, height: 150, borderRadius: 20, backgroundColor: mainWhite, }}
        >
            <Image style={{ alignSelf: 'center', width: width, height: 150 }} source={{ uri: `https://maps.googleapis.com/maps/api/staticmap?center=${temp_client_location.latitude},${temp_client_location.longitude}&size=600x600&scale=1&maptype=roadmap&markers=color:red|label&key=AIzaSyDZg6iJJMtwscCGlu5pRrohCD9K1Vqgdas` }} />

            {/* <MapView
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
            </MapView> */}
            {/* <GoogleStaticMap
            style={styles.mapLayout}
            latitude={temp_client_location.latitude} 
                    longitude= {temp_client_location.longitude}
            zoom={13}
            size={{ width: 300, height: 550 }}
            apiKey={'AIzaSyDZg6iJJMtwscCGlu5pRrohCD9K1Vqgdas'}
        /> */}

            {/* <GoogleStaticMap
  center={{
    latitude: temp_client_location.latitude,
    longitude: temp_client_location.longitude
  }}
  style={styles.mapLayout}
  zoom={10}
  size={{
      
    width: width,
    height: 150,
  }}
  apiKey="AIzaSyDZg6iJJMtwscCGlu5pRrohCD9K1Vqgdas"
  markers={[
    {
      scale: 2,
      locations: [
        {
          latitude:temp_client_location.latitude,
          longitude: temp_client_location.longitude
        }
      ],
      icon: 
    }, {
      locations: ['London bridge'],
      label: 'B',
      color: 'orange'
    }
  ]}
/> */}

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


