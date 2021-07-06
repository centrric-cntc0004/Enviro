

import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native'
import { mainWhite, darkGrey, mainGrey, lightGrey, mainBlue } from '../../../../../common/Colors'
import { VehicleSelection } from './Innerscreen'
import DatePicker from 'react-native-datepicker'

const VehicleDetail = ({ navigation, route }) => {


    const RenderContacts = () => {
        let idnew = ""
        let registration = ""
        let vehicletype = ''
        let previousrego = ''
        let types = ''
        let year = ''
        let transmission = ''
        let fuel = ''
        let height = ''
        let width = ''

        let length = ''
        let litres = ''
        let vin_number = ''
        let axies = ''
        let duerego = ''
        let enginenumbers = ''
        if (route.params) {
            if (route.params.items) {
                idnew = route.params.items.id
                registration = route.params.items.registration
                vehicletype = route.params.items.vehicle_type
                previousrego = route.params.items.previous_rego
                types = route.params.items.types
                year = ""
                transmission = route.params.items.transmission
                fuel = route.params.items.fuel
                height = route.params.items.height
                width = route.params.items.width
                length = route.params.items.length
                litres = route.params.items.litres
                vin_number = route.params.items.vin_number
                axies = route.params.items.axies
                duerego = route.params.items.due_rego
                enginenumbers = route.params.items.engine_numbers




            }
        }







        return (

            <ScrollView style={{ flex: 1, backgroundColor: lightGrey, }}>
                <View style={{
                    flex: 1, paddingHorizontal: 20, backgroundColor: lightGrey,
                }}>
                    <View style={{ flex: 1.5, backgroundColor: lightGrey, }}>
                        <View style={{ marginTop: 25 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                {/* Top boxes  */}
                                <TouchableOpacity onPress={() => navigation.pop()}
                                    style={styles.topBox}>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text
                                            style={{ color: mainBlue, fontSize: 16 }} >Back</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ flex: 4.5 }} />
                               
                            </View>
                        </View>
                    </View>


                    <View style={{
                        flex: 7, backgroundColor: mainWhite, flexDirection: 'column',
                        borderWidth: 0.2, borderColor: darkGrey, borderRadius: 1,
                        marginTop: '8%',
                        paddingBottom: 20, height: 650
                    }}>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Vehicle</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <View style={{ flex: 4, justifyContent: 'center', }}>
                                    <Text style={{ color: mainGrey, fontSize: 14, paddingLeft: 5 }}>{registration}</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Vehicle Type</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <Text style={{ alignSelf: 'center', fontSize: 14, color: mainGrey, paddingLeft: 5 }}>{vehicletype}</Text>


                            </View>
                        </View>
                        {/* <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Previous rego</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={previousrego}
                                    editable={false}
                                // onChangeText={txt => setTime(txt)}
                                />
                            </View>
                        </View> */}
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Types</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={types}
                                    editable={false}

                                // onChangeText={txt => setTruckRego(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Year</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={year}
                                    editable={false}

                                // onChangeText={txt => setFilledBy(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Transmission</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={transmission}
                                    editable={false}

                                // onChangeText={txt => setReading(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Fuel</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={fuel}
                                    editable={false}

                                // onChangeText={txt => setAfterReading(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Height</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={height}
                                    editable={false}

                                // onChangeText={txt => setVolume(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Width</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={width}
                                    editable={false}

                                // onChangeText={txt => setVolume(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Length</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={length}
                                    editable={false}

                                // onChangeText={txt => setVolume(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Litres</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={litres}
                                    editable={false}

                                // onChangeText={txt => setVolume(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Vin number</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={vin_number}
                                    editable={false}

                                // onChangeText={txt => setVolume(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Axies</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={axies}
                                    editable={false}

                                // onChangeText={txt => setVolume(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Due Rego</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={duerego}
                                    editable={false}

                                // onChangeText={txt => setVolume(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Engine numbers</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={enginenumbers}
                                    editable={false}

                                // onChangeText={txt => setVolume(txt)}
                                />
                            </View>
                        </View>

                    </View>

                </View>
            </ScrollView>

        )
    }




    return (

        <RenderContacts />

    )

}

export default VehicleDetail



const styles = StyleSheet.create({
    topBox: {
        flex: 2,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: mainWhite,
        borderWidth: 0.5,
        borderColor: mainBlue,
        borderRadius: 20,
        flexDirection: 'row',
    },
    textStyle: {
        paddingTop: 10,
        paddingLeft: 10,
        color: darkGrey,
        fontSize: 14,
    },
    staticBoxStyle: {
        flex: 1,
        backgroundColor: mainWhite,
        height: 40,
        marginRight: 10,
        marginTop: 10,
        marginLeft: 10
    },
    editableBoxStyle: {
        flex: 1,
        backgroundColor: mainWhite,
        marginRight: 10,
        marginTop: 10,
        height: 40,
        flexDirection: 'row'
    },
    topBoxdisable: {
        flex: 2,
        height: 40,
        opacity: 0.5,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: mainWhite,
        borderWidth: 0.5,
        borderColor: mainBlue,
        borderRadius: 20,
        flexDirection: 'row',
    },



});



