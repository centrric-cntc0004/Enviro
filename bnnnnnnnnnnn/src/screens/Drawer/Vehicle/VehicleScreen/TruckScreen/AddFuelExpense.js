

import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native'
import { mainWhite, darkGrey, mainGrey, lightGrey, mainBlue } from '../../../../../common/Colors'
import VehicleSelection from './Innerscreen/VehicleSelection'
import DatePicker from 'react-native-datepicker'
import { __create_fuel } from './common/action'
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast';


const AddFuelExpense = ({ navigation, route, dispatch }) => {


    const RenderContacts = () => {
        const [indexData, setIndexData] = useState(route.params.vehicledata[0].id)

        const [date, setDate] = useState('')
        const [time, setTime] = useState('')
        const [truckRego, setTruckRego] = useState('')
        const [filledby, setFilledBy] = useState('')
        const [reading, setReading] = useState('')
        const [afterReading, setAfterReading] = useState('')
        const [volume, setVolume] = useState('')
        const [btloader, setBtnLoader] = useState(false)

        let dropdownData = []
        if (route.params.vehicledata) {
            route.params.vehicledata.map((item) => {
                const { registration } = item
                return (
                    dropdownData.push(registration)
                )
            })
        }


        const selectData = (index) => {
            console.log('Selected index : ' + index)
            setIndexData(route.params.vehicledata[index].id)
        }



        const add_new_fuel = () => {
            setBtnLoader(true)

            let form_body = new FormData()

            form_body.append('vehicle', indexData)
            form_body.append('date', date)
            form_body.append('time', truckRego)
            form_body.append('truck_rego', time)
            form_body.append('current_reading_before', reading)
            form_body.append('reading_after_filling', afterReading)
            form_body.append('filled_by', filledby)
            form_body.append('volume_usedIn_liter', volume)
            const onSuccess = (response) => {
                setBtnLoader(false)
                // recall_fuelnotifications()
                Toast.showWithGravity('Added Successfully', Toast.SHORT, Toast.BOTTOM);

                navigation.pop()
            }
            const onFailure = (response) => {
                setBtnLoader(false)
            }
            let functions = {
                success: onSuccess,
                failed: onFailure
            }
            dispatch(__create_fuel(form_body, onSuccess, onFailure))
        }


        return (

            <ScrollView style={{ flex: 1,backgroundColor: mainWhite }}>
                <View style={{
                    flex: 1, paddingHorizontal: 20, backgroundColor: mainWhite,
                }}>
                    <View style={{ flex: 1.5, backgroundColor: mainWhite, }}>
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
                                <TouchableOpacity onPress={() => add_new_fuel()}
                                    style={styles.topBox}>
                                    <View style={{ flex: 4, justifyContent: 'center', }}>
                                        {btloader ? (
                                            <ActivityIndicator size={"small"} color={mainBlue}></ActivityIndicator>

                                        ) : (
                                                <Text style={{ color: mainBlue, fontSize: 16, textAlign: 'center' }} >Submit</Text>
                                            )}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    <View style={{
                        flex: 9, backgroundColor: mainWhite, flexDirection: 'column',
                        borderWidth: 0.2, borderColor: darkGrey, borderRadius: 1,
                        marginTop: '8%',
                        paddingBottom: 20, height: 350
                    }}>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Vehicle</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <View style={{ flex: 4, justifyContent: 'center', }}>
                                    <VehicleSelection
                                        dropdown_data={dropdownData}
                                        selectData={selectData}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Date</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <DatePicker
                                    style={{
                                        width: 90,

                                    }}
                                    date={date}
                                    mode="date"
                                    placeholder="yyyy:mm:dd"
                                    format="YYYY-MM-DD"
                                    showIcon={false}
                                    minDate="2000-01-01"
                                    textColor="#FFFFFF"
                                    maxDate="2030-12-31"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{

                                        dateInput: {
                                            borderWidth: 0,
                                            fontSize: 12,
                                            textColor: "red"

                                        },
                                        dateText: {
                                            color: mainGrey,
                                            fontSize: 14,
                                            paddingRight: 10

                                        }
                                    }}

                                    onDateChange={(date) => { setDate(date) }}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Time</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, paddingLeft: 5, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={time}
                                    placeholder="time"
                                    onChangeText={txt => setTime(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Truck Rego</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, paddingLeft: 5, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={truckRego}
                                    placeholder="truck rego"

                                    onChangeText={txt => setTruckRego(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Filled By</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, paddingLeft: 5, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={filledby}
                                    placeholder="filled by"

                                    onChangeText={txt => setFilledBy(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Current Reading</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, paddingLeft: 5, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={reading}
                                    placeholder="reading"

                                    onChangeText={txt => setReading(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Reading After</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, paddingLeft: 5, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={afterReading}
                                    placeholder="reading after"

                                    onChangeText={txt => setAfterReading(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Volume used in Litres</Text>
                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, paddingLeft: 5, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={volume}
                                    placeholder="volume"

                                    onChangeText={txt => setVolume(txt)}
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
const mapStateProps = (state) => {
    const { isLoading, all_truck_list } = state.vehicle__truck
    return { isLoading, all_truck_list }
}

export default connect(mapStateProps)(AddFuelExpense)




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
    }



});



