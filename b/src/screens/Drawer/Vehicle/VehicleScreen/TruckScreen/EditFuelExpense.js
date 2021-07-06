

import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native'
import { mainWhite, darkGrey, mainGrey, lightGrey, mainBlue } from '../../../../../common/Colors'
import  VehicleSelection  from './Innerscreen/VehicleSelection'
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux'
import {__edit_fuel}from './common/action'
import Toast from 'react-native-simple-toast';

const EditFuelExpense = ({ navigation, route ,all_truck_list,dispatch}) => {


    const RenderContacts = () => {
        let registration=""
        let datenew=''
        let timenew=''
        let truckRegonew=''
        let filledbynew=''
        let readingnew=''
        let afterReadingnew=''
        let volumenew=''
       
        let idnew=''
        if(route.params){
            if(route.params.items){
                idnew=route.params.items.id
                registration=route.params.items.registration
                datenew=route.params.items.date
                timenew=route.params.items.time
                truckRegonew=route.params.items.truck_rego
                filledbynew=route.params.items.filled_by
                readingnew=route.params.items.current_reading_before
                afterReadingnew=route.params.items.reading_after_filling
                volumenew=route.params.items.volume_usedIn_liter
                

            }
        }

        let dropdownData = []
        if (route.params.vehicleList) {
            route.params.vehicleList.map((item) => {
                const { registration } = item
                return (
                    dropdownData.push(registration)
                )
            })
        }
        const [selectedData, setSelectedData] = useState(registration)
        const [indexData, setIndexData] = useState(registration)

       
        const [date, setDate] = useState(datenew)
        const [time, setTime] = useState(timenew)
        const [truckRego, setTruckRego] = useState(truckRegonew)
        const [filledby, setFilledBy] = useState(filledbynew)
        const [reading, setReading] = useState(readingnew)
        const [afterReading, setAfterReading] = useState(afterReadingnew)
        const [volume, setVolume] = useState(volumenew)
        const [btloader, setBtnLoader] = useState(false)
        
        

        const selectData = (index) => {
            console.log('Selected index : ' + index)
            setIndexData(route.params.vehicledata[index].id)
        }

        let edit_btn_status = false

        if(registration !== selectedData || date !== datenew ||  time !== timenew || truckRego !== truckRegonew 
            || filledby !== filledbynew || reading !== readingnew || afterReading !== afterReadingnew
            || volume !== volumenew  


             ) {
            edit_btn_status = true
        } else {
            edit_btn_status = false
        }

        const edit_fuel = () => {
            setBtnLoader(true)
            
            let form_body = new FormData()

            form_body.append('vehicle', indexData)      
            form_body.append('date', date)
            form_body.append('time', time)
            form_body.append('truck_rego', truckRego)
            form_body.append('current_reading_before', reading)
            form_body.append('reading_after_filling', afterReading)
            form_body.append('filled_by', filledby)
            form_body.append('volume_usedIn_liter', volume)
            const onSuccess = (response) => {
                setBtnLoader(false)
                // recall_fuelnotifications()
                Toast.showWithGravity('Updated Successfully', Toast.SHORT, Toast.BOTTOM);

                navigation.pop()
            }
            const onFailure = (response) => {
                setBtnLoader(false)
                Alert.alert(  
                    'Failed!',  
                    response.data.app_data,  
                    [  
                        {  
                            text: 'Cancel',  
                            onPress: () => console.log('Cancel Pressed'),  
                            style: 'cancel',  
                        },  
                        {text: 'OK', onPress: () => console.log('OK Pressed')},  
                    ]  
                );  
            }
            let functions = {
                success: onSuccess,
                failed: onFailure
            }
            dispatch(__edit_fuel(idnew, form_body, onSuccess,onFailure,1))
        }


        return (

            <ScrollView style={{ flex: 1 }}>
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
                                <TouchableOpacity 
                                    style={styles.topBox}>
                                    <View style={{ flex: 4, justifyContent: 'center', }}>
                                    {
                                edit_btn_status ? (
                                    <TouchableOpacity onPress={() => edit_fuel()} style={styles.topBox}>
                                    {
                                            btloader ? (
                                                <ActivityIndicator size="small" color={mainBlue} />
                                            ) : ( 
                                            <View style={{ flex: 4, justifyContent: 'center',alignItems:'center' }}>
                                                <Text style={{ color: mainBlue, fontSize: 16 ,textAlign:'center'}}>Save</Text>
                                                </View>
                                             )
                                        }  
                                    </TouchableOpacity>
                                ) : (
                                    <View style={styles.topBoxdisable}>
                                  <View style={{ flex: 4, justifyContent: 'center',alignItems:'center' }}>

                                        <Text style={{ color: mainBlue, fontSize: 16 }}>Save</Text>
                                   </View>
                                    </View>
                                )
                            } 
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
                                <View style={{ flex: 4, justifyContent: 'center', alignSelf: 'center'}}>
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
                                    placeholder="YYYY-MM-DD"
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
                                            paddingRight:10

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
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={time}
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
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={truckRego}
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
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={filledby}
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
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={reading}
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
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={afterReading}
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
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={volume}
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
       
                    <RenderContacts  />
           
    )

}
const mapStateProps = (state) => {
    const { isLoading,all_truck_list } = state.vehicle__truck
    return { isLoading,all_truck_list }
}


export default connect(mapStateProps)(EditFuelExpense)




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
        opacity:0.5,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: mainWhite,
        borderWidth: 0.5,
        borderColor: mainBlue,
        borderRadius: 20,
        flexDirection: 'row',
    },



});


