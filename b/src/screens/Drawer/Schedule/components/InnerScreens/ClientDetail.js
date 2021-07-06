import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, TextInput, Linking, TouchableOpacity, Platform ,FlatList,Dimensions} from 'react-native'
import { lightGrey, mainBlue, mainWhite, mainGrey, textBlue, lightGreen, textlightgrey } from '../../../../../common/Colors'
import { ClientImage } from '../../../../../common/Images'
import Job from './Job'
import { BASE_IMAGE_URL } from '../../../../../store/endpoint'
import { job_card_list } from '../common/action'
import { connect } from 'react-redux'
let width = Dimensions.get('window').width / 6



const ClientData = ({ navigation, route, dispatch, schedule_enviro }) => {
    const { selected_client } = schedule_enviro
    console.log("selec"+JSON.stringify(selected_client))
    let data=[90,8989]
    const RenderContacts = () => {
        let client_id = ''
        let client_name = ''
        let client_email = ''
        let date_joined = ''
        let client_building = ''
        let client_location = ''
        let client_latitude = ''
        let client_longitude = ''
        let client_image = ''
        let contact_number = ""
        if (selected_client) {
            client_id = selected_client.client.client_id
            client_name = selected_client.client.client_name
            client_email = selected_client.client.client_email
            date_joined = selected_client.client.date_joined
            client_building = selected_client.client.building
            client_location = selected_client.client.place
            client_latitude = selected_client.client.location_latitude
            client_longitude = selected_client.client.location_logitude
            contact_number = selected_client.client.company_mobile_number

        }
        // if (details.location_logitude !== "" || undefined && details.location_latitude !== "" || undefined) {
        //     // user_location={"latitude":details.location_latitude,"longitude":details.location_logitude}
        //     user_location = { "latitude": 10.676676, "longitude": 79.09909889 }

        // } else {
        //     user_location = { "latitude": 10.676676, "longitude": 79.09909889 }

        // }
        const [ClientId, setClientId] = useState(client_id)
        const [ClientName, setClientName] = useState(client_name)
        const [ClientFrom, setClientFrom] = useState(date_joined)
        const [ClientEmail, setClientEmail] = useState(client_email)
        const [ClientBuilding, setClientBuilding] = useState(client_building)
        const [ClientLocation, setClientLocation] = useState(client_location)


        let edit_btn_status = false
        let data = {
            client_id: ClientId,
            client_name: ClientName,
            client_email: ClientEmail,
            date_joined: ClientFrom,
            client_place: ClientLocation,
            client_building: ClientBuilding,

        }
        if (selected_client) {
            if (selected_client.dp) {
                var profPic = { uri: BASE_IMAGE_URL + selected_client.dp };
                console.log(profPic)
            } else {
                var profPic = ClientImage;

            }
        }

        const call_dial = () => {
            if (contact_number !== null && contact_number.length >= 8) {
                let phoneNumber = contact_number;
                if (Platform.OS !== 'android') {
                    phoneNumber = `telprompt:${contact_number}`;
                } else {
                    phoneNumber = `tel:${contact_number}`;
                }
                Linking.openURL(phoneNumber);
            } else {
                // Alert.alert('Number is Empty');
            }
        }
        const send_email = () => {
            if (ClientEmail !== null) {
                Linking.openURL('mailto:' + ClientEmail + '?subject=&body=');
            }
            else {
                // Alert.alert('Email is Empty');
            }
        }

        const call_api_jobcard = () => {
            console.log("jobhggggggggggggggg"+JSON.stringify(selected_client))
            // dispatch(job_card_list(selected_client.quote_id))
            dispatch(job_card_list(706))

             navigation.navigate("enviro-jobcard", { items: selected_client })
        }

        return (
            <View style={{ flex: 1, backgroundColor: mainWhite }}>
                <View style={{ marginTop: '2%' }}>

                    <TouchableOpacity onPress={() => call_api_jobcard()}
                        style={{ marginLeft: "65%", justifyContent: 'center', alignItems: 'center', borderRadius: 20, width: 90, height: 30, borderWidth: 0.3, borderColor: mainGrey }} >
                        <Text>Job Card</Text>
                    </TouchableOpacity>
                    
                </View>
                <View style={{ flex: 2.5, marginTop: '3%', flexDirection: 'row', height: 80 }}>
                    <View style={{ flex: 0.3 }} />
                    <View style={{ flex: 1, }}>
                        <Image style={{ height: 80, width: 80, borderRadius: 5 }} source={ClientImage} />
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={{ paddingHorizontal: 20, flexDirection: 'column', flex: 2.2, }}>
                        <View style={{ flex: 0.1, flexDirection: 'row', marginTop: 5, }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Client Id</Text>
                            </View>
                            <View style={{ flex: 0.05 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center', width: 150 }}
                                    autoCapitalize='none'
                                    placeholder="Client Id"
                                    editable={false}
                                    value={ClientId}
                                    numberOfLines={1}
                                    onChangeText={txt => setClientId(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', marginTop: 30 }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Client Name</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center', width: 150 }}
                                    autoCapitalize='none'
                                    placeholder="Client Name"
                                    value={ClientName}
                                    numberOfLines={1}
                                    onChangeText={txt => setClientName(txt)}
                                />
                            </View>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 3.3, backgroundColor: mainWhite, height: 100, marginTop: 10, marginBottom: 10 }}>

                    <View style={{ paddingHorizontal: 20, flexDirection: 'column', flex: 2, }}>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.5, }}>
                                <Text style={styles.textStyle} >Client Email</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center', color: mainGrey, width: 150 }}>: {ClientEmail}</Text>


                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.5, }}>
                                <Text style={styles.textStyle} >Building</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput numberOfLines={1}
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center', width: 150 }}
                                    autoCapitalize='none'
                                    value={ClientBuilding}
                                    placeholder="Building"
                                    placeholderTextColor={textlightgrey}
                                    onChangeText={txt => setClientBuilding(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.5, }}>
                                <Text style={styles.textStyle} >Location</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput numberOfLines={1}
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center', width: 150 }}
                                    autoCapitalize='none'
                                    value={ClientLocation}
                                    placeholder="Location"
                                    onChangeText={txt => setClientLocation(txt)}
                                />
                            </View>
                        </View>

                    </View>

                </View>
                <Job navigation={navigation} details1={selected_client} />
                {selected_client ? (
                                <FlatList  style={{backgroundColor:mainWhite}}
                                    horizontal
                                    data={selected_client.gallery}
                                    renderItem={({ item: rowData }) => {
                                        return (

                                            <Image style={{ marginLeft: 20, width: width, height: width }}
                                                source={{ uri: "https://deep.envirowasteadmin.com.au" + rowData.file }} />
                                        )
                                    }}
                                />
                            ) : (
                                    null
                                )} 
                                {selected_client ? (
                                    <View>
                                        {selected_client.image!==null?(
                                            <View style={{marginTop:10, flexDirection:'column',backgroundColor:mainWhite}}>
                                            <Text style={{paddingLeft:10,fontSize:14}}>Signature</Text>
                                            <Image style={{ marginLeft: 20, width: width, height: width }}
                                                source={{ uri: BASE_IMAGE_URL + selected_client.image }} />
                                       </View>
                                        ):(
                                            null
                                        )}
                               
                                            
                           </View>
                            ) : (
                                    null
                                )}


            </View>
        )
    }

    return (

        <RenderContacts />

    )

}

const mapStateProps = (state) => {
    const { schedule_enviro } = state

    return { schedule_enviro }
}
export default connect(mapStateProps)(ClientData)


const styles = StyleSheet.create({
    topBox: {
        flex: 2,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: mainWhite,
        borderWidth: 1,
        borderColor: mainBlue,
        borderRadius: 20,
        flexDirection: 'row',
    },
    textStyle: {
        paddingTop: 10,
        color: textBlue
    },
    staticBoxStyle: {
        flex: 1,
        backgroundColor: mainWhite,
        height: 40,
    },
    editableBoxStyle: {
        flex: 1.4,
        height: 40,
        flexDirection: 'row',

    }



});

