import React, { useState, useRef } from 'react'
import { View, StyleSheet,KeyboardAvoidingView, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import { mainWhite, darkGrey, mainBlack, mainGrey, lightGrey, lightGreen, mainBlue, mediumGrey } from '../../../../../common/Colors'
import  VehicleSelection  from './Innerscreen/VehicleSelection'
import DatePicker from 'react-native-datepicker'
import {__create_maintanace} from './common/action'
import { connect } from 'react-redux'
import Toast from 'react-native-simple-toast';

const AddReport = ({ navigation, route,dispatch ,maintanace_create}) => {

    const RenderContacts = () => {

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
        const [selectedData, setSelectedData] = useState(dropdownData[0])
        const [indexData, setIndexData] = useState(route.params.vehicledata[0].id)
        const [lisencenumber, setnumber] = useState('')
        const [description, setDescription] = useState('')
        const [service, setService] = useState('')
        const [invoiceDate, setInvoiceDate] = useState('')
        const [serviceDate, setServiceDate] = useState('')
        const [Ometer, setOmeter] = useState('')
        const [invoiceno, setInvoiceno] = useState('')
        const [labourCost, setLabourCost] = useState('')
        const [hours, setHours] = useState('')
        const [spareParts, setSpareparts] = useState('')
        const [gst, setGst] = useState('')
        const [cost, setCost] = useState('')
        const [report, setReport] = useState('')


        const ref_description = useRef()
        const ref_sevice = useRef()
        const ref_invoicedate = useRef()
        const ref_servicedate = useRef()
        const ref_ometer = useRef()
        const ref_invoiceno = useRef()
        const ref_labourcost = useRef()
        const ref_hours = useRef()
        const ref_spareparts = useRef()
        const ref_gst = useRef()
        const ref_cost = useRef()

        const selectData = (index) => {
            console.log('Selected index : ' + index)
            setIndexData(route.params.vehicledata[index].id)
        }


        const add_new_maintenance = () => {
            setBtnLoader(true)
            
            let form_body = new FormData()
        form_body.append('vehicle', indexData)
        form_body.append('description', description)
        form_body.append('invoice_date', invoiceDate)
        form_body.append('ometer', Ometer)
        form_body.append('service_date', serviceDate)
        form_body.append('invoice_number', invoiceno)
        form_body.append('service_provided', service)
        form_body.append('hours', hours)
        form_body.append('l_cost', labourCost)
        form_body.append('gst', gst)
        form_body.append('s_part', spareParts)
        form_body.append('total_cost', cost)
        
            const success = (response) => {
                setBtnLoader(false)
                // recall_notifications()
                // maintenance_data("truck")
                Toast.showWithGravity('Added Successfully', Toast.SHORT, Toast.BOTTOM);
                navigation.pop()
            }
            const failure = (response) => {
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
            
            maintanace_create(form_body, success,failure)
        }




        return (

            <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} behavior="padding" enabled keyboardVerticalOffset={100}>

            <ScrollView showsVerticalScrollIndicator={false}
                style={{ flex: 1 }}>
                <View style={{ paddingBottom: 60, flex: 1, paddingHorizontal: 20, backgroundColor: lightGrey, }}>
                    <View style={{ flex: 1.5, backgroundColor: lightGrey, }}>
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
                                <TouchableOpacity onPress={() => add_new_maintenance()} style={styles.topBox}>
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
                    <View style={{ flex: 7, backgroundColor: mainWhite, flexDirection: 'column', borderWidth: 0.2, borderColor: darkGrey, borderRadius: 1, marginTop: '9%', height: 510, }}>
                        <View style={{ flex: 7, backgroundColor: mainWhite, flexDirection: 'column', height: 500, marginTop: 10 }}>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Vehicle</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <Text style={{ alignSelf: 'center',marginTop:15 }}>:</Text>
                                <View style={styles.editableBoxStyle}>
                                    
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
                                    <Text style={styles.textStyle} >Description</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <Text style={{alignSelf: 'center',marginTop:15}}>:</Text>
                                
                                <View style={styles.editableBoxStyle}>
                                    
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14,paddingLeft:8 ,alignSelf: 'center'}}
                                        autoCapitalize='none'
                                        value={description}
                                        ref={ref_description}
                                        placeholder=""
                                        onChangeText={txt => setDescription(txt)}
                                        onSubmitEditing={() => ref_sevice.current.focus()}

                                    />

                                </View>
                                {/* </View> */}
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Service Provided</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <Text style={{ alignSelf: 'center',marginTop:15 }}>:</Text>
                                <View style={styles.editableBoxStyle}>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14,paddingLeft:8,alignSelf: 'center' }}
                                        autoCapitalize='none'
                                        value={service}
                                        ref={ref_sevice}
                                        onChangeText={txt => setService(txt)}

                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Invoice Date</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <Text style={{ alignSelf: 'center',marginTop:15 }}>:</Text>

                                <View style={styles.editableBoxStyle}>
                                   
                                    <DatePicker
                                    style={{
                                        width: 87,
                                        
                                    }}
                                    date={invoiceDate}
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

                                        }
                                    }}

                                    onDateChange={(date) => { setInvoiceDate(date) }}

                                />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Service Date</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <Text style={{ alignSelf: 'center',marginTop:15 }}>:</Text>

                                <View style={styles.editableBoxStyle}>
                                    {/* <Text style={{ alignSelf: 'center' }}>:</Text> */}
                                    
                                     <DatePicker
                                    style={{
                                        width: 87,
                                        
                                    }}
                                    date={serviceDate}
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

                                        }
                                    }}

                                    onDateChange={(date) => { setServiceDate(date) }}

                                />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Ometer</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <Text style={{ alignSelf: 'center',marginTop:15 }}>:</Text>

                                <View style={styles.editableBoxStyle}>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14,paddingLeft:8 ,alignSelf: 'center'}}
                                        autoCapitalize='none'
                                        value={Ometer}
                                        ref={ref_ometer}

                                        placeholder=""
                                        onChangeText={txt => setOmeter(txt)}
                                        onSubmitEditing={() => ref_invoiceno.current.focus()}

                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Invoice No</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <Text style={{ alignSelf: 'center',marginTop:15 }}>:</Text>

                                <View style={styles.editableBoxStyle}>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14,paddingLeft:8 ,alignSelf: 'center'}}
                                        autoCapitalize='none'
                                        value={invoiceno}
                                        // ref={ref_invoiceno}
                                        keyboardType={"numeric"}
                                        maxLength={10}
                                        placeholder=""
                                        contextMenuHidden={true}
                                        onChangeText={txt => setInvoiceno(txt)}
                                        // onSubmitEditing={() => ref_hours.current.focus()}

                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Hours</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <Text style={{ alignSelf: 'center',marginTop:15 }}>:</Text>

                                <View style={styles.editableBoxStyle}>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14,paddingLeft:8 ,alignSelf: 'center'}}
                                        autoCapitalize='none'
                                        value={hours}
                                        ref={ref_hours}
                                        keyboardType={"numeric"}

                                        placeholder=""
                                        onChangeText={txt => setHours(txt)}
                                        onSubmitEditing={() => ref_labourcost.current.focus()}

                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Labour Cost</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <Text style={{ alignSelf: 'center',marginTop:15 }}>:</Text>

                                <View style={styles.editableBoxStyle}>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14,paddingLeft:8 ,alignSelf: 'center'}}
                                        autoCapitalize='none'
                                        value={labourCost}
                                        // ref={ref_labourcost}
                                        keyboardType={"numeric"}
                                        contextMenuHidden={true}
                                        placeholder=""
                                        onChangeText={txt => setLabourCost(txt)}
                                        // onSubmitEditing={() => ref_spareparts.current.focus()}

                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Spare Parts</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <Text style={{ alignSelf: 'center',marginTop:15 }}>:</Text>

                                <View style={styles.editableBoxStyle}>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14,paddingLeft:8 ,alignSelf: 'center'}}
                                        autoCapitalize='none'
                                        value={spareParts}
                                        ref={ref_spareparts}
                                        onChangeText={txt => setSpareparts(txt)}
                                        onSubmitEditing={() => ref_gst.current.focus()}

                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >GST</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <Text style={{ alignSelf: 'center',marginTop:15 }}>:</Text>

                                <View style={styles.editableBoxStyle}>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14,paddingLeft:8 ,alignSelf: 'center'}}
                                        autoCapitalize='none'
                                        value={gst}
                                        ref={ref_gst}

                                        placeholder=""
                                        onChangeText={txt => setGst(txt)}
                                        onSubmitEditing={() => ref_cost.current.focus()}

                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Total Cost</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <Text style={{ alignSelf: 'center',marginTop:15 }}>:</Text>

                                <View style={styles.editableBoxStyle}>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14,paddingLeft:8 ,alignSelf: 'center'}}
                                        autoCapitalize='none'
                                        value={cost}
                                        ref={ref_cost}
                                        keyboardType={"numeric"}
                                        contextMenuHidden={true}

                                        placeholder=""
                                        onChangeText={txt => setCost(txt)}
                                    />
                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={{  height: 100 }}>
                      
                    </View>
                </View>
            </ScrollView>
            </KeyboardAvoidingView>


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
const mapDispatchToProps = (dispatch) => {
    return {
       
        maintanace_create: (data, success, failed) => dispatch(__create_maintanace(data, success, failed))
      }
}


export default connect(mapStateProps,mapDispatchToProps)(AddReport)





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
        color: darkGrey,
        fontSize: 14
    },
    staticBoxStyle: {
        flex: 0.7,
        backgroundColor: mainWhite,
        height: 40,
        marginRight: 10,
        marginTop: 10,
        marginLeft: 10
    },
    editableBoxStyle: {
        flex: 0.7,
        backgroundColor: mainWhite,
        marginRight: 10,
        marginTop: 10,
        height: 40,
         flexDirection: 'row'
    }
});
