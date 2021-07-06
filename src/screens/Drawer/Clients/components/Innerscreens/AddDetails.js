import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ActivityIndicator,Alert } from 'react-native'
import { lightGrey, mainGrey, darkGrey, mainBlue, mainWhite, lightGreen, textGrey, textBlack, lightGreyBackground } from '../../../../../common/Colors'
import { connect } from 'react-redux'
import Dropdown from './Dropdown'
import { edit_client, } from '../../action'
let post_data = 0
let days_data = 0
let week_data = 0
import moment from "moment"
import DatePicker from 'react-native-datepicker'
let formatted_date = ""
let formatted_date2 = ""
import Toast from 'react-native-simple-toast';
import Icon1 from 'react-native-vector-icons/MaterialIcons'

import { ClientImage } from '../../../../../common/Images'

const AddDetails = ({ navigation, data, clientdata, client, dispatch }) => {

    const { selected_client, typedata,temp_client_location } = client

    const RenderContacts = () => {


        let data1 = [{ "value": "manager" }, { "value": "driver" }, { "value": "others" }]
        let payment = [{ "value": "Charge" }, { "value": "No Charge" }]
        let Induction = [{ "value": "true" }, { "value": "false" }]
        let key_required = [{ "value": "YES" }, { "value": "NO" }]
        let account_data = [{ "value": "Credit" }, { "value": "Pending" }, { "value": "Active" }]
        let call_type = [{ "value": "Chep" }, { "value": "Loscam" }, { "value": "Plain" }]
        let pellet_array = [{ name: 'YES', value: 'YES' }, { name: 'NO', value: 'NO' },
        { name: 'NOT APPLICABLE', value: 'NOT APPLICABLE' }]
        const [userNameAlert, setUserNameAlert] = useState(false)
        const [userEmailAlert, setUserEmailAlert] = useState(false)
        const[msg,setMsg]=useState("")

        let account_type_array = [
            { name: '7 Days', value: '7 Days' },
            { name: '14 Days', value: '14 Days' },
            { name: '30 Days', value: '30 Days' },
            { name: '60 Days', value: '60 Days' },
            { name: 'Select Option', value: '' }]
        let cancel_array = [
            { name: 'Select Option', value: '' },
            { name: 'MOVED PREMISES', value: 'MOVED PREMISES' },
            { name: 'NEW OWNER', value: 'NEW OWNER' },
            { name: 'POOR SERVICE', value: 'POOR SERVICE' },
            { name: 'SHOP CLOSE DOWN', value: 'SHOP CLOSE DOWN' },
            { name: 'TOO EXPENSIVE', value: 'TOO EXPENSIVE' },
            { name: 'NOT APPLICABLE', value: 'NOT APPLICABLE' }
        ]

        let payment_array = [
            { name: 'Select Option', value: '' },
            { name: 'ACCOUNTS', value: 'ACCOUNTS' },
            { name: 'COD', value: 'COD' },
            { name: 'CREDIT CARD', value: 'CREDIT CARD' },
            { name: 'NO CHARGE', value: 'NO CHARGE' },
            { name: 'PRE-PAID', value: 'PRE-PAID' },
            { name: 'NOT APPLICABLE', value: 'NOT APPLICABLE' }
        ]
        let person_array = typedata === 'waste' ?
            [
                { name: 'RICHARD', value: 'RICHARD' },
                { name: 'MATHEW', value: 'MATHEW' },
                { name: 'MICHEAL', value: 'MICHEAL' },
                { name: 'MATTHEW D', value: 'MATTHEW D' },
                { name: 'JAKE', value: 'JAKE' },
                { name: 'NOT APPLICABLE', value: 'NOT APPLICABLE' }
            ]
            : typedata === 'pumps' ?
                [
                    { name: 'MATT', value: 'MATT' },
                    { name: 'MATTHEW D', value: 'MATTHEW D' },
                    { name: 'JAKE', value: 'JAKE' },
                    { name: 'NOT APPLICABLE', value: 'NOT APPLICABLE' }
                ]
                :
                [
                    { name: 'MATTHEW D', value: 'MATTHEW D' },
                    { name: 'JAKE', value: 'JAKE' },
                    { name: 'NOT APPLICABLE', value: 'NOT APPLICABLE' }
                ]


        let type_array = [

            { name: 'FOOD WASTE', value: 'FOOD WASTE' },
            { name: 'GERNIE WASHES', value: 'GERNIE WASHES' },
            { name: 'GREASE', value: 'GREASE' },
            { name: 'GROUND WATER', value: 'GROUND WATER' },
            { name: 'J120', value: 'J120' },
            { name: 'LEVY', value: 'LEVY' },
            { name: 'M250', value: 'M250' },
            { name: 'N205', value: 'N205' },
            { name: 'PACKAGED WASTE', value: 'PACKAGED WASTE' },
            { name: 'PRODUCT DESTRUCTION', value: 'PRODUCT DESTRUCTION' },
            { name: 'SEWER', value: 'SEWER' },
            { name: 'STORMWATER', value: 'STORMWATER' },
            { name: 'TANK WASH OUT', value: 'TANK WASH OUT' },
            { name: 'TRANSPORT', value: 'TRANSPORT' },
            { name: 'Z140', value: 'Z140' },
        ]
        let status_array = [{ name: 'ACTIVE', value: 'ACTIVE' },
        { name: 'ON HOLD', value: 'ON HOLD' },
        { name: 'CANCELLED/UNACTIVE', value: 'CANCELLED/UNACTIVE' },
        { name: 'NOT APPLICABLE', value: 'NOT APPLICABLE' }]
        let job_array = [{ name: 'CALL', value: 'CALL' },
        { name: 'CANCELLED', value: 'CANCELLED' },
        { name: 'COVID', value: 'COVID' },
        { name: 'ON HOLD', value: 'ON HOLD' },
        { name: 'ON OFF', value: 'ON OFF' },
        { name: 'RECURRING', value: 'RECURRING' },
        { name: 'NOT APPLICABLE', value: 'NOT APPLICABLE' }]
        let dropdownStatus = []
        if (status_array) {
            status_array.map((item) => {
                const { value } = item
                return (
                    dropdownStatus.push(value)
                )
            })
        }
        let dropdownjob = []
        if (job_array) {
            job_array.map((item) => {
                const { value } = item
                return (
                    dropdownjob.push(value)
                )
            })
        }
        let dropdownPellet = []
        if (pellet_array) {
            pellet_array.map((item) => {
                const { value } = item
                return (
                    dropdownPellet.push(value)
                )
            })
        }
        let dropdownPerson = []
        if (person_array) {
            person_array.map((item) => {
                const { value } = item
                return (
                    dropdownPerson.push(value)
                )
            })
        }
        console.log("data" + JSON.stringify(selected_client))
        let dropdownAccount = []
        if (account_type_array) {
            account_type_array.map((item) => {
                const { value } = item
                return (
                    dropdownAccount.push(value)
                )
            })
        }
        let dropdownCancel = []
        if (cancel_array) {
            cancel_array.map((item) => {
                const { value } = item
                return (
                    dropdownCancel.push(value)
                )
            })
        }
        let dropdownPayment = []
        if (payment_array) {
            payment_array.map((item) => {
                const { value } = item
                return (
                    dropdownPayment.push(value)
                )
            })
        }
        let dropdownType = []
        if (type_array) {
            type_array.map((item) => {
                const { value } = item
                return (
                    dropdownType.push(value)
                )
            })
        }
        let site_data = selected_client.site_suburb



        let address_data = selected_client.site_address
        let subrub_data = selected_client.site_suburb
        let company_subrub = selected_client.company_subrub


        let barcode_data = selected_client.barcode
        let accounts_data = selected_client.account_type
        let payment_data = selected_client.payment_type
        let bill_data = selected_client.pricing_billing
        let key_data = selected_client.key_required_type_str
        let induction = selected_client.induction_type

        let days_data = selected_client.frequency


        if (selected_client.frequency_weeks !== null) {
            // week_data = selected_client.frequency_weeks.toString()

        } else {
            week_data = 0

        }
        if (selected_client.next_service_1 === null) {
            formatted_date = ""
        } else {
            let date_val = new Date(selected_client.next_service_1)
            formatted_date = moment(date_val).format('YYYY-MM-DD')
        }

        if (selected_client.last_service === null) {
            formatted_date2 = ""
        } else {
            let date_val2 = new Date(selected_client.last_service)
            // formatted_date2 = moment(date_val2).format('YYYY-MM-DD')
        }
  console.log("kjshkjhakjdhkj"+data.visible)



        let service1_data = formatted_date
        let service2_data = formatted_date2
        let capacity_data = selected_client.device_capacity
        let lastservice_data = selected_client.next_service
        let restriction_data = selected_client.access_restriction
        let location_data = selected_client.pit_location
        let info_data = selected_client.information
        let call_data = selected_client.call_type


        let compaName = selected_client.company_name
        let compaAdd = selected_client.company_address
        let salesPersons = selected_client.sales_person
        let name_data = selected_client.company_contact_number
        let landline_data = selected_client.company_landline_number
        let mob_data = selected_client.company_mobile_number
        let email_data = selected_client.company_email
        if (selected_client.company_postcode !== null) {
            post_data = selected_client.company_postcode.toString()

        } else {
            post_data = 0

        }






        let invoicename = selected_client.invoice_name
        let invoiceaddress = selected_client.invoice_address
        let invoicephone = selected_client.invoice_phone
        let invoiceemail = selected_client.invoice_email
        let invoiceaccountstatus = selected_client.invoice_account_status
        let termsofaccount = selected_client.invoice_terms_of_account
        let reasonforcancelling = selected_client.invoice_reason_for_cancelling
        let paymenttype = selected_client.payment_type_str
        let purchaseno = selected_client.invoice_purchase_no

        let sitepostcode = selected_client.site_post_code
        let sitecontactperson = selected_client.site_contact_person
        let sitecontactmob = selected_client.site_contact_mob
        let sitephoneno = selected_client.site_phone_no
        let sitename = selected_client.client_name
        let siteemail = selected_client.client_email

        let typewaste = selected_client.waste_type_str
        let price = selected_client.price
        let jobduration = selected_client.job_duration
        let jobstatus = selected_client.job_status

        let alarmcode = selected_client.alarm_code
        let weighbridgerequired = selected_client.weigh_bridge_required
        let pelletstobeexchanged = selected_client.pellets_to_be_exchanged_str
        let quantity = selected_client.quantity
        let next = selected_client.next_service
        let last = selected_client.last_service
        console.log("last_service" + selected_client.last_service)

        const [prices, setprices] = useState(price)
        const [jobD, setjobD] = useState(jobduration)
        const [jobS, setjobS] = useState(jobstatus)
        const [alarmC, setalarmC] = useState(alarmcode)
        const [weight, setweight] = useState(weighbridgerequired)
        const [pellet, setpellet] = useState(pelletstobeexchanged)
        const [quantitys, setQuantity] = useState(quantity)
        const [nexts, setnexts] = useState(next)
        const [lasts, setlasts] = useState(last)
        const [waste, setWaste] = useState(typewaste)




        const [siteN, setsiteN] = useState(sitename)
        const [sitePh, setsitePh] = useState(sitephoneno)
        const [siteContM, setsiteContM] = useState(sitecontactmob)
        const [siteE, setsiteE] = useState(siteemail)
        const [siteContP, setsiteContP] = useState(sitecontactperson)
        const [sitePo, setsitePo] = useState(sitepostcode)


        const [invoiceN, setinvoiceN] = useState(invoicename)
        const [invoiceA, setinvoiceA] = useState(invoiceaddress)
        const [invoiceP, setinvoiceP] = useState(invoicephone)
        const [invoiceE, setinvoiceE] = useState(invoiceemail)
        const [invoiceAcc, setinvoiceAcc] = useState(invoiceaccountstatus)
        const [invoiceTacc, setinvoiceTacc] = useState(termsofaccount)
        const [invoiceRe, setinvoiceRe] = useState(reasonforcancelling)
        const [invoicePa, setinvoicePa] = useState(paymenttype)
        const [invoicePurc, setinvoicePurc] = useState(purchaseno)


        const [site, setSite] = useState(site_data)
        const [postcode, setPostcode] = useState(post_data)
        // const [address, setAddress] = useState(address_data)
        // const [subrub, setSubrub] = useState(subrub_data)
        const [name, setName] = useState(name_data)
        const [landline, setLandline] = useState(landline_data)
        const [mobile, setMobile] = useState(mob_data)
        const [email, setEmail] = useState(email_data)
        const [barcode, setBarcode] = useState(barcode_data)
        const [accounts, setAccount] = useState(accounts_data)
        const [payments, setPayment] = useState(payment_data)
        const [bill, setBill] = useState(bill_data)
        const [key, setKey] = useState(key_data)
        const [inductions, setInduction] = useState(induction)
        const [days, setDays] = useState(days_data)
        const [week, setWeek] = useState(week_data)
        const [service1, setService1] = useState(service1_data)
        const [service2, setService2] = useState(service2_data)
        const [call, setCall] = useState(call_data)
        const [deviceCapacity, setdeviceCapacity] = useState(capacity_data)
        const [deviceWaste, setdeviceWaste] = useState('')
        const [lastService, setlastService] = useState(lastservice_data)
        const [restrict, setRestrict] = useState(restriction_data)
        const [location, setLocation] = useState(location_data)
        const [information, setInformation] = useState(info_data)
        const [date, setdate] = useState('')
        const [nextService, setnextService] = useState('')
        const [nextService11, setnextService11] = useState('')
        const [nextService21, setnextService21] = useState('')
        const [companysubrub, setCSubrub] = useState(company_subrub)
        const [comapantname, setComName] = useState(compaName)
        const [comapantadd, setComAdd] = useState(compaAdd)
        const [salesPerson, setComPerson] = useState(salesPersons)


        const [loader, setLoader] = useState(false)
        let dropdownData = []
        if (data1) {
            data1.map((item) => {
                const { value } = item
                return (
                    dropdownData.push(value)
                )
            })
        }
        let dropdownData1 = []
        if (payment) {
            payment.map((item) => {
                const { value } = item
                return (
                    dropdownData1.push(value)
                )
            })
        }
        let dropdownData2 = []
        if (Induction) {
            Induction.map((item) => {
                const { value } = item
                return (
                    dropdownData2.push(value)
                )
            })
        }
        let dropdownData3 = []
        if (key_required) {
            key_required.map((item) => {
                const { value } = item
                return (
                    dropdownData3.push(value)
                )
            })
        }

        let dropdownData4 = []
        if (account_data) {
            account_data.map((item) => {
                const { value } = item
                return (
                    dropdownData4.push(value)
                )
            })
        }

        const selectData1 = (index) => {
            console.log('Selected index : ' + payment[index].value)
            setPayment(payment[index].value)
        }
        const selectData2 = (index) => {
            console.log('Selected index : ' + Induction[index].value)
            setInduction(Induction[index].value)
        }
        const selectData3 = (index) => {
            console.log('Selected index : ' + key_required[index].value)
            setKey(key_required[index].value)
        }
        const selectData4 = (index) => {
            console.log('Selected index : ' + dropdownAccount[index].value)
            setinvoiceTacc(dropdownAccount[index])
        }
        const selectData5 = (index) => {
            console.log('Selected index : ' + type_array[index].value)
            setWaste(type_array[index].value)
        }
        const selectData6 = (index) => {
            // console.log('Selected index : ' + call_type[index].value)
            setinvoiceRe(dropdownCancel[index])
        }
        const selectData7 = (index) => {
            console.log('Selected index : ' + dropdownPayment[index])
            setinvoicePa(dropdownPayment[index])
        }
        const selectData8 = (index) => {
            // console.log('Selected index : ' + call_type[index].value)
            setinvoiceAcc(dropdownStatus[index])
        }
        const selectData9 = (index) => {
            // console.log('Selected index : ' + call_type[index].value)
            setComPerson(dropdownPerson[index])
        }
        const selectData10 = (index) => {
            console.log('Selected index : ' + dropdownjob[index])
            setjobS(dropdownjob[index])
        }
        const selectData11 = (index) => {
            // console.log('Selected index : ' + call_type[index].value)
            setpellet(dropdownPellet[index])
        }

        let edit_btn_status = ""
       
        if (data.client_name !== selected_client.client_name || data.dp !==selected_client.dp_thumbnail||
            data.site_address !== selected_client.site_address ||
            data.site_post_code !== selected_client.site_post_code ||
            data.site_phone_no !== selected_client.site_phone_no ||
            data.site_contact_mob !== selected_client.site_contact_mob ||
            data.site_contact_person !== selected_client.site_contact_person
            || data.client_email !== selected_client.client_email
            || data.induction_required !== selected_client.induction_required_str ||
            data.induction_type !== selected_client.induction_type ||
            postcode !== post_data || waste !== selected_client.waste_type_str ||
            pellet !== selected_client.pellets_to_be_exchanged_str

            || name !== name_data || landline !== landline_data || mobile !== mob_data
            || email !== email_data
            || barcode !== barcode_data || accounts !== accounts_data
            || payments !== payment_data || bill !== bill_data
            || key !== key_data || induction !== inductions || days_data !== days
            || week_data !== week || service1_data !== service1
            || service2 !== service2_data || deviceCapacity !== capacity_data
            || information !== info_data
            || location_data !== location || restrict !== restriction_data
            || call_data !== call || prices !== price || jobD !== jobduration || jobS !== jobstatus || alarmC !== alarmcode

            || weight !== weighbridgerequired || quantitys !== quantity || nexts !== next || nexts !== next || siteN !== sitename || siteContM !== sitecontactmob || siteE !== siteemail
            || siteContP !== sitecontactperson || sitePo !== sitepostcode || invoiceN !== invoicename || invoiceA !== invoiceaddress || invoiceP !== invoicephone
            ||
            invoiceAcc !== invoiceaccountstatus || invoiceE !== invoiceemail || invoiceTacc !== termsofaccount
            || invoiceRe !== reasonforcancelling || invoicePa !== paymenttype || data.invoice_purchase_no !== purchaseno
            ||
            comapantname !== compaName || comapantadd !== compaAdd || salesPerson !== salesPersons

               
          
        ) {

            edit_btn_status = true
        } else {


            edit_btn_status = false
        }
        console.log("data.invoice_purchase_no" + data.invoice_purchase_no)



        const editProfile = () => {
            if(!validateEmail(data.client_email)){
                setMsg("Please enter valid email id")
            }else if(isNaN(postcode)){
                setPostcode('')

            }else if(isNaN(name)){
                setName('')

            }else if(isNaN(invoiceP)){
                setinvoiceP('')

            }
                else{
                setMsg("")

            setLoader(true)
            var data1 = new FormData();
            console.log("data" + JSON.stringify(data))
            data1.append('client_id', data.client_id);
            data1.append('client_name', data.client_name);
            data1.append('client_email', data.client_email);
            data1.append('building', data.client_building);

            data1.append('waste_type_str', waste)

            // data1.append('place', data.client_place);
            data1.append('device_capacity', deviceCapacity);
            data1.append('barcode', barcode);


            data1.append('site_address', data.site_address);
            data1.append('site_post_code', data.site_post_code)
            data1.append('site_phone_no', data.site_phone_no)
            data1.append('site_contact_person', data.site_contact_person)
            data1.append('site_contact_mob', data.site_contact_mob)
            // data1.append('site_suburb', subrub);


            data1.append('company_name', comapantname)
            data1.append('company_address', comapantadd)
            data1.append('sales_person', salesPerson)

            data1.append('invoice_name', invoiceN)
            data1.append('invoice_address', invoiceA)
            data1.append('invoice_phone', invoiceP)
            data1.append('invoice_email', invoiceE)
            data1.append('invoice_terms_of_account', invoiceTacc)
            data1.append('invoice_account_status', invoiceAcc)
            data1.append('invoice_reason_for_cancelling', invoiceRe)
            data1.append('invoice_purchase_no', data.invoice_purchase_no)

            data1.append('price', prices)
            if (lasts !== '' && lasts !== null)
                data1.append('last_service', lasts)
            if (nexts !== '' && nexts !== null)
                data1.append('next_service', nexts)


            data1.append('job_status', jobS)
            data1.append('job_duration', jobD)
            data1.append('alarm_code', alarmC)
            data1.append('weigh_bridge_required', weight)
            data1.append('pellets_to_be_exchanged_str', pellet)
            data1.append('quantity', quantitys)
            data1.append('frequency', days);

            // data1.append('post_code', postcode);
            //  data1.append('account_type', accounts);
            data1.append('pit_location', location);
            // data1.append('call_type', call);
            data1.append('access_restriction', restrict);
            // data.append('company_suburb', CompanySuburb);
            data1.append('company_mobile_number', mobile);
            data1.append('company_landline_number', landline);
            data1.append('company_email', email);
            data1.append('company_postcode', postcode);
            data1.append('information', information);
            // data1.append('pricing_billing', bill);

            data1.append('payment_type', payments);
            data1.append('induction_type', data.induction_type);
            data1.append('induction_required_str', data.induction_required);

            data1.append('key_required_type_str', key);
            // data1.append('frequency_weeks', week);
            // data1.append('frequency_days', days);
            data1.append('location_latitude', temp_client_location.latitude);
            data1.append('location_logitude', temp_client_location.logitude);
            data1.append('device_waste', "");
            data1.append('barcode', barcode);
            data1.append('company_suburb', companysubrub);
            data1.append('company_contact_number', name);
            data1.append('payment_type_str', invoicePa);
            if (data.dp) {
                data1.append('dp', {
                    uri: data.dp,
                    type: 'image/jpg' || 'image/png' || 'image/jpeg',
                    name: "image.jpg" || "image.png"
                })
            } else {

            }
            const success = (res) => {
                setLoader(false)

                Toast.showWithGravity('Updated Successfully', Toast.SHORT, Toast.BOTTOM);

                // navigation.pop()
            }

            const failed = (res) => {
                setLoader(false)
                Alert.alert(  
                    'Failed!',  
                    res.data.app_data,  
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
            console.log("typedata" + typedata)

            dispatch(edit_client(data1, selected_client.id, success, failed, typedata))
        }
        }

        const validateEmail = (email) => {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };

        return (
            <View style={{ flex: 1, backgroundColor: lightGrey, }}>
                <View style={{ flex: 9, backgroundColor: lightGrey, flexDirection: 'column', height: 1800 }}>
                    <View style={{ marginTop: 10, height: 40, backgroundColor: lightGreyBackground }}>
                        <Text style={{ fontSize: 14, fontWeight: '900', paddingTop: 10, paddingLeft: 10, paddingRight: 5, color: textBlack }}>Company Details
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Company Name</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14,  }}
                                autoCapitalize='none'
                                value={comapantname}
                                editable={false}
                                numberOfLines={1}

                                onChangeText={txt => setComName(txt)}
                            />
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
                                style={{ color: mainGrey, fontSize: 14,paddingLeft:2  }}
                                autoCapitalize='none'
                                value={comapantadd}
                                editable={false}
numberOfLines={1}
                                onChangeText={txt => setComAdd(txt)}
                            />
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Company Postcode</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                keyboardType={"number-pad"}
                                value={postcode}
                                editable={false}

                                onChangeText={txt => setPostcode(txt)}
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
                            numberOfLines={1}
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, }}
                                autoCapitalize='none'
                                value={name}
                                editable={false}


                                keyboardType={"number-pad"}
                                onChangeText={txt => setName(txt)}
                            />
                        </View>
                    </View>
                    {/* <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Mobile Number</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={mobile}
                                keyboardType={"number-pad"}
                                onChangeText={txt => setMobile(txt)}
                            />
                        </View>
                    </View> */}
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Company Email</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle1}>


                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, }}
                                autoCapitalize='none'
                                value={email}
                                editable={false}
                                numberOfLines={1}

                                // onChangeText={txt => setEmail(txt)}
                                placeholder={'Email'}
                                onChangeText={txt => {
                                    setEmail(txt)
                                    if (!validateEmail(txt)) {
                                        console.log("ghhhhhhhhhh")
                                        setUserNameAlert(true)

                                        // not a valid email
                                    } else {
                                        setUserNameAlert(false)

                                        // valid email
                                    }

                                }}

                            />
                            {userNameAlert ? (
                                <Icon1 style={{ alignSelf: 'center' }}
                                    name="error" size={20} color="red" />
                            ) : (
                                    null
                                )}
                        </View>


                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Sales Person</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>

                            {/* <Dropdown
                                dropdown_data={dropdownPerson}
                                selectData={selectData9}
                                initialvalue={salesPerson}

                            /> */}
                         <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, }}
                                autoCapitalize='none'
                                value={salesPerson}
                                editable={false}
                                numberOfLines={1}


                                onChangeText={txt => setinvoiceN(txt)}
                            />
                        </View>
                    </View>
                    {/* <View style={{ marginTop: 20, height: 40, backgroundColor: lightGreyBackground }}>
                        <Text style={{ fontSize: 14, fontWeight: '900', paddingTop: 10, paddingLeft: 10, paddingRight: 5, color: textBlack }}>Site Details
                        </Text>
                    </View> */}
                    {/* <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Site Name</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={siteN}

                                onChangeText={txt => setsiteN(txt)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Site Address</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'

                                value={address}
                                onChangeText={txt => setAddress(txt)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Site PostCode</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'

                                value={sitePo}
                                onChangeText={txt => setsitePo(txt)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Site Contact</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'

                                value={siteContP}
                                onChangeText={txt => setsiteContP(txt)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Site Phoneno</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'

                                value={sitePh}
                                onChangeText={txt => setsitePh(txt)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Site ContactMob</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'

                                value={siteContM}
                                onChangeText={txt => setsiteContM(txt)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Site Email</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'

                                value={siteE}
                                onChangeText={txt => setsiteE(txt)}
                            />
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Site Contact</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={subrub}

                                onChangeText={txt => setSubrub(txt)}
                            />
                        </View>
                    </View>




                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Induction Type</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Dropdown
                                dropdown_data={dropdownData2}
                                selectData={selectData2}
                                // initialvalue={inductions}

                            />
                        </View>
                    </View>

 */}


                    <View style={{ marginTop: 20, height: 40, backgroundColor: lightGreyBackground }}>
                        <Text style={{ fontSize: 14, fontWeight: '900', paddingTop: 10, paddingLeft: 10, paddingRight: 5, color: textBlack }}>Invoicing Details
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} > Name</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={invoiceN}
                                editable={false}

                                onChangeText={txt => setinvoiceN(txt)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Address</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={invoiceA}
                                editable={false}
                                onChangeText={txt => setinvoiceA(txt)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Phone</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                keyboardType={"number-pad"}
                                value={invoiceP}
                                editable={false}
                                onChangeText={txt => setinvoiceP(txt)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Email</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle1}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 120 }}
                                autoCapitalize='none'
                                value={invoiceE}
                                editable={false}
                                onChangeText={txt => {
                                    setinvoiceE(txt)
                                    if (!validateEmail(txt)) {
                                        console.log("ghhhhhhhhhh")
                                        setUserEmailAlert(true)

                                        // not a valid email
                                    } else {
                                        setUserEmailAlert(false)

                                        // valid email
                                    }

                                }}

                            />
                            {userEmailAlert ? (
                                <Icon1 style={{ alignSelf: 'center' }}
                                    name="error" size={20} color="red" />
                            ) : (
                                    null
                                )}

                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Term of account</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>

                            {/* <Dropdown
                                dropdown_data={dropdownAccount}
                                selectData={selectData4}
                                initialvalue={invoiceTacc}

                            /> */}
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={invoiceTacc}
                                editable={false}
                                onChangeText={txt => setinvoicePurc(txt)}
                            />
                           
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Account Status</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            {/* <Dropdown
                                dropdown_data={dropdownStatus}
                                selectData={selectData8}
                                initialvalue={invoiceAcc}

                            /> */}
                                <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={invoiceAcc}
                                editable={false}
                                onChangeText={txt => setinvoicePurc(txt)}
                            />
                           
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Reason For Cancelling</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            {/* <Dropdown
                                dropdown_data={dropdownCancel}
                                selectData={selectData6}
                                initialvalue={invoiceRe}

                            /> */}
                            
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={invoiceRe}
                                editable={false}
                                onChangeText={txt => setinvoicePurc(txt)}
                            />

                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Payment Type</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            {/* <Dropdown
                                dropdown_data={dropdownPayment}
                                selectData={selectData7}
                                initialvalue={invoicePa}

                            /> */}
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={invoicePa}
                                editable={false}
                                onChangeText={txt => setinvoicePurc(txt)}
                            />
                            {/* <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={invoicePa}
                                onChangeText={txt => setinvoicePa(txt)}
                            /> */}
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Purchase No</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={invoicePurc}
                                editable={false}
                                onChangeText={txt => setinvoicePurc(txt)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Price</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={prices}
                                editable={false}
                                onChangeText={txt => setprices(txt)}
                            />
                        </View>
                    </View>

                    <View style={{ marginTop: 20, height: 40, backgroundColor: lightGreyBackground }}>
                        <Text style={{ fontSize: 14, fontWeight: '900', paddingTop: 10, paddingLeft: 10, paddingRight: 5, color: textBlack }}>Waste Services
                        </Text>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Type of wastes</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            {/* <Dropdown
                                dropdown_data={dropdownType}
                                selectData={selectData5}
                                initialvalue={waste}

                            /> */}
                             <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={waste}
                                editable={false}

                                onChangeText={txt => setdeviceCapacity(txt)}
                            />
                              
                        </View>
                    </View>



                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Capacity</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={deviceCapacity}
                                editable={false}

                                onChangeText={txt => setdeviceCapacity(txt)}
                            />
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Frequency</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={days}
                                editable={false}


                                onChangeText={txt => setDays(txt)}
                            />
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Barcode</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={barcode}
                                editable={false}

                                onChangeText={txt => setBarcode(txt)}
                            />
                        </View>
                    </View>


                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Next Service</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                        <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150, height: 40 }}
                                autoCapitalize='none'
                                value={nexts}
                                editable={false}
                                onChangeText={txt => setjobD(txt)}
                            />
                            {/* <DatePicker
                                style={{
                                    width: 85,

                                }}
                                date={nexts}
                                mode="date"
                                placeholder="yyyy:mm:dd"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}

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

                                onDateChange={(date) => { setnexts(date) }}

                            /> */}
                            
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Last Service</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                        <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150, height: 40 }}
                                autoCapitalize='none'
                                value={lasts}
                                editable={false}
                                onChangeText={txt => setjobD(txt)}
                            />
                            {/* <DatePicker
                                style={{
                                    width: 85,

                                }}
                                date={lasts}
                                mode="date"
                                placeholder="yyyy:mm:dd"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                showIcon={false}

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

                                onDateChange={(date) => { setlasts(date) }}

                            />
                            */}
                        </View>
                    </View>
                    {/* <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Job Duration</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={jobD}
                                onChangeText={txt => setjobD(txt)}
                            />
                        </View>
                    </View> */}
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Job Duration</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150, height: 40 }}
                                autoCapitalize='none'
                                value={jobD}
                                editable={false}
                                onChangeText={txt => setjobD(txt)}
                            />
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Key Required</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            {/* <Dropdown
                                dropdown_data={dropdownData3}
                                selectData={selectData3}
                                initialvalue={key}

                            /> */}
                             <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                        autoCapitalize='none'
                                        value={key}
                                        editable={false}

                                        onChangeText={txt => setalarmC(txt)}
                                    />
                            
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Job status</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                        <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                        autoCapitalize='none'
                                        value={jobS}
                                        editable={false}

                                        onChangeText={txt => setalarmC(txt)}
                                    />
                            {/* <Dropdown
                                dropdown_data={dropdownjob}
                                selectData={selectData10}
                                initialvalue={jobS}

                            /> */}
                             
                        </View>
                    </View>
                    {typedata === 'pumps' ? (
                        null
                    ) : (
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Alam Code</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={styles.editableBoxStyle}>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                        autoCapitalize='none'
                                        value={alarmC}
                                        editable={false}

                                        onChangeText={txt => setalarmC(txt)}
                                    />
                                </View>

                            </View>
                        )}
                    {typedata === 'pumps' ? (
                        null
                    ) : (
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Weigh Bridge Required</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={styles.editableBoxStyle}>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                        autoCapitalize='none'
                                        value={weight}
                                        editable={false}

                                        onChangeText={txt => setweight(txt)}
                                    />
                                </View>
                            </View>
                        )}
                    {typedata === 'pumps' ? (
                        null
                    ) : (
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Pallets To Be Exchanged</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={styles.editableBoxStyle}>
                                    {/* <Dropdown
                                        dropdown_data={dropdownPellet}
                                        selectData={selectData11}
                                        initialvalue={pellet}


                                    /> */}
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                        autoCapitalize='none'
                                        value={pellet}
                                        editable={false}
                                        onChangeText={txt => setweight(txt)}
                                    />
                                   
                                </View>
                            </View>
                        )}
                    {typedata === 'pumps' ? (
                        null
                    ) : (
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Quantity</Text>
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={styles.editableBoxStyle}>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                        autoCapitalize='none'
                                        value={quantitys}
                                        editable={false}

                                        onChangeText={txt => setQuantity(txt)}
                                    />
                                </View>
                            </View>
                        )}

                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Access Restriction</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>

                        <View style={{ marginTop: 10, width: '95%', height: 70, backgroundColor: textGrey, marginLeft: 10, marginRight: 10 }}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, }}
                                autoCapitalize='none'
                                multiline={true}
                                value={restrict}
                                editable={false}

                                numberOfLines={3}
                                onChangeText={txt => setRestrict(txt)}
                            />
                        </View>
                    </View>
                    {typedata === 'pumps' ? (
                        null
                    ) : (
                            <>
                                <View style={{ flex: 1, marginTop: 30 }}>
                                    <View style={styles.staticBoxStyle}>
                                        <Text style={styles.textStyle} >Pit Location</Text>
                                    </View>
                                    <View style={{ flex: 0.1 }} />

                                </View>
                                <View style={{ flex: 1, flexDirection: 'row', }}>

                                    <View style={{ marginTop: 10, width: '95%', height: 70, backgroundColor: textGrey, marginLeft: 10, marginRight: 10 }}>
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            style={{ color: mainGrey, fontSize: 14, }}
                                            autoCapitalize='none'
                                            multiline={true}
                                            value={location}
                                                                            editable={false}

                                            numberOfLines={3}
                                            onChangeText={txt => setLocation(txt)}
                                        />
                                    </View>
                                </View>
                            </>

                        )}
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 30, }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Information</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', marginBottom:50}}>

                        <View style={{ marginTop: 10, width: '95%', height: 70, backgroundColor: textGrey, marginLeft: 10, marginRight: 10 }}>
                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, }}
                                autoCapitalize='none'
                                multiline={true}
                                value={information}
                                editable={false}
                                numberOfLines={3}
                                onChangeText={txt => setInformation(txt)}
                            />
                        </View>
                    </View>




                </View>
                
                {/* {edit_btn_status && !userEmailAlert && !userNameAlert && email!==null && invoiceE!==null  && !data.visible? (
                    <TouchableOpacity onPress={() => editProfile()}
                        style={{ paddingHorizontal: 20, marginTop: 50, flex: 0.5, backgroundColor: lightGrey, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', width: 150, height: 40, borderRadius: 20, borderColor: lightGreen, borderWidth: 1, backgroundColor: mainWhite }}>
                            {loader ? (
                                <ActivityIndicator size="small" color={lightGreen}></ActivityIndicator>
                            ) : (
                                    <Text style={{ color: lightGreen }}>Edit</Text>

                                )}


                        </View>
                    </TouchableOpacity>
                ) : (
                        <View
                            style={{ opacity: 0.6, paddingHorizontal: 20, marginTop: 50, flex: 0.5, backgroundColor: lightGrey, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ justifyContent: 'center', alignItems: 'center', width: 150, height: 40, borderRadius: 20, borderColor: lightGreen, borderWidth: 1, backgroundColor: mainWhite }}>

                                <Text style={{ color: lightGreen }}>Edit</Text>


                            </View>
                        </View>
                    )} */}
                    {/* <View style={{marginTop:10,justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'red'}}>{msg}</Text>
                    </View> */}

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



export default connect(mapStateToProps)(AddDetails)
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
        backgroundColor: lightGrey,
        height: 40,
        marginRight: 20,
        marginTop: 10,
        marginLeft: 20
    },
    editableBoxStyle: {
        flex: 1,
        backgroundColor: lightGrey,
        marginRight: 20,
        height: 40,
        marginTop: 10,
        // borderBottomWidth: 1,
        // borderColor: mainGrey,
        flexDirection: 'row',
        

    },
    editableBoxStyle1: {
        flex: 1,
        backgroundColor: lightGrey,
        marginRight: 20,
        height: 40,
        marginTop: 5,
        // borderBottomWidth: 1,
        flexDirection: 'row',
        borderColor: mainGrey
    }



});