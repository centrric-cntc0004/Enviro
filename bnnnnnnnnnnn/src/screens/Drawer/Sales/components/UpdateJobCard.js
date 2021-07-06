import React, { useState } from 'react'
import { View, Text, ActivityIndicator, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { mainWhite, mainBlue, mainGrey, textGrey, darkGrey, lightGrey, lightGreyBackground, lightGreen, mediumGrey, textBlack, textBlue } from '../../../../common/Colors'
import { fetch_selected_payment, add_new_job_card, edit_new_job_card } from './common/action'
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import DatePicker from 'react-native-datepicker'
import Toast from 'react-native-simple-toast';
import moment from 'moment'




const UpdateJobCard = ({ job_full, paymentData, types, addJob1, selected_payment, client_list, navigation, route, sales_enviroWaste, dispatch }) => {
    console.log("jobcarddddd" + JSON.stringify(job_full))
    const RenderContacts = () => {
        let paymentArray = [{ "id": 1, "name": 'cod' }, { "id": 2, "name": 'account' }, { "id": 3, "name": 'credit_card' }]
        let options = [{ "id": 1, "option": 'true' }, { "id": 2, "option": 'false' }]
        // let acch = ""
        // let accre = job_full.tab_type
        // let buildname = ""
        // let comadd = ""
        // let compname = "jhk"
        // let completby = ""
        // let confineds = ""
        // let contemail = ""
        // let contactn = "kiuikujoi"
        // let contactno = ""
        // let date1 = ""
        // let gumyr = ""
        // let spec = ""
        // let indr = ""
        // let jobadd = ""
        // let jobname = "kjjkjk"
        // let keyr = ""
        // let truckn = ""
        // let paayment = ""
        // let phoneno = ""
        // let pitdistance = ""
        // let postal_c = ""
        // let water_location = ""
        // let confs = ""
        // let pper = ""
        // let servt = ""
        // let secrr = ""
        // let dataf = ""
        // let tc = ""
        // let subb = ""
        // if (job_full) {
        let postal_c = job_full.postal_code
        let subb = job_full.suburb
        let tc = job_full.tc_required
        let dataf = job_full.waste_data_form
        let secrr = route.params.data.security_required
        let servt = route.params.data.service_time
        let pper = route.params.data.specific_ppe_required
        let confs = route.params.data.confined_space
        let water_location = route.params.data.water_tap_location
        let pitdistance = route.params.data.pit_distance_from_truck_location
        let phoneno = route.params.data.phone_number
        let paayment = route.params.data.payment_details
        let truckn = route.params.data.number_of_trucks_required
        let keyr = route.params.data.key_required
        let jobname = route.params.data.job_site_contact_name
        let jobadd = route.params.data.job_site_address
        let indr = route.params.data.induction_required
        let spec = route.params.data.if_yes_specify
        let gumyr = route.params.data.gummy_required
        let date1 = route.params.data.date
        let contactno = route.params.data.contact_number
        let contactn = route.params.data.contact_name
        let contemail = route.params.data.contact_email_address
        let confineds = route.params.data.confined_space
        let completby = route.params.data.completed_by
        let compname = route.params.data.company_name
        let comadd = route.params.data.company_address
        let buildname = route.params.data.building_name
        let accre = job_full.tab_type
        let acch = route.params.data.access_height
        let list = route.params.data.service_list
        let formatted_date = ""
        if (route.params.data) {
            if (route.params.data.date) {
                let date_val = new Date(route.params.data.date)
                formatted_date = moment(date_val).format('YYYY-MM-DD')

            }
        }



        const [isCheck, setCheck] = useState(false)
        const [date, setDate] = useState(date1)
        const [optionData, setOption] = useState(options[0])
        const [tcreq, settcreq] = useState(tc)
        const [loader, setLoader] = useState(false)

        const [datareq, setdatareq] = useState(dataf)
        const [keyreq, setkeyreq] = useState(options[0])
        const [security, setsecurity] = useState(secrr)
        const [induction, setinduction] = useState(indr)
        const [gumyreq, setgumyreq] = useState(false)
        const [confined, setconfined] = useState(confineds)
        const [ppe, setppe] = useState(options[0])


        const [id, setid] = useState(client_list[0].client_id)


        const [payment, setPayment] = useState('COD')
        const [serviceDet, setServiceDet] = useState(list)
        const [access, setAccess] = useState(accre)
        const [tcReq, setTcreq] = useState(false)
        const [dataForm, setDataForm] = useState(false)
        const [accessHeight, setAccessHeight] = useState(acch)
        const [keyReq, setKeyReq] = useState(false)
        const [secReq, setSecReq] = useState(false)
        const [indReq, setIndReq] = useState(false)
        const [contName, setContName] = useState(contactn)
        const [contPh, setContPh] = useState(phoneno)
        const [pitLoc, setPitLoc] = useState(pitdistance)
        const [typeOfInd, setTypeOfInd] = useState('')
        const [waterTap, setWaterTap] = useState(water_location)
        const [gumReq, setGumReq] = useState(false)
        const [confSpace, setConfSpace] = useState(false)
        const [noTruck, setNoTruck] = useState(truckn)
        const [servTime, setServTime] = useState(servt)
        const [spcPPEReq, setSpcPPEReq] = useState(false)
        const [specify, setSpecify] = useState(spec)
        const [compl, setCompl] = useState(completby)
        const [sign, setSign] = useState('')
        const [tempInput, setTempInput] = useState('')

        const [jobDate, setJobDate] = useState('')

        const addRem = (val) => {
            if (val) {
                setServiceDet(data => [...data, {
                    no: serviceDet.length + 1,
                    waste_type: '',
                    capacity: '',
                    frequency: '',
                    pit_location: ''
                }])
            }
            else {
                let newArr = serviceDet.filter((_, key) => key !== (serviceDet.length - 1))
                setServiceDet(newArr)
            }
        }
        const addJobCard = () => {
            setLoader(true)
            let tc = false
            let dataf = false
            let keyr = false
            let sec = false
            let ind = false
            let gum = false
            let con = false
            let pp = false
            if (tcreq === 'yes') {
                tc = true
            } else {
                tc = false
            }
            if (datareq === 'yes') {
                dataf = true
            } else {
                dataf = false
            }
            if (optionData === 'yes') {
                keyr = true
            } else {
                keyr = false
            }
            if (security === 'yes') {
                sec = true
            } else {
                sec = false
            }
            if (induction === 'yes') {
                ind = true
            } else {
                ind = false
            }
            if (confined === 'yes') {
                con = true
            } else {
                con = false
            }
            if (ppe === 'yes') {
                pp = true
            } else {
                pp = false
            }
            if (gumyreq === 'yes') {
                gum = true
            } else {
                gum = false
            }


            let postData = {

                'client': job_full.client,
                'payment_details': selected_payment.name,
                // 'company_name': compName,
                // 'company_address': compAddr,
                // 'suburb': suburb,
                // 'postal_code': postal,
                // 'job_site_address': siteAddr,
                // 'building_name': buildName,
                // 'contact_email_address': contactEmail,
                // 'contact_number': contactNo,
                // 'job_site_contact_name': contactName,
                'service_list': serviceDet,
                'tc_required': tc,
                'waste_data_form': dataf,
                'access_height': accessHeight,
                'key_required': keyr,
                'security_required': sec,
                'induction_required': ind,
                'contact_name': contName,
                'phone_number': contPh,
                'type_of_induction': typeOfInd,
                'pit_distance_from_truck_location': pitLoc,
                'water_tap_location': waterTap,
                'gummy_required': gum,
                'confined_space': con,
                'number_of_trucks_required': noTruck,
                'specific_ppe_required': pp,
                'service_time': servTime,
                'if_yes_specify': specify,
                'completed_by': compl,
                'date': date,
            }

            const success = () => {
                setLoader(false)
                Toast.showWithGravity('Updated Successfully', Toast.SHORT, Toast.BOTTOM);
                navigation.pop()

            }
            const failed = () => {
                setLoader(false)
                Toast.showWithGravity('Failed ! Try again', Toast.SHORT, Toast.BOTTOM);


            }


            console.log("post" + JSON.stringify(postData))
            addJob1(job_full.id, postData, success, failed)


        }
        let button_disable = false
        if (id !== null && date !== "") {
            button_disable = true
        } else {
            button_disable = false
        }









        if (job_full === undefined) return (
            <View style={{ marginTop: 300, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={mainBlue} />
            </View>
        )

        return (
            <View>
                <View style={{ flex: 1, backgroundColor: lightGreyBackground, height: 40 }}>

                    <Text style={{ paddingLeft: 10, marginTop: 10, color: textBlack }}>Payment Details</Text>
                </View>
                <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 10, }}>

                    {paymentArray.map((item, key) => {
                        return (

                            <TouchableOpacity onPress={() => paymentData(item)}
                                style={{ marginTop: 10, marginLeft: 20, flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row' }}>
                                <Text style={{ color: textBlack }}>{item.name}</Text>


                                {item.name === selected_payment.name ? (
                                    <View style={{
                                        height: 18,
                                        width: 18,
                                        marginLeft: 5,
                                        borderWidth: 1,
                                        borderColor: textBlack,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Icon name="check" color={'#000'} size={15}></Icon>

                                    </View>
                                ) : (
                                        <View style={{
                                            height: 18,
                                            width: 18,
                                            marginLeft: 5,
                                            borderWidth: 1,
                                            borderColor: textBlack,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>

                                        </View>
                                    )}

                            </TouchableOpacity>
                        )
                    })
                    }

                </View>
                <View style={{ marginTop: 20, flex: 1, backgroundColor: lightGreyBackground, height: 40 }}>

                    <Text style={{ paddingLeft: 10, marginTop: 10, color: textBlack }}>Service Details</Text>
                </View>
                <View style={{ flexDirection: "row", marginLeft: 10 }}>

                    <View style={{ width: '10%', flexDirection: "column", marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>No</Text>
                        {serviceDet?(
                            <>
                        {serviceDet.map((item, key) => {
                            return (

                                <Text
                                    style={{ height: 40, marginTop: 5, }}>{key + 1}</Text>
                            )
                        })}
</>
                        ):(
null
                        )}
                    </View>
                    <View style={{ width: '20%', flexDirection: "column", }}>
                        <Text style={{ fontWeight: 'bold' }}>Type</Text>
                        {serviceDet?(
                            <>
                        {serviceDet.map((item, key) => {
                            return (
                                <View style={styles.editableBoxStyle}>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 10 }}
                                        autoCapitalize='none'
                                        value={item.waste_type} onChangeText={(e) => {
                                            setTempInput(e)
                                            let temp = { ...item, waste_type: e };
                                            let tempArr = serviceDet
                                            tempArr.splice(key, 1, temp)

                                            setServiceDet(tempArr)
                                        }}

                                    // onChangeText={txt => setSubrub(txt)}
                                    />
                                </View>
                            )
                        })}
                        </>):(
null
                        )}

                    </View>
                    <View style={{ width: '20%', flexDirection: "column", marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Capacity</Text>
                        {serviceDet?(
                            <>
                        {serviceDet.map((item, key) => {
                            return (
                                <View style={styles.editableBoxStyle}>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 10 }}
                                        autoCapitalize='none'
                                        value={item.capacity} onChangeText={(e) => {
                                            setTempInput(e)
                                            let temp = { ...item, capacity: e };
                                            let tempArr = serviceDet
                                            tempArr.splice(key, 1, temp)

                                            setServiceDet(tempArr)
                                        }}

                                    // onChangeText={txt => setSubrub(txt)}
                                    />
                                </View>
                            )
                        })}
                        </>
                        ):(
                            null
                        )}

                    </View>
                    <View style={{ width: '20%', flexDirection: "column", marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Frequency</Text>
                        {serviceDet?(
                            <>
                        {serviceDet.map((item, key) => {
                            return (
                                <View style={styles.editableBoxStyle}>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 10 }}
                                        autoCapitalize='none'
                                        value={item.frequency} onChangeText={(e) => {
                                            setTempInput(e)
                                            let temp = { ...item, frequency: e };
                                            let tempArr = serviceDet
                                            tempArr.splice(key, 1, temp)

                                            setServiceDet(tempArr)
                                        }}

                                    // onChangeText={txt => setSubrub(txt)}
                                    />
                                </View>
                            )
                        })}
                        </>
                        ):(
null
                        )}
                    </View>
                    <View style={{ width: '20%', flexDirection: "column", marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Location</Text>
                        {serviceDet?(
                            <>
                        {serviceDet.map((item, key) => {
                            return (
                                <View style={styles.editableBoxStyle}>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 10 }}
                                        autoCapitalize='none'
                                        value={item.pit_location} onChangeText={(e) => {
                                            setTempInput(e)
                                            let temp = { ...item, pit_location: e };
                                            let tempArr = serviceDet
                                            tempArr.splice(key, 1, temp)

                                            setServiceDet(tempArr)
                                        }}

                                    // onChangeText={txt => setSubrub(txt)}
                                    />
                                </View>
                            )
                        })}
                        </>):(
null
                        )}
                    </View>

                </View>
                <View style={{ flexDirection: 'row', marginTop: 20 }}>
                    <TouchableOpacity onPress={() => addRem(true)}
                        style={{ marginLeft: 20, justifyContent: 'center', alignItems: 'center', width: 130, height: 40, backgroundColor: mainBlue, borderRadius: 30 }}>
                        <Text style={{ color: mainWhite }}>Add Row +</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => addRem(false)}
                        style={{ marginLeft: 20, justifyContent: 'center', alignItems: 'center', width: 130, height: 40, backgroundColor: mainBlue, borderRadius: 30 }}>
                        <Text style={{ color: mainWhite }}>Remove Row -</Text>
                    </TouchableOpacity>
                </View>
                <View style={{ marginTop: 20, flex: 1, backgroundColor: lightGreyBackground, height: 40 }}>

                    <Text style={{ paddingLeft: 10, marginTop: 10, color: textBlack }}>Additional Informations</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Access Restrictions</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                            autoCapitalize='none'
                            value={access}

                            onChangeText={txt => setAccess(txt)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >TC required</Text>
                    </View>
                    <View style={{ flex: 0.1, }} />
                    {options.map((item, key) => {
                        return (

                            <TouchableOpacity onPress={() => settcreq(item)}
                                style={{ marginTop: 18, marginRight: '8%', flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row' }}>
                                <Text style={{ color: textBlack }}>{item.option}</Text>

                               {/* { tcreq.id!==""||null?
                               <>
                                {item.id === tcreq.id ? (
                                    <View style={{
                                        height: 18,
                                        width: 18,
                                        marginLeft: 5,
                                        borderWidth: 1,
                                        borderColor: textBlack,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Icon name="check" color={'#000'} size={15}></Icon>

                                    </View>
                                ) : (
                                        <View style={{
                                            height: 18,
                                            width: 18,
                                            marginLeft: 5,
                                            borderWidth: 1,
                                            borderColor: textBlack,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>

                                        </View>
                                    )}
                                    </>:(
                                        null
                                        )} */}
                            </TouchableOpacity>
                        )
                    })
                    }
                    
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Data Form</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    {options.map((item, key) => {
                        return (

                            <TouchableOpacity onPress={() => setdatareq(item)}
                                style={{ marginTop: 18, marginRight: '8%', flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row' }}>
                                <Text style={{ color: textBlack }}>{item.option}</Text>

                                {/* {item.id === datareq.id ? (
                                    <View style={{
                                        height: 18,
                                        width: 18,
                                        marginLeft: 5,
                                        borderWidth: 1,
                                        borderColor: textBlack,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Icon name="check" color={'#000'} size={15}></Icon>

                                    </View>
                                ) : (
                                        <View style={{
                                            height: 18,
                                            width: 18,
                                            marginLeft: 5,
                                            borderWidth: 1,
                                            borderColor: textBlack,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>

                                        </View>
                                    )} */}
                            </TouchableOpacity>
                        )
                    })
                    }
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Access Height</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                            autoCapitalize='none'
                            value={accessHeight}

                            onChangeText={txt => setAccessHeight(txt)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Key Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    {options.map((item, key) => {
                        return (

                            <TouchableOpacity onPress={() => setOption(item)}
                                style={{ marginTop: 18, marginRight: '8%', flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row' }}>
                                <Text style={{ color: textBlack }}>{item.option}</Text>

                                {item.id === optionData.id ? (
                                    <View style={{
                                        height: 18,
                                        width: 18,
                                        marginLeft: 5,
                                        borderWidth: 1,
                                        borderColor: textBlack,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Icon name="check" color={'#000'} size={15}></Icon>

                                    </View>
                                ) : (
                                        <View style={{
                                            height: 18,
                                            width: 18,
                                            marginLeft: 5,
                                            borderWidth: 1,
                                            borderColor: textBlack,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>

                                        </View>
                                    )}
                            </TouchableOpacity>
                        )
                    })
                    }
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Security Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    {options.map((item, key) => {
                        return (

                            <TouchableOpacity onPress={() => setsecurity(item)}
                                style={{ marginTop: 18, marginRight: '8%', flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row' }}>
                                <Text style={{ color: textBlack }}>{item.option}</Text>

                                {/* {item.id === security.id ? (
                                    <View style={{
                                        height: 18,
                                        width: 18,
                                        marginLeft: 5,
                                        borderWidth: 1,
                                        borderColor: textBlack,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Icon name="check" color={'#000'} size={15}></Icon>

                                    </View>
                                ) : (
                                        <View style={{
                                            height: 18,
                                            width: 18,
                                            marginLeft: 5,
                                            borderWidth: 1,
                                            borderColor: textBlack,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>

                                        </View>
                                    )} */}
                            </TouchableOpacity>
                        )
                    })
                    }
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Induction Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    {options.map((item, key) => {
                        return (
                            <TouchableOpacity onPress={() => setinduction(item)}
                                style={{ marginTop: 18, marginRight: '8%', flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row' }}>
                                <Text style={{ color: textBlack }}>{item.option}</Text>

                                {/* {item.id === induction.id ? (
                                    <View style={{
                                        height: 18,
                                        width: 18,
                                        marginLeft: 5,
                                        borderWidth: 1,
                                        borderColor: textBlack,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Icon name="check" color={'#000'} size={15}></Icon>

                                    </View>
                                ) : (
                                        <View style={{
                                            height: 18,
                                            width: 18,
                                            marginLeft: 5,
                                            borderWidth: 1,
                                            borderColor: textBlack,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>

                                        </View>
                                    )} */}
                            </TouchableOpacity>
                        )
                    })
                    }
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Contact Name</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                            autoCapitalize='none'
                            value={contName}

                            onChangeText={txt => setContName(txt)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Phone Number</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                            autoCapitalize='none'
                            value={contPh}

                            onChangeText={txt => setContPh(txt)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Type of Induction</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                            autoCapitalize='none'
                            value={typeOfInd}

                            onChangeText={txt => setTypeOfInd(txt)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Pit Location</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                            autoCapitalize='none'
                            value={pitLoc}

                            onChangeText={txt => setPitLoc(txt)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Water Tap Location</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                            autoCapitalize='none'
                            value={waterTap}

                            onChangeText={txt => setWaterTap(txt)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Gumy Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    {options.map((item, key) => {
                        return (
                            <TouchableOpacity onPress={() => setgumyreq(item)}
                                style={{ marginTop: 18, marginRight: '8%', flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row' }}>
                                <Text style={{ color: textBlack }}>{item.option}</Text>

                                {/* {item.id === gumyreq.id ? (
                                    <View style={{
                                        height: 18,
                                        width: 18,
                                        marginLeft: 5,
                                        borderWidth: 1,
                                        borderColor: textBlack,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Icon name="check" color={'#000'} size={15}></Icon>

                                    </View>
                                ) : (
                                        <View style={{
                                            height: 18,
                                            width: 18,
                                            marginLeft: 5,
                                            borderWidth: 1,
                                            borderColor: textBlack,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>

                                        </View>
                                    )} */}
                            </TouchableOpacity>
                        )
                    })
                    }
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Confined Space</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    {options.map((item, key) => {
                        return (

                            <TouchableOpacity onPress={() => setconfined(item)}
                                style={{ marginTop: 18, marginRight: '8%', flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row' }}>
                                <Text style={{ color: textBlack }}>{item.option}</Text>

                                {/* {item.id === confined.id ? (
                                    <View style={{
                                        height: 18,
                                        width: 18,
                                        marginLeft: 5,
                                        borderWidth: 1,
                                        borderColor: textBlack,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Icon name="check" color={'#000'} size={15}></Icon>

                                    </View>
                                ) : (
                                        <View style={{
                                            height: 18,
                                            width: 18,
                                            marginLeft: 5,
                                            borderWidth: 1,
                                            borderColor: textBlack,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>

                                        </View>
                                    )} */}
                            </TouchableOpacity>
                        )
                    })
                    }
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Truck Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                            autoCapitalize='none'
                            value={noTruck}

                            onChangeText={txt => setNoTruck(txt)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Service Time</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                            autoCapitalize='none'
                            value={servTime}

                            onChangeText={txt => setServTime(txt)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >PPE Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    {options.map((item, key) => {
                        return (
                            <TouchableOpacity onPress={() => setppe(item)}
                                style={{ marginTop: 18, marginRight: '8%', flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row' }}>
                                <Text style={{ color: textBlack }}>{item.option}</Text>

                                {item.id === ppe.id ? (
                                    <View style={{
                                        height: 18,
                                        width: 18,
                                        marginLeft: 5,
                                        borderWidth: 1,
                                        borderColor: textBlack,
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}>
                                        <Icon name="check" color={'#000'} size={15}></Icon>

                                    </View>
                                ) : (
                                        <View style={{
                                            height: 18,
                                            width: 18,
                                            marginLeft: 5,
                                            borderWidth: 1,
                                            borderColor: textBlack,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}>

                                        </View>
                                    )}
                            </TouchableOpacity>
                        )
                    })
                    }
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >If Yes ,Specify</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                            autoCapitalize='none'
                            value={specify}

                            onChangeText={txt => setSpecify(txt)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Completed By</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                            autoCapitalize='none'
                            value={compl}

                            onChangeText={txt => setCompl(txt)}
                        />
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Date</Text>
                    </View>
                    <View style={{ flex: 0.1, }} />
                    <View style={styles.editableBoxStyle}>
                        <Text  style={{height:40,marginTop:10}}
                        numberOfLines={1}>{formatted_date}</Text>
                    </View>
                </View>
                {button_disable === true ? (
                    <TouchableOpacity onPress={() => addJobCard()}
                        style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>

                        <View style={{ borderRadius: 20, height: 40, width: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: mainBlue }}>
                            {loader ? (
                                <ActivityIndicator size="small" color={mainWhite}></ActivityIndicator>
                            ) : (
                                    <Text style={{ color: mainWhite }}>Update Job Card</Text>
                                )}
                        </View>
                    </TouchableOpacity>
                ) : (
                        <View
                            style={{ opacity: 0.6, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
                            <View style={{ borderRadius: 20, height: 40, width: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: mainBlue }}>
                                <Text style={{ color: mainWhite }}>Update Job Card</Text>
                            </View>
                        </View>
                    )}
            </View>
        )
    }
    return (

        <ScrollView style={{ flex: 1, backgroundColor: mainWhite }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: mainWhite }}>


                <View style={{ flex: 1, backgroundColor: mainWhite }}>
                    <View style={{ backgroundColor: textGrey, height: 11 }}>
                    </View>

                </View>
                <RenderContacts />
            </SafeAreaView>
        </ScrollView>


    )
}
const mapStateProps = (state) => {
    const { selected_payment, types, job_full } = state.sales_enviroWaste

    const { client_list } = state.client
    return { client_list, selected_payment, types, job_full }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addJob1: (id, data, success, failed) => dispatch(edit_new_job_card(id, data, success, failed)),
        paymentData: (item) => dispatch(fetch_selected_payment(item))
    }
}



export default connect(mapStateProps, mapDispatchToProps)(UpdateJobCard)
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
        color: darkGrey
    },
    staticBoxStyle: {
        flex: 1,
        backgroundColor: mainWhite,
        height: 40,
        marginRight: 20,
        marginTop: 10,
        marginLeft: 20
    },
    editableBoxStyle: {
        flex: 1,
        backgroundColor: mainWhite,
        marginRight: 20,
        height: 40,
        marginTop: 5,
        borderBottomWidth: 1,
        borderColor: mainGrey
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }



});