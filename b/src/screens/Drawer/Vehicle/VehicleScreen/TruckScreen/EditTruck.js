import React, { useState, useRef } from 'react'
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Image, ScrollView, SafeAreaView, ActivityIndicator } from 'react-native'
import { mainWhite, darkGrey, mainBlack, mainGrey, lightGrey, lightGreen, mainBlue, mediumGrey } from '../../../../../common/Colors'
import { VehicleSelection } from './Innerscreen'
import DatePicker from 'react-native-datepicker'
import { connect } from 'react-redux'
import { __edit_maintanace } from './common/action'
import Toast from 'react-native-simple-toast';


const EditTruck = ({ navigation, route, all_truck_list, dispatch }) => {
    
    const RenderContacts = () => {

        // const { truck_edit_data, maintenance_data,recall_notifications } = values
        const [btloader, setbtLoader] = useState(false)
        let vehicle = ''
        let descriptions = ''
        let services = ''
        let invoicedate = ''
        let servicedate = ''
        let ometers = ''
        let inoviceNumber = ''
        let la_cost = ''
        let hourr = ''
        let sp_parts = ''
        let gsts = ''
        let total_costs = ''
        let idnew = ''
        if (route.params) {
            if (route.params.items) {
                idnew = route.params.items.id
                vehicle = route.params.items.registration
                descriptions = route.params.items.description
                services = route.params.items.service_provided
                invoicedate = route.params.items.invoice_date
                servicedate = route.params.items.service_date
                ometers = route.params.items.ometer
                if (route.params.items.invoice_number === null) {
                    inoviceNumber = route.params.items.invoice_number

                } else {
                    inoviceNumber = route.params.items.invoice_number.toString()
                }
                la_cost = route.params.items.l_cost
                hourr = route.params.items.hours
                sp_parts = route.params.items.s_part
                gsts = route.params.items.gst
                total_costs = route.params.items.total_cost


            }
        }

        let dropdownData = []
        // if (all_truck_list) {
        //     all_truck_list.map((item) => {
        //         const { registration } = item
        //         return (
        //             dropdownData.push(registration)
        //         )
        //     })
        // }
        const [selectedData, setSelectedData] = useState(vehicle)
        const [indexData, setIndexData] = useState([])



        const [description, setDescription] = useState(descriptions)
        const [service, setService] = useState(services)
        const [invoiceDate, setInvoiceDate] = useState(invoicedate)
        const [serviceDate, setServiceDate] = useState(servicedate)
        const [Ometer, setOmeter] = useState(ometers)
        const [invoiceno, setInvoiceno] = useState(inoviceNumber)
        const [labourCost, setLabourCost] = useState(la_cost)
        const [hours, setHours] = useState(hourr)
        const [spareParts, setSpareparts] = useState(sp_parts)
        const [gst, setGst] = useState(gsts)
        const [cost, setCost] = useState(total_costs)


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




        let edit_btn_status = false

        if (vehicle !== selectedData || descriptions !== description || service !== services || invoiceDate !== invoicedate
            || serviceDate !== servicedate || Ometer !== ometers || invoiceno !== inoviceNumber
            || labourCost !== la_cost || hours !== hourr || spareParts !== sp_parts
            || gst !== gsts || cost !== total_costs


        ) {
            edit_btn_status = true
        } else {
            edit_btn_status = false
        }


        const selectData = (index) => {
            console.log('Selected index : ' + index)
            setIndexData(route.params.vehicledata[index].id)
        }


        const edit_maintenance = () => {
            setbtLoader(true)


            let form_body = new FormData()
            form_body.append('vehicle', selectedData)
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
                setbtLoader(false)
                // recall_notifications()
                Toast.showWithGravity('Updated Successfully', Toast.SHORT, Toast.BOTTOM);

                navigation.pop()
            }
            const failure = (response) => {
                setbtLoader(false)

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
            
            dispatch(__edit_maintanace(route.params.items.id, form_body, success, failure, 1))
        }



        return (


            <ScrollView showsVerticalScrollIndicator={false}
                style={{ flex: 1, backgroundColor: lightGrey, }}>
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
                                {/* <TouchableOpacity
                                    // onPress={() => add_new_maintenance()} 
                                    style={styles.topBox}> */}
                                    {/* <View style={{ flex: 4, justifyContent: 'center', }}>
                                        {btloader ? (
                                            <ActivityIndicator size={"small"} color={mainBlue}></ActivityIndicator>

                                        ) : (
                                                <Text style={{ color: mainBlue, fontSize: 16, textAlign: 'center' }} >Submit</Text>
                                            )
                                        }
                                    </View> */}
                                    {
                                        edit_btn_status ? (
                                            <TouchableOpacity onPress={() => edit_maintenance()} style={styles.topBox}>
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
                                {/* </TouchableOpacity> */}
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 7, backgroundColor: mainWhite, flexDirection: 'column', borderWidth: 0.2, borderColor: darkGrey, borderRadius: 1, marginTop: '9%', height: 510, }}>
                        <View style={{ flex: 7, backgroundColor: mainWhite, flexDirection: 'column', height: 500, marginTop: 10 }}>
                            {/* <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Vehicle</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: 'center' }}>:</Text>
                                    <View style={{ flex: 4, justifyContent: 'center', }}>
                                        <Text style={{ color: mainGrey, fontSize: 14, paddingLeft: 5 }}>{vehicle}</Text>
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
                                        style={{ color: mainGrey, fontSize: 14,alignSelf: 'center', }}
                                        autoCapitalize='none'
                                        value={description}
                                        ref={ref_description}
                                        placeholder=""
                                        onChangeText={txt => setDescription(txt)}
                                        onSubmitEditing={() => ref_sevice.current.focus()}

                                    />

                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Service Provided</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: 'center' }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, alignSelf: 'center'}}
                                        autoCapitalize='none'
                                        value={service}

                                        ref={ref_sevice}
                                        onChangeText={txt => setService(txt)}
                                        onSubmitEditing={() => ref_invoicedate.current.focus()}

                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Invoice Date</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <DatePicker
                                    style={{
                                        width: 80,
                                        
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

                                    onDateChange={(date) => {setInvoiceDate(date) }}

                                />

                                    {/* <Text style={{ alignSelf: 'center', fontSize: 14, color: mainGrey, paddingLeft: 5 }}>{invoiceDate}</Text> */}
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Service Date</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: 'center' }}>:</Text>
                                    <DatePicker
                                    style={{
                                        width: 80,
                                        
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
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: 'center' }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, alignSelf: 'center'}}
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
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: 'center' }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14,alignSelf: 'center' }}
                                        autoCapitalize='none'
                                        value={invoiceno}
                                        ref={ref_invoiceno}
                                        maxLength={10}
                                        placeholder=""
                                        keyboardType={"number-pad"}
                                        contextMenuHidden={true}
                                        onChangeText={txt => setInvoiceno(txt)}
                                        onSubmitEditing={() => ref_hours.current.focus()}

                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Hours</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: 'center' }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14,alignSelf: 'center' }}
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
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: 'center' }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14,alignSelf: 'center' }}
                                        autoCapitalize='none'
                                        value={labourCost}
                                        ref={ref_labourcost}
                                        keyboardType={"numeric"}
                                        contextMenuHidden={true}
                                        placeholder=""
                                        onChangeText={txt => setLabourCost(txt)}
                                        onSubmitEditing={() => ref_spareparts.current.focus()}

                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Spare Parts</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: 'center' }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, alignSelf: 'center'}}
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
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: 'center' }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, alignSelf: 'center'}}
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
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: 'center' }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14,alignSelf: 'center' }}
                                        autoCapitalize='none'
                                        value={cost}
                                        contextMenuHidden={true}
                                        ref={ref_cost}
                                        keyboardType={"numeric"}

                                        placeholder=""
                                        onChangeText={txt => setCost(txt)}
                                    />
                                </View>
                            </View>
                        </View>

                    </View>
                    <View style={{ height: 100 }}>

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
    const { truck_preinspection_list, all_truck_list } = state.vehicle__truck
    return { all_truck_list }
}

export default connect(mapStateProps)(EditTruck)






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
    topBoxdisable: {
        flex: 2,
        height: 40,
        opacity: 0.5,
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
        flex: 0.9,
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
