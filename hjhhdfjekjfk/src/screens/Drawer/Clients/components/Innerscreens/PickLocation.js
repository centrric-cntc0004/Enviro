import React, { useRef, useState } from 'react'
import { View, Text, ToastAndroid, StyleSheet, TouchableOpacity, ActivityIndicator, Platform, Alert } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import Geolocation from '@react-native-community/geolocation'
import { mainBlue, mainWhite, mainBlack } from '../../../../../common/Colors'
import { connect } from 'react-redux'
import { edit_client,select_location_data } from '../../action'



const PickLocation = ({ navigation, route, client, locationdata, dispatch }) => {
    const ref_map = useRef()
    let save_btn = false
    let profile_details = route.params.profile_details
    const { selected_client } = client


    let marker_val = [{
        latitude: locationdata.latitude,
        longitude: locationdata.longitude
    }]



    const [mapLatitude, setMapLatitude] = useState(locationdata.latitude)
    const [mapLongitude, setMapLongitude] = useState(locationdata.longitude)
    const [mapMarker, setMapMarker] = useState(marker_val)
    const [btnLoader, setBtnLoader] = useState(false)

    if (profile_details.latitude !== mapLatitude || profile_details.longitude !== mapLongitude) {
        save_btn = true
    }

    const getPointer = (pointData) => {
        const { latitude, longitude } = pointData.nativeEvent.coordinate
        let marler_val = [{ latitude, longitude }]
        setMapMarker(marler_val)
        setMapLatitude(latitude)
        setMapLongitude(longitude)
    }



    const animateToLocation = (latitude, longitude) => {
        let region = {
            latitude,
            longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421

        }
        ref_map.current.animateToRegion(region, 1000)
    }

    const findCurrentLocation = () => {

        const askPermission = async () => {

            try {
                check(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
                    .then((result) => {
                        switch (result) {
                            case RESULTS.UNAVAILABLE:
                                console.log(
                                    'This feature is not available (on this device / in this context)',
                                );
                                break;
                            case RESULTS.DENIED:
                                request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION).then((result) => {
                                    console.log(JSON.stringify(result))
                                    if (result === "denied") {
                                        console.log("goback")
                                        askPermission()
                                    } else if (result === "granted") {
                                        fetchLocation()
                                    } else if (result == "blocked") {
                                        askPermission()
                                    }

                                    // …
                                });

                                console.log(
                                    'The permission has not been requested / is denied but requestable',
                                );
                                break;
                            case RESULTS.GRANTED:
                                fetchLocation()
                                console.log('The permission is granted');
                                break;
                            case RESULTS.BLOCKED:
                                openSettings().catch(() => console.warn('cannot open settings'));
                                console.log('The permission is denied and not requestable anymore');
                                break;
                        }
                    })
                    .catch((error) => {
                        // …
                    });


            } catch (error) {
                console.log(error)
            }
        }

        const fetchLocation = () => {
            try {
                Geolocation.getCurrentPosition((position) => {
                    console.log('position', position)
                    const { latitude, longitude } = position.coords
                    let marler_val = [{ latitude, longitude }]
                    setMapLatitude(latitude)
                    setMapLongitude(longitude)
                    setMapMarker(marler_val)
                    animateToLocation(latitude, longitude)
                },

                    (error) => {
                        // See error code charts below.
                        console.log(error.code, error.message);
                    },
                    { enableHighAccuracy: false, timeout: 30000, }
                );
            } catch (error) {
                Alert.alert(JSON.stringify(error))

                console.log(error)
            }
        }

        if (Platform.OS === 'ios') {
            fetchLocation()
        } else {
            askPermission() //for android
        }


    }

    const RenderMarkerPoint = () => {
        if (mapMarker.length > 0) {
            return mapMarker.map((item, key) => {
                return (
                    <MapView.Marker
                        key={key}
                        coordinate={item}
                    />
                )
            })
        } else return null

    }

    const backPress = () => {

        navigation.pop()


    }


    const saveData = () => {
        // setLoader(true)
        setBtnLoader(true)

        let image_name = "image.png" || "image.jpg"
        let form_body = new FormData()


        // if (mapMarker.length > 0) {

        //     form_body.append('location_logitude', mapMarker[0].latitude)
        //     form_body.append('location_latitude', mapMarker[0].longitude)
        // }
        // const success = () => {
        //     // setLoader(false)
        //     setBtnLoader(false)

        //     ToastAndroid.show("Updated Successfully", ToastAndroid.SHORT);
        //     navigation.pop()

        // }
        // const failed = () => {
        //     setBtnLoader(false)
        //     ToastAndroid.show("Failed ! Please try again", ToastAndroid.SHORT);
        // }
        if (mapMarker.length > 0) {

        let loc={"latitude":mapMarker[0].latitude,"longitude":mapMarker[0].longitude}
        dispatch(select_location_data(loc))
        navigation.pop()

        }


    }
    const fetch_place_details = async (data) => {
        let google_api_base = "https://maps.googleapis.com/maps/api/place/details/json?"
        let params = "input=bar&placeid=" + data.place_id + "&key=" + "AIzaSyDZg6iJJMtwscCGlu5pRrohCD9K1Vqgdas"
        let query = google_api_base + encodeURI(params)

        let queryResult = await fetch(query);
        let GeoResult = await queryResult.json()
        console.log("gggggg"+GeoResult)
        const { lat, lng } = GeoResult.result.geometry.location
        let marler_val = [{ latitude: lat, longitude: lng }]
        setMapLatitude(lat)
        setMapLongitude(lng)
        setMapMarker(marler_val)
        animateToLocation(lat, lng)
    }
    return (
        <View style={{ flex: 1 }}>
            {/* <BackToProfile navigation={navigation}  /> */}
            {/*  ---- Google Map --- */}

            <MapView
                provider={PROVIDER_GOOGLE}
                ref={ref_map}
                style={styles.mapLayout}
                onPress={pointData => getPointer(pointData)}
                initialRegion={{
                    latitude: mapLatitude,
                    longitude: mapLongitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            >
                <RenderMarkerPoint />
            </MapView>

            {/*  ---- Auto Completion Search bar --- */}
           {/*  ---- Auto Completion Search bar --- */}
           <GooglePlacesAutocomplete
                placeholder="Search"
                minLength={1}
                autoFocus={false}
                returnKeyType={'default'}
                fetchDetails={true}
                pac-container='red'
                styles={{
                    listView: {
                        backgroundColor: mainWhite,
                        borderRadius: 5,
                        flex: 1,
                        elevation: 3,
                        zIndex: 10,
                    },
                    textInputContainer: {
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                        borderRadius: 10,
                        margin: 10,
                        backgroundColor: mainWhite,
                    }
                }}
                renderDescription={row => row.description}
                onPress={(data, details = null) => {
                    fetch_place_details(data)
                }}
                getDefaultValue={() => ''}
                query={{
                    key: "AIzaSyDZg6iJJMtwscCGlu5pRrohCD9K1Vqgdas",
                    language: 'en',
                    types: 'establishment',
                    components: 'country:in',

                }}
                currentLocation={true}
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch'
                GoogleReverseGeocodingQuery={{}}
                GooglePlacesSearchQuery={{ rankby: 'distance', type: 'cafe' }}
                GooglePlacesDetailsQuery={{ fields: 'formatted_address' }}
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']}
                debounce={200}
                renderLeftButton={() =>
                    <TouchableOpacity
                        onPress={() => backPress()}
                        style={{ justifyContent: 'center', paddingLeft: 8 }}
                    >
                        <Icon name="arrow-back" color={mainBlack} size={24} />
                    </TouchableOpacity>
                }
            />

            {/* <TouchableOpacity
                onPress={() => findCurrentLocation()}
                style={{ position: 'absolute', bottom: 80, right: 20 }}>
                <View style={{ width: 60, height: 60, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff', borderRadius: 50 }}>
                    <Icon name="my-location" color='#000' size={19} />
                </View>
            </TouchableOpacity> */}



            {
                save_btn ? (
                    btnLoader ? (
                        <View style={{ height: 65, position: 'absolute', width: '100%', bottom: 0, backgroundColor: mainBlue, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size="small" color={mainWhite} />
                        </View>
                    ) : (
                            <TouchableOpacity onPress={() => saveData()} style={{ height: 65, position: 'absolute', width: '100%', bottom: 0, backgroundColor: mainBlue, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: mainWhite, fontSize: 20 }}>Save</Text>
                            </TouchableOpacity>
                        )

                ) : (null)
            }
        </View>
    )
}

const styles = StyleSheet.create({
    mapLayout: {
        position: 'absolute',
        width: '100%',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between'
    }
})

const mapStateToProps = (state) => {
    const { client } = state
    return { client }
}



export default connect(mapStateToProps)(PickLocation)
