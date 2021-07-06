import React, { useState } from 'react'
import { View, StyleSheet, Text, Image, TextInput, Linking, TouchableOpacity, Platform } from 'react-native'
import { lightGrey, mainBlue, mainWhite, mainGrey, textBlue, lightGreen, textlightgrey } from '../../../../../common/Colors'
import { ClientImage } from '../../../../../common/Images'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import MapViews from './MapViews'
import AddDetails from './AddDetails'
import PreviousSales from './PreviousSales'
import Assest from './Assest'
import { BASE_IMAGE_URL } from '../../../../../store/endpoint'
import DatePicker from 'react-native-datepicker'
let user_location = ""
import SendSMS from 'react-native-sms'
import { connect } from 'react-redux'
import Dropdown from './Dropdown'





const ProfileData = ({ navigation, client }) => {

    const RenderContacts = () => {
        const { selected_client, typedata } = client

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
        let client_address = ""
        let client_postcode = ""
        let client_contact = ""
        let client_phone = ""
        let induction = ""
        let induction_req = ""
        let purchaseno = ""
        if (selected_client.id) {

            client_image = selected_client.dp_thumbnail
            client_id = selected_client.client_id
            client_name = selected_client.client_name
            client_email = selected_client.client_email
            date_joined = selected_client.date_joined
            client_building = selected_client.building
            client_location = selected_client.place
            client_latitude = selected_client.location_latitude
            client_longitude = selected_client.location_logitude
            contact_number = selected_client.site_contact_mob
            client_address = selected_client.site_address
            client_postcode = selected_client.site_post_code
            client_contact = selected_client.site_contact_person
            client_phone = selected_client.site_phone_no
            induction = selected_client.induction_type
            induction_req = selected_client.induction_required_str
            purchaseno = selected_client.invoice_purchase_no


        }
        if (selected_client.location_logitude !== null &&
            // || selected_client.location_logitude !==undefined ||
            // selected_client.location_logitude !== "" || 
            selected_client.location_latitude !== null ||
            selected_client.location_latitude !== undefined ||
            selected_client.location_latitude !== "") {
            //    user_location={"latitude":parseFloat(selected_client.location_latitude),"longitude": parseFloat(selected_client.location_logitude)}
            user_location = { "latitude": 10.676676, "longitude": 79.09909889 }

        } else {
            user_location = { "latitude": 10.676676, "longitude": 79.09909889 }

        }
        const [ClientId, setClientId] = useState(client_id)
        const [ClientName, setClientName] = useState(client_name)
        const [ClientFrom, setClientFrom] = useState(date_joined)
        const [ClientEmail, setClientEmail] = useState(client_email)
        const [ClientBuilding, setClientBuilding] = useState(client_building)
        const [ClientAddress, setClientAddress] = useState(client_address)
        const [ClientPost, setClientPost] = useState(client_postcode)
        const [ClientContact, setClientContact] = useState(client_contact)
        const [ClientPhone, setClientPhone] = useState(client_phone)
        const [ClientNumber, setClientNumber] = useState(contact_number)
        const [ClientInduc, setClientInduc] = useState(induction)
        const [ClientInducR, setClientInducR] = useState(induction_req)
        const [invoicePurc, setinvoicePurc] = useState(purchaseno)

        let inductionrequired = [{ "value": "NO" }, { "value": "YES" }, { "value": "NOT APPLICABLE" }]
        let dropdownData2 = []
        if (inductionrequired) {
            inductionrequired.map((item) => {
                const { value } = item
                return (
                    dropdownData2.push(value)
                )
            })
        }
        const selectData2 = (index) => {
            setClientInducR(dropdownData2[index])
        }


        let edit_btn_status = false
        let data = {
            client_id: ClientId,
            client_name: ClientName,
            client_email: ClientEmail,
            date_joined: ClientFrom,
            client_place: "",
            client_building: ClientBuilding,
            location_logitude: selected_client.location_logitude,
            location_latitude: selected_client.location_latitude,
            site_address: ClientAddress,
            site_post_code: ClientPost,
            site_phone_no: ClientPhone,
            site_contact_person: ClientContact,
            site_contact_mob: ClientNumber,
            induction_type: ClientInduc,
            induction_required: ClientInducR,
            invoice_purchase_no: invoicePurc



        }
        if (selected_client) {
            if (selected_client.dp_thumbnail) {
                var profPic = { uri: selected_client.dp_thumbnail };
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

        const call_sendsms = () => {
            SendSMS.send({
                body: '',
                recipients: [contact_number],
                successTypes: ['sent', 'queued'],
                allowAndroidSendWithoutReadPermission: true
            }, (completed, cancelled, error) => {

                console.log('SMS Callback: completed: ' + completed + ' cancelled: ' + cancelled + 'error: ' + error);

            });
        }
        return (
            <View style={{ flex: 1, backgroundColor: lightGrey }}>
                <View style={{ flex: 2.5, marginTop: '7%', flexDirection: 'row', height: 80 }}>
                    <View style={{ flex: 0.3 }} />
                    <View style={{ flex: 1, }}>
                        <Image style={{ height: 80, width: 80, borderRadius: 5 }} source={profPic} />
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={{ paddingHorizontal: 20, flexDirection: 'column', flex: 2.5, }}>
                        {/* <View style={{ flex: 0.8, flexDirection: 'row', marginTop: 5, }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.textStyle} >Site Name</Text>
                            </View>
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    placeholder="Site Name"
                                    value={ClientName}
                                    editable={false}

                                    numberOfLines={1}
                                    onChangeText={txt => setClientName(txt)}
                                />
                            </View>
                        </View> */}
                        {/* <View style={{ flex: 0.5, flexDirection: 'row', marginTop: 10 }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Site Email</Text>
                            </View>
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center', width: 150 }}
                                    autoCapitalize='none'
                                    placeholder="Site Email"
                                    value={ClientEmail}
                                    editable={false}

                                    numberOfLines={1}
                                    onChangeText={txt => setClientEmail(txt)}
                                />
                            </View> */}
                        {/* </View> */}
                    </View>
                </View>
                <View style={{ flex: 3.3, backgroundColor: lightGrey, height: 280, marginTop: 10 }}>

                    <View style={{ paddingHorizontal: 20, flexDirection: 'column', flex: 2, }}>

                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.7, }}>
                                <Text style={styles.textStyle} >Site Name</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center', width: 150 }}
                                    autoCapitalize='none'
                                    placeholder="Site Name"
                                    value={ClientName}
                                    editable={false}

                                    numberOfLines={1}
                                    onChangeText={txt => setClientAddress(txt)}
                                />

                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.7, }}>
                                <Text style={styles.textStyle} >Site Email</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center', width: 150 }}
                                    autoCapitalize='none'
                                    placeholder="Site Email"
                                    value={ClientEmail}
                                    editable={false}

                                    numberOfLines={1}
                                    onChangeText={txt => setClientAddress(txt)}
                                />

                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.7, }}>
                                <Text style={styles.textStyle} >Site Address</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center', width: 150 }}
                                    autoCapitalize='none'
                                    placeholder="Site Address"
                                    value={ClientAddress}
                                    editable={false}

                                    numberOfLines={1}
                                    onChangeText={txt => setClientAddress(txt)}
                                />

                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.7, }}>
                                <Text style={styles.textStyle} >Site Postcode</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={ClientPost}
                                    placeholder="Site Postcode"
                                    editable={false}

                                    placeholderTextColor={textlightgrey}
                                    onChangeText={txt => setClientPost(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.7, }}>
                                <Text style={styles.textStyle} >Order Number</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={invoicePurc}
                                    placeholder="Order Number"
                                    editable={false}

                                    placeholderTextColor={textlightgrey}
                                    onChangeText={txt => setinvoicePurc(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.7, }}>
                                <Text style={styles.textStyle} >Site Contact</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={ClientContact}
                                    placeholder="Site Contact"
                                    editable={false}

                                    onChangeText={txt => setClientContact(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.7, }}>
                                <Text style={styles.textStyle} >Site Phone</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={ClientPhone}
                                    placeholder="Site Contact"
                                    keyboardType="number-pad"
                                    editable={false}

                                    onChangeText={txt => setClientPhone(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.7, }}>
                                <Text style={styles.textStyle} >Site Mobile No</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={ClientNumber}
                                    placeholder="Site Mobile No"
                                    keyboardType="number-pad"
                                    editable={false}

                                    onChangeText={txt => setClientNumber(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.7, }}>
                                <Text style={styles.textStyle} >Induction Required</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={ClientInducR}
                                    placeholder="Site Mobile No"
                                    keyboardType="number-pad"
                                    editable={false}
                                // onChangeText={txt => setClientNumber(txt)}
                                />
                                {/* 
                            <Dropdown
                                dropdown_data={dropdownData2}
                                selectData={selectData2}
                                 initialvalue={ClientInducR}

                            /> */}
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.7, }}>
                                <Text style={styles.textStyle} >Induction Type</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={ClientInduc}
                                    placeholder="Induction"
                                    onChangeText={txt => setClientInduc(txt)}
                                />
                            </View>
                        </View>

                    </View>
                    {/* {/* <View style={{ flex: 0.1, backgroundColor: lightGrey, flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1.4, backgroundColor: lightGrey }}>
                            <View style={{ flex: 4, marginTop: 5 }}>
                                <View style={{ flexDirection: 'row', flex: 4 }}>
                                    {ClientNumber !== "" || null ? (
                                        <TouchableOpacity onPress={() => call_dial()}
                                            style={{
                                                flex: 2, height: 35,
                                                backgroundColor: mainWhite, borderWidth: 0.5, borderColor: lightGreen,
                                                marginLeft: 10,
                                                marginRight: 10,
                                                alignItems: 'center', flexDirection: 'row'
                                            }}>

                                            <Icon1 style={{ paddingLeft: 10 }} name="cellphone-android" size={25} color={lightGreen} />
                                            <Text style={{ paddingLeft: 10, color: lightGreen, fontSize: 14 }} >Call</Text>
                                        </TouchableOpacity>
                                    ) : (
                                            <View
                                                style={{
                                                    opacity: 0.6,
                                                    flex: 2, height: 35,
                                                    backgroundColor: mainWhite, borderWidth: 0.5, borderColor: lightGreen,
                                                    marginLeft: 10,
                                                    marginRight: 10,
                                                    alignItems: 'center', flexDirection: 'row'
                                                }}>

                                                <Icon1 style={{ paddingLeft: 10 }} name="cellphone-android" size={25} color={lightGreen} />
                                                <Text style={{ paddingLeft: 10, color: lightGreen, fontSize: 14 }} >Call</Text>
                                            </View>
                                        )}

                                    {ClientEmail !== "" || null ? (
                                        <TouchableOpacity onPress={() => send_email()}
                                            style={{
                                                flex: 2, height: 35, backgroundColor: mainWhite, borderWidth: 0.5, borderColor: lightGreen,
                                                marginLeft: 10, marginRight: 10, alignItems: 'center', flexDirection: 'row'
                                            }}>
                                            <Icon1 style={{ paddingLeft: 10 }} name="email" size={25} color={lightGreen} />
                                            <Text style={{ paddingLeft: 10, color: lightGreen, fontSize: 14 }} >Email</Text>

                                        </TouchableOpacity>
                                    ) : (
                                            <View
                                                style={{
                                                    opacity: 0.6,
                                                    flex: 2, height: 35, backgroundColor: mainWhite, borderWidth: 0.5, borderColor: lightGreen,
                                                    marginLeft: 10, marginRight: 20, alignItems: 'center', flexDirection: 'row'
                                                }}>
                                                <Icon1 style={{ paddingLeft: 10 }} name="email" size={25} color={lightGreen} />
                                                <Text style={{ paddingLeft: 10, color: lightGreen, fontSize: 14 }} >Email</Text>

                                            </View>
                                        )}
                                    {contact_number !== "" || null ? (
                                        <TouchableOpacity onPress={() => call_sendsms()}
                                            style={{
                                                flex: 2, height: 35, backgroundColor: mainWhite, borderWidth: 0.5, borderColor: lightGreen,
                                                marginLeft: 10, marginRight: 20, alignItems: 'center', flexDirection: 'row'
                                            }}>
                                            <Icon1 style={{ paddingLeft: 10 }} name="message" size={25} color={lightGreen} />
                                            <Text style={{ paddingLeft: 10, color: lightGreen, fontSize: 14 }} >Text</Text>

                                        </TouchableOpacity>
                                    ) : (
                                            <View
                                                style={{
                                                    opacity: 0.6,
                                                    flex: 2, height: 35, backgroundColor: mainWhite, borderWidth: 0.5, borderColor: lightGreen,
                                                    marginLeft: 10, marginRight: 20, alignItems: 'center', flexDirection: 'row'
                                                }}>
                                                <Icon1 style={{ paddingLeft: 10 }} name="message" size={25} color={lightGreen} />
                                                <Text style={{ paddingLeft: 10, color: lightGreen, fontSize: 14 }} >Text</Text>

                                            </View>
                                        )}
                                </View>
                            </View>
                        </View>

                    </View> */}
                </View>
                <View style={{ marginTop: '10%' }}>
                    <MapViews navigation={navigation} details={user_location} data={selected_client} />
                </View>
                <AddDetails navigation={navigation} data={data} clientdata={selected_client} />
                {typedata === "pumps" ? (
                    <Assest navigation={navigation} clientdata={selected_client} />

                ) : (
                        null
                    )}

                <PreviousSales navigation={navigation} />

            </View>
        )
    }

    return (

        <RenderContacts />

    )

}




const mapStateToProps = (state) => {
    const { client } = state
    return { client }
}



export default connect(mapStateToProps)(ProfileData)




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
        backgroundColor: lightGrey,
        height: 40,
    },
    editableBoxStyle: {
        flex: 1,
        height: 40,
        flexDirection: 'row',

    },
    editableBoxStyle1: {
        flex: 0.8,
        height: 40,
        flexDirection: 'row',

    }



});

