

import React, { useState } from 'react'
import { View, StyleSheet, Text, KeyboardAvoidingView, TextInput, TouchableOpacity,  ScrollView, ActivityIndicator,Alert } from 'react-native'
import { mainWhite, darkGrey, mainBlack, mainGrey, lightGrey, mainBlue } from '../../../../../common/Colors'
import VehicleDropdown from './InnerScreen/VehicleDropdown'
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux'
import { __create_maintanace } from './common/action'
import Toast from 'react-native-simple-toast';


const AddReport = ({ navigation, route, all_forklift_list, dispatch }) => {

    const RenderContacts = () => {

        const [client, setClient] = useState([])
        const [service, setService] = useState('')
        const [description, setDescription] = useState('')
        const [hours, setHours] = useState('')
        const [nextservice, setNextService] = useState('')
        const [frequency, setFrequency] = useState('')
        const [date, setDate] = useState('')

        const [active, setActive] = useState('')
        const [invoiceno, setInvoiceno] = useState('')
        const [cost, setCost] = useState('')

        let dropdownData = []
        if (route.params.vehicledata) {
            route.params.vehicledata.map((item) => {
                const { registration } = item
                return (
                    dropdownData.push(registration)
                )
            })
        }
        const [selectedData, setSelectedData] = useState(dropdownData[0])
        const [indexData, setIndexData] = useState(route.params.vehicledata[0].id)
        const [btloader, setBtnLoader] = useState(false)



        const selectData = (index) => {
            console.log('Selected index : ' + index)
            setIndexData(route.params.vehicledata[index].id)
        }


        const add_new_maintenance = () => {
            setBtnLoader(true)

            let form_body = new FormData()
            form_body.append('vehicle', indexData)
            form_body.append('service_completed', service)
            form_body.append('description', description)
            form_body.append('hour_mr', hours)
            form_body.append('next_service', nextservice)
            form_body.append('frequency', frequency)
            form_body.append('rego_expiry_date', date)
            form_body.append('active_perfomed_report', active)
            form_body.append('invoice_number', invoiceno)
            form_body.append('total_cost', cost)
            const onSuccess = (response) => {
                setBtnLoader(false)
                // recall_forknotifications()
                // maintenance_data("truck")
                Toast.showWithGravity('Added Successfully', Toast.SHORT, Toast.BOTTOM);
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
            dispatch(__create_maintanace(form_body, onSuccess, onFailure))
        }





        return (

            <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} behavior="padding" enabled keyboardVerticalOffset={100}>

                <ScrollView style={{ flex: 1 }}>
                    <View style={{
                        paddingBottom: 60,
                        flex: 1, paddingHorizontal: 20, backgroundColor: lightGrey,
                    }}>
                        <View style={{ flex: 1.5, backgroundColor: mainWhite, }}>


                            <View style={{ marginTop: 30 }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                    {/* Top boxes  */}
                                    <TouchableOpacity onPress={() => navigation.pop()}
                                        style={styles.topBox}>
                                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ color: mainBlue, fontSize: 16 }} >Back</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <View style={{ flex: 4.5 }} />
                                    <TouchableOpacity onPress={() => add_new_maintenance()}
                                        style={styles.topBox}>
                                        <View style={{ flex: 4, justifyContent: 'center', }}>
                                            {btloader ? (
                                                <ActivityIndicator size={"small"} color={mainBlue}></ActivityIndicator>

                                            ) : (
                                                    <Text style={{ color: mainBlue, fontSize: 16, textAlign: 'center' }} >Submit</Text>
                                                )
                                            }
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>

                        <View style={{
                            flex: 7, backgroundColor: mainWhite, flexDirection: 'column',
                            borderWidth: 0.2, borderColor: darkGrey, borderRadius: 1,
                            marginTop: '9%',
                            height: 430,
                        }}>
                            <View style={{
                                flex: 7, backgroundColor: mainWhite, flexDirection: 'column',

                                height: 430, marginTop: 10
                            }}>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <View style={styles.staticBoxStyle}>
                                        <Text style={styles.textStyle} >Vehicle</Text>
                                    </View>
                                    <View style={{ flex: 0.1 }} />
                                    <View style={styles.editableBoxStyle}>
                                        <Text style={{ alignSelf: 'center' }}>:</Text>
                                        <View style={{ flex: 4, justifyContent: 'center', }}>
                                            <VehicleDropdown
                                                dropdown_data={dropdownData}
                                                selectData={selectData}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <View style={styles.staticBoxStyle}>
                                        <Text style={styles.textStyle} >Service Completed</Text>
                                    </View>
                                    <View style={{ flex: 0.1 }} />
                                    <View style={styles.editableBoxStyle}>
                                        <Text style={{ alignSelf: 'center' }}>:</Text>



                                        <DatePicker
                                            style={{
                                                width: 90,

                                            }}
                                            date={service}
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
                                                    paddingRight: 5,

                                                }
                                            }}

                                            onDateChange={(date) => { setService(date) }}

                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <View style={styles.staticBoxStyle}>
                                        <Text style={styles.textStyle} >Description</Text>
                                    </View>
                                    <View style={{ flex: 0.1 }} />
                                    <View style={styles.editableBoxStyle}>
                                        <Text style={{ alignSelf: 'center' }}>:</Text>
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            style={{ color: mainGrey, fontSize: 14, paddingLeft: 8, width: 100 }}
                                            autoCapitalize='none'
                                            value={description}
                                            placeholder="description"
                                            onChangeText={txt => setDescription(txt)}

                                        />

                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <View style={styles.staticBoxStyle}>
                                        <Text style={styles.textStyle} >Hour MR</Text>
                                    </View>
                                    <View style={{ flex: 0.1 }} />
                                    <View style={styles.editableBoxStyle}>
                                        <Text style={{ alignSelf: 'center' }}>:</Text>
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            style={{ color: mainGrey, fontSize: 14, paddingLeft: 8, width: 100 ,alignSelf: 'center'}}
                                            autoCapitalize='none'
                                            value={hours}
                                            placeholder="hour"
                                            onChangeText={txt => setHours(txt)}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <View style={styles.staticBoxStyle}>
                                        <Text style={styles.textStyle} >Next Service</Text>
                                    </View>
                                    <View style={{ flex: 0.1 }} />
                                    <View style={styles.editableBoxStyle}>
                                        <Text style={{ alignSelf: 'center' }}>:</Text>


                                        <DatePicker
                                            style={{
                                                width: 90,

                                            }}
                                            date={nextservice}
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
                                                    paddingRight: 5

                                                }
                                            }}

                                            onDateChange={(date) => { setNextService(date) }}

                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <View style={styles.staticBoxStyle}>
                                        <Text style={styles.textStyle} >Frequency</Text>
                                    </View>
                                    <View style={{ flex: 0.1 }} />
                                    <View style={styles.editableBoxStyle}>
                                        <Text style={{ alignSelf: 'center' }}>:</Text>
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            style={{ color: mainGrey, fontSize: 14, paddingLeft: 8, width: 100 ,alignSelf: 'center'}}
                                            autoCapitalize='none'
                                            value={frequency}
                                            placeholder="frequency"
                                            onChangeText={txt => setFrequency(txt)}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <View style={styles.staticBoxStyle}>
                                        <Text style={styles.textStyle} >Rego Expiry Date</Text>
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
                                                    paddingRight: 5

                                                }
                                            }}

                                            onDateChange={(date) => { setDate(date) }}

                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <View style={styles.staticBoxStyle}>
                                        <Text numberOfLines={1}
                                         style={styles.textStyle} >Active Performed Report</Text>
                                    </View>
                                    <View style={{ flex: 0.1 }} />
                                    <View style={styles.editableBoxStyle}>
                                        <Text style={{ alignSelf: 'center' }}>:</Text>
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            style={{ color: mainGrey, fontSize: 14, paddingLeft: 8, width: 100,alignSelf: 'center' }}
                                            autoCapitalize='none'
                                            value={active}
                                            placeholder="report"
                                            onChangeText={txt => setActive(txt)}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <View style={styles.staticBoxStyle}>
                                        <Text style={styles.textStyle} >Invoice No</Text>
                                    </View>
                                    <View style={{ flex: 0.1 }} />
                                    <View style={styles.editableBoxStyle}>
                                        <Text style={{ alignSelf: 'center' }}>:</Text>
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            style={{ color: mainGrey, fontSize: 14, paddingLeft: 8, width: 100 ,alignSelf: 'center'}}
                                            autoCapitalize='none'
                                            value={invoiceno}
                                            keyboardType={"numeric"}
                                            contextMenuHidden={true}
                                            placeholder="invoice no"
                                            // onChangeText={txt => setInvoiceno(txt)}
                                            onChangeText={txt => {
                                                setInvoiceno(txt)
                                               
            
                                            }}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', }}>
                                    <View style={styles.staticBoxStyle}>
                                        <Text style={styles.textStyle} >Total Cost</Text>
                                    </View>
                                    <View style={{ flex: 0.1 }} />
                                    <View style={styles.editableBoxStyle}>
                                        <Text style={{ alignSelf: 'center' }}>:</Text>
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            style={{ color: mainGrey, fontSize: 14, paddingLeft: 8 ,width:100,alignSelf: 'center'}}
                                            autoCapitalize='none'
                                            value={cost}
                                            keyboardType={"numeric"}
                                            contextMenuHidden={true}
                                            placeholder="cost"
                                             onChangeText={txt => setCost(txt)}
                                            
                                        />
                                    </View>
                                </View>




                            </View>

                        </View>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>


        )
    }




    return (

        <RenderContacts />

    )

}

const mapStateToProps = (state) => {
    const { forklift_maintanace_list, forklift_maintanance_page, all_forklift_list } = state.vehicle__forklift
    return { forklift_maintanace_list, forklift_maintanance_page, all_forklift_list }

}





export default connect(mapStateToProps)(AddReport)


const styles = StyleSheet.create({
    moreBoxes: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: mainWhite,
        borderRadius: 20,
        shadowColor: mainBlack,
        borderWidth: 1,
        borderColor: mainBlue,
        flexDirection: 'row',
    },
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
        color: darkGrey
    },
    staticBoxStyle: {
        flex: 1.5,
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
