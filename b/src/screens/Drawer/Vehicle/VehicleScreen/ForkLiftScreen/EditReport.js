

import React, { useState } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, ActivityIndicator, Alert } from 'react-native'
import { mainWhite, darkGrey, mainGrey, lightGrey, mainBlue } from '../../../../../common/Colors'
import DatePicker from 'react-native-datepicker'
import { __edit_maintanace } from './common/action'
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast';


const EditReport = ({ navigation, route, dispatch }) => {


    const RenderContacts = () => {

        let registration = ""
        let descriptionnew = ''
        let service_completednew = ''
        let hourmrnew = ''
        let nextservicenew = ''
        let frequencynew = ''
        let regoexpirynew = ''
        let active_perfomed_reportnew = ''
        let invoicenonew = ''
        let costnew = ''

        let idnew = ''
        if (route.params) {
            if (route.params.items) {
                idnew = route.params.items.id
                registration = route.params.items.registration
                descriptionnew = route.params.items.description
                service_completednew = route.params.items.service_completed
                hourmrnew = route.params.items.hour_mr
                nextservicenew = route.params.items.next_service
                frequencynew = route.params.items.frequency
                regoexpirynew = route.params.items.rego_expiry_date
                active_perfomed_reportnew = route.params.items.active_perfomed_report
                invoicenonew = route.params.items.invoice_number
                costnew = route.params.items.total_cost







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
        // const [indexData, setIndexData] = useState([])
        const [indexData, setIndexData] = useState(route.params.vehicleList[0].id)



        const [descriptions, setDescriptions] = useState(descriptionnew)
        const [seviceComplete, setseviceComplete] = useState(service_completednew)
        const [hourMr, sethourMr] = useState(hourmrnew)
        const [nextservices, setnextservices] = useState(nextservicenew)
        const [frequencys, setfrequencys] = useState(frequencynew)
        const [truckRego, setTruckRego] = useState(regoexpirynew)
        const [active, setactive] = useState(active_perfomed_reportnew)
        const [invoicenum, setinvoicenum] = useState(invoicenonew)
        const [costs, setcosts] = useState(costnew)
        const [btloader, setBtnLoader] = useState(false)



        const selectData = (index) => {
            console.log('Selected index : ' + index)
            setIndexData(route.params.vehicledata[index].id)
        }

        let edit_btn_status = false

        if (registration !== selectedData || descriptions !== descriptionnew ||
            seviceComplete !== service_completednew || hourMr !== hourmrnew
            || nextservices !== nextservicenew ||
            frequencys !== frequencynew || truckRego !== regoexpirynew
            || active !== active_perfomed_reportnew
            || invoicenum !== invoicenonew
            || costs !== costnew


        ) {
            edit_btn_status = true
        } else {
            edit_btn_status = false
        }

        const edit_fuel = () => {
            setBtnLoader(true)

            let form_body = new FormData()
            form_body.append('vehicle', indexData)
            form_body.append('service_completed', seviceComplete)
            form_body.append('description', descriptions)
            form_body.append('hour_mr', hourMr)
            form_body.append('next_service', nextservices)
            form_body.append('frequency', frequencys)
            form_body.append('rego_expiry_date', truckRego)
            form_body.append('active_perfomed_report', active)
            form_body.append('invoice_number', invoicenum)
            form_body.append('total_cost', costs)
            const onSuccess = (response) => {
                setBtnLoader(false)
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
            dispatch(__edit_maintanace(idnew, form_body, onSuccess, onFailure))
        }


        return (
            <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} behavior="padding" enabled keyboardVerticalOffset={100}>

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
                                                                    <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>
                                                                        <Text style={{ color: mainBlue, fontSize: 16, textAlign: 'center' }}>Save</Text>
                                                                    </View>
                                                                )
                                                        }
                                                    </TouchableOpacity>
                                                ) : (
                                                        <View style={styles.topBoxdisable}>
                                                            <View style={{ flex: 4, justifyContent: 'center', alignItems: 'center' }}>

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
                            paddingBottom: 20, height: 450,
                        }}>
                            {/* <View style={{ flex: 1, flexDirection: 'row', }}>
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
                            </View> */}
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Description</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: 'center' }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                        autoCapitalize='none'
                                        value={descriptions}
                                        onChangeText={txt => setDescriptions(txt)}
                                    />

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
                                            width: 85,

                                        }}
                                        date={seviceComplete}
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
                                                paddingRight: 5,

                                            }
                                        }}

                                        onDateChange={(date) => { setseviceComplete(date) }}

                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Hour MR </Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: 'center' }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                        autoCapitalize='none'
                                        value={hourMr}
                                        onChangeText={txt => sethourMr(txt)}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Next Service </Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: 'center' }}>:</Text>

                                    <DatePicker
                                        style={{
                                            width: 85,

                                        }}
                                        date={nextservices}
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
                                                paddingRight: 5,

                                            }
                                        }}

                                        onDateChange={(date) => { setnextservices(date) }}

                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Frequency </Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: 'center' }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                        autoCapitalize='none'
                                        value={frequencys}

                                        onChangeText={txt => setfrequencys(txt)}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Rego Expiry Date </Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: 'center' }}>:</Text>

                                    <DatePicker
                                        style={{
                                            width: 85,

                                        }}
                                        date={truckRego}
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
                                                paddingRight: 5,

                                            }
                                        }}

                                        onDateChange={(date) => { setTruckRego(date) }}

                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Active Perfomed Report </Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: 'center' }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                        autoCapitalize='none'
                                        value={active}

                                        onChangeText={txt => setactive(txt)}
                                    />
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Invoice No </Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: 'center' }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                        autoCapitalize='none'
                                        value={invoicenum}
                                        keyboardType={"numeric"}
                                        contextMenuHidden={true}
                                        onChangeText={txt => setinvoicenum(txt)}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Total Cost </Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: 'center' }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                        autoCapitalize='none'
                                        value={costs}
                                        keyboardType={"numeric"}
                                        contextMenuHidden={true}
                                        onChangeText={txt => setcosts(txt)}
                                    />
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





export default connect(mapStateToProps)(EditReport)



const styles = StyleSheet.create({
    topBox: {
        flex: 2,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: mainWhite,
        borderWidth: 0.7,
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



