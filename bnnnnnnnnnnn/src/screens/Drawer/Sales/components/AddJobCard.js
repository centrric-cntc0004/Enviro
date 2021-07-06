import React, { useState } from 'react'
import { View, Text, ActivityIndicator, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { mainWhite, mainBlue, mainGrey, textGrey, darkGrey, lightGrey, lightGreyBackground, lightGreen, mediumGrey, textBlack, textBlue } from '../../../../common/Colors'
import { fetch_selected_payment, add_new_job_card } from './common/action'
import ModalDropdown from 'react-native-modal-dropdown-v2'
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
let itemm = ""
import DatePicker from 'react-native-datepicker'
import Toast from 'react-native-simple-toast';



const AddJobCard = ({ paymentData, types, addJob, selected_payment, client_list, navigation, route, sales_enviroWaste, dispatch }) => {
    let paymentArray = [{ "id": 1, "name": 'cod' }, { "id": 2, "name": 'account' }, { "id": 3, "name": 'credit_card' }]
    let options = [{ "id": 1, "option": 'Yes' }, { "id": 2, "option": 'No' }]
    const [isCheck, setCheck] = useState(false)
    const [date, setDate] = useState('')
    const [optionData, setOption] = useState(options[0])
    const [tcreq, settcreq] = useState(options[0])
    const [loader, setLoader] = useState(false)

    const [datareq, setdatareq] = useState(options[0])
    const [keyreq, setkeyreq] = useState(options[0])
    const [security, setsecurity] = useState(options[0])
    const [induction, setinduction] = useState(options[0])
    const [gumyreq, setgumyreq] = useState(options[0])
    const [confined, setconfined] = useState(options[0])
    const [ppe, setppe] = useState(options[0])


    const [selectedItem, setSelected] = useState(paymentArray[0])
    const onSelect = (index) => {
        setDropdownData(dropdownData[index])
        setid(client_list[index].id)
        setCompName(client_list[index].client_name);
        setSuburb(client_list[index].site_suburb)
        setPostal(client_list[index].postal_code)
        setSiteAddr(client_list[index].site_address)
        setBuildName(client_list[index].building)
        setContactNo(client_list[index].company_contact_number)
        setContactEmail(client_list[index].company_email)
    }

    let dropdownData = []
    if (client_list) {
        client_list.map((item) => {
            const { client_name } = item

            return (
                dropdownData.push(client_name)
            )
        })
    }

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
    const [selectedData, setDropdownData] = useState(dropdownData[0])
    const [id, setid] = useState(client_list[0].id)

    const [compName, setCompName] = useState('')
    const [compAddr, setCompAddr] = useState('')
    const [suburb, setSuburb] = useState('')
    const [postal, setPostal] = useState('')
    const [siteAddr, setSiteAddr] = useState('')
    const [buildName, setBuildName] = useState('')
    const [contactName, setContactName] = useState('')
    const [contactNo, setContactNo] = useState('')
    const [contactEmail, setContactEmail] = useState('')
    const [payment, setPayment] = useState('COD')
    const [serviceDet, setServiceDet] = useState([{ no: 1, waste_type: '', capacity: '', frequency: '', pit_location: '' },
    { no: 2, waste_type: '', capacity: '', frequency: '', pit_location: '' },
    { no: 3, waste_type: '', capacity: '', frequency: '', pit_location: '' }])
    const [access, setAccess] = useState('')
    const [tcReq, setTcreq] = useState(false)
    const [accessHeight, setAccessHeight] = useState("")
    const [contName, setContName] = useState('')
    const [contPh, setContPh] = useState('')
    const [pitLoc, setPitLoc] = useState('')
    const [typeOfInd, setTypeOfInd] = useState('')
    const [waterTap, setWaterTap] = useState('')
    const [gumReq, setGumReq] = useState(false)
    const [noTruck, setNoTruck] = useState('')
    const [servTime, setServTime] = useState('')
    const [specify, setSpecify] = useState('')
    const [compl, setCompl] = useState('')
    const [tempInput, setTempInput] = useState('')

    const [jobDate, setJobDate] = useState('')

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
            // 'tab_type': types,
            'client': id,
            'payment_details': selected_payment.name,
            'company_name': compName,
            'company_address': compAddr,
            'suburb': suburb,
            'postal_code': postal,
            'job_site_address': siteAddr,
            'building_name': buildName,
            'contact_email_address': contactEmail,
            'contact_number': contactNo,
            'job_site_contact_name': contactName,
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
            'date': date + ' ' + '00:00:00',
        }


        const success = () => {
            setLoader(false)
            Toast.showWithGravity('Added Successfully', Toast.SHORT, Toast.BOTTOM);
            navigation.pop()

        }
        const failed = () => {
            setLoader(false)
            Toast.showWithGravity('Failed ! Try again', Toast.SHORT, Toast.BOTTOM);


        }


        addJob(postData, success, failed)


    }
    let button_disable = false
    if (id !== null && date !== "") {
        button_disable = true
    } else {
        button_disable = false
    }
    return (
        <ScrollView style={{ flex: 1, backgroundColor: mainWhite }}>
            <SafeAreaView style={{ flex: 1, backgroundColor: mainWhite }}>


                <View style={{ flex: 1, backgroundColor: mainWhite }}>
                    <View style={{ backgroundColor: textGrey, height: 11 }}>
                    </View>
                    <View style={{ flex: 1, backgroundColor: lightGreyBackground, height: 40 }}>

                        <Text style={{ paddingLeft: 10, marginTop: 10, color: textBlack }}>Customer Details</Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Company Name</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <ModalDropdown
                                options={dropdownData}
                                defaultIndex={0}
                                textStyle={{ color: mainGrey, fontSize: 14 }}
                                dropdownStyle={{ width: 170, height: 160 }}
                                dropdownTextStyle={{ color: mainGrey, fontSize: 14, paddingLeft: 10 }}
                                dropdownTextHighlightStyle={{ color: mainGrey, fontSize: 14, paddingLeft: 10 }}
                                onSelect={(index) => onSelect(index)}>

                                <View style={{ alignItems: 'center', flexDirection: 'row' }}>
                                    <View style={{ flex: 5 }}>
                                        <Text style={{ height: 40, marginTop: 5, color: mainGrey, fontSize: 14, paddingLeft: 5 }} >{selectedData}</Text>
                                    </View>

                                    <View style={{ flex: 1, height: 40, marginTop: 5, }}>
                                        <Icon name="chevron-down" size={16} color={mainGrey} />
                                    </View>
                                </View>
                            </ModalDropdown>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Company Address</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                                autoCapitalize='none'
                                value={compAddr}

                                onChangeText={txt => setCompAddr(txt)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Subrub</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                                autoCapitalize='none'
                                value={suburb}

                                onChangeText={txt => setSuburb(txt)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Postal Code</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                                autoCapitalize='none'
                                value={postal}

                                onChangeText={txt => setPostal(txt)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Job Site Address</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                                autoCapitalize='none'
                                value={siteAddr}

                                onChangeText={txt => setSiteAddr(txt)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Building Name</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                                autoCapitalize='none'
                                value={buildName}

                                onChangeText={txt => setBuildName(txt)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Site Contact Number</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                                autoCapitalize='none'
                                value={contName}
                                keyboardType="number-pad"


                                onChangeText={txt => setContName(txt)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Contact Number</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                                autoCapitalize='none'
                                value={contactNo}
                                keyboardType="number-pad"

                                onChangeText={txt => setContactNo(txt)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Contact Email Address</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 5 }}
                                autoCapitalize='none'
                                value={contactEmail}

                                onChangeText={txt => setContactEmail(txt)}
                            />
                        </View>
                    </View>
                </View>
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
                        {serviceDet.map((item, key) => {
                            return (

                                <Text
                                    style={{ height: 40, marginTop: 5, }}>{key + 1}</Text>
                            )
                        })}

                    </View>
                    <View style={{ width: '20%', flexDirection: "column", }}>
                        <Text style={{ fontWeight: 'bold' }}>Type</Text>

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

                    </View>
                    <View style={{ width: '20%', flexDirection: "column", marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Capacity</Text>
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

                    </View>
                    <View style={{ width: '20%', flexDirection: "column", marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Frequency</Text>
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
                    </View>
                    <View style={{ width: '20%', flexDirection: "column", marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Location</Text>
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
                    <View style={{ flex: 0.1 }} />
                    {options.map((item, key) => {
                        return (

                            <TouchableOpacity onPress={() => settcreq(item)}
                                style={{ marginTop: 18, marginRight: 45, flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row' }}>
                                <Text style={{ color: textBlack }}>{item.option}</Text>

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
                                style={{ marginTop: 18, marginRight: 45, flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row' }}>
                                <Text style={{ color: textBlack }}>{item.option}</Text>

                                {item.id === datareq.id ? (
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
                                style={{ marginTop: 18, marginRight: 45, flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row' }}>
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
                                style={{ marginTop: 18, marginRight: 45, flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row' }}>
                                <Text style={{ color: textBlack }}>{item.option}</Text>

                                {item.id === security.id ? (
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
                        <Text style={styles.textStyle} >Induction Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    {options.map((item, key) => {
                        return (
                            <TouchableOpacity onPress={() => setinduction(item)}
                                style={{ marginTop: 18, marginRight: 45, flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row' }}>
                                <Text style={{ color: textBlack }}>{item.option}</Text>

                                {item.id === induction.id ? (
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
                            style={{ color: mainGrey, fontSize: 14, width: 150 }}
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
                            style={{ color: mainGrey, fontSize: 14, width: 150 }}
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
                            style={{ color: mainGrey, fontSize: 14, width: 150 }}
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
                                style={{ marginTop: 18, marginRight: 45, flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row' }}>
                                <Text style={{ color: textBlack }}>{item.option}</Text>

                                {item.id === gumyreq.id ? (
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
                        <Text style={styles.textStyle} >Confined Space</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    {options.map((item, key) => {
                        return (

                            <TouchableOpacity onPress={() => setconfined(item)}
                                style={{ marginTop: 18, marginRight: 45, flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row' }}>
                                <Text style={{ color: textBlack }}>{item.option}</Text>

                                {item.id === confined.id ? (
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
                                style={{ marginTop: 18, marginRight: 45, flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row' }}>
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
                    <DatePicker
                        style={{
                            width: 87,
                            marginRight: "27%"

                        }}
                        date={date}
                        mode="date"
                        placeholder="yyyy-mm-dd"
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

                        onDateChange={(date) => { setDate(date) }}

                    />
                </View>
                {button_disable === true ? (
                    <TouchableOpacity onPress={() => addJobCard()}
                        style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>

                        <View style={{ borderRadius: 20, height: 40, width: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: mainBlue }}>
                            {loader ? (
                                <ActivityIndicator size="small" color={mainWhite}></ActivityIndicator>
                            ) : (
                                    <Text style={{ color: mainWhite }}>Create Job Card</Text>
                                )}
                        </View>
                    </TouchableOpacity>
                ) : (
                        <View
                            style={{ opacity: 0.6, justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>
                            <View style={{ borderRadius: 20, height: 40, width: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: mainBlue }}>
                                <Text style={{ color: mainWhite }}>Create Job Card</Text>
                            </View>
                        </View>
                    )}
            </SafeAreaView>
        </ScrollView>


    )
}
const mapStateProps = (state) => {
    const { selected_payment, types } = state.sales_enviroWaste

    const { client_list } = state.client
    return { client_list, selected_payment, types }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addJob: (data, success, failed) => dispatch(add_new_job_card(data, success, failed)),
        paymentData: (item) => dispatch(fetch_selected_payment(item))
    }
}



export default connect(mapStateProps, mapDispatchToProps)(AddJobCard)
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