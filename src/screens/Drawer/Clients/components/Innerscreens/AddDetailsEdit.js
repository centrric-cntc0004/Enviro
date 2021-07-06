import React, { useState } from 'react'
import { StyleSheet, View, Image, Text, TextInput, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { lightGrey, mainBlack, mainGrey, textlightgrey, darkGrey, mainBlue, mainWhite, lightGreen, textGrey, textBlack, lightGreyBackground } from '../../../../../common/Colors'
import { connect } from 'react-redux'
import { edit_client, fetch_client_list } from '../../action'
let post_data = 0
let days_data = 0
let week_data = 0
import moment from "moment"
import DatePicker from 'react-native-datepicker'
let formatted_date = ""
let formatted_date2 = ""
import Toast from 'react-native-simple-toast';
import Icon1 from 'react-native-vector-icons/MaterialIcons'
import ImagePicker from 'react-native-image-picker';
import { select_location_data } from '../../action'
import Icon from 'react-native-vector-icons/MaterialIcons'
import MapViews from './MapViews'
import { ClientImage } from '../../../../../common/Images'

import Dropdown from './Dropdown'

const AddDetailsEdit = ({ navigation, data, clientdata, client, dispatch }) => {

    const { selected_client, typedata, temp_client_location } = client

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
        const [msg, setMsg] = useState("")

        let account_type_array = [{ name: '7 Days', value: '7 Days' }, { name: '14 Days', value: '14 Days' }, { name: '30 Days', value: '30 Days' },
        { name: '60 Days', value: '60 Days' },
        { name: 'Select Option', value: '' }]
        let cancel_array = [{ name: 'Select Option', value: '' }, { name: 'MOVED PREMISES', value: 'MOVED PREMISES' }, { name: 'NEW OWNER', value: 'NEW OWNER' }, { name: 'POOR SERVICE', value: 'POOR SERVICE' }, { name: 'SHOP CLOSE DOWN', value: 'SHOP CLOSE DOWN' }, { name: 'TOO EXPENSIVE', value: 'TOO EXPENSIVE' },
        { name: 'NOT APPLICABLE', value: 'NOT APPLICABLE' }
        ]

        let payment_array = [{ name: 'Select Option', value: '' }, { name: 'ACCOUNTS', value: 'ACCOUNTS' }, { name: 'COD', value: 'COD' }, { name: 'CREDIT CARD', value: 'CREDIT CARD' }, { name: 'NO CHARGE', value: 'NO CHARGE' }, { name: 'PRE-PAID', value: 'PRE-PAID' },
        { name: 'NOT APPLICABLE', value: 'NOT APPLICABLE' }
        ]
        let person_array = typedata === 'waste' ?
            [{ name: 'RICHARD', value: 'RICHARD' }, { name: 'MATHEW', value: 'MATHEW' }, { name: 'MICHEAL', value: 'MICHEAL' }, { name: 'MATTHEW D', value: 'MATTHEW D' }, { name: 'JAKE', value: 'JAKE' }, { name: 'NOT APPLICABLE', value: 'NOT APPLICABLE' }
            ]
            : typedata === 'pumps' ?
                [{ name: 'MATT', value: 'MATT' }, { name: 'MATTHEW D', value: 'MATTHEW D' }, { name: 'JAKE', value: 'JAKE' }, { name: 'NOT APPLICABLE', value: 'NOT APPLICABLE' }
                ]
                :
                [{ name: 'MATTHEW D', value: 'MATTHEW D' }, { name: 'JAKE', value: 'JAKE' }, { name: 'NOT APPLICABLE', value: 'NOT APPLICABLE' }
                ]


        let type_array = [

            { name: 'FOOD WASTE', value: 'FOOD WASTE' }, { name: 'GERNIE WASHES', value: 'GERNIE WASHES' }, { name: 'GREASE', value: 'GREASE' }, { name: 'GROUND WATER', value: 'GROUND WATER' }, { name: 'J120', value: 'J120' },
            { name: 'LEVY', value: 'LEVY' }, { name: 'M250', value: 'M250' }, { name: 'N205', value: 'N205' },
            { name: 'PACKAGED WASTE', value: 'PACKAGED WASTE' }, { name: 'PRODUCT DESTRUCTION', value: 'PRODUCT DESTRUCTION' }, { name: 'SEWER', value: 'SEWER' },
            { name: 'STORMWATER', value: 'STORMWATER' }, { name: 'TANK WASH OUT', value: 'TANK WASH OUT' },
            { name: 'TRANSPORT', value: 'TRANSPORT' }, { name: 'Z140', value: 'Z140' },
        ]
        let status_array = [{ name: 'ACTIVE', value: 'ACTIVE' },
        { name: 'ON HOLD', value: 'ON HOLD' }, { name: 'CANCELLED/UNACTIVE', value: 'CANCELLED/UNACTIVE' }, { name: 'NOT APPLICABLE', value: 'NOT APPLICABLE' }]
        let job_array = [{ name: 'CALL', value: 'CALL' },
        { name: 'CANCELLED', value: 'CANCELLED' }, { name: 'COVID', value: 'COVID' }, { name: 'ON HOLD', value: 'ON HOLD' }, { name: 'ON OFF', value: 'ON OFF' },
        { name: 'RECURRING', value: 'RECURRING' }, { name: 'NOT APPLICABLE', value: 'NOT APPLICABLE' }]
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

        let client_id = ''
        let client_name = ''
        let client_email = ''
        let date_joined = ''
        let client_building = ''
        let client_location = ''
        let client_latitude = ''
        let client_longitude = ''
        let client_image = ''
        let contact_number = ""
        let client_address = ""
        let client_postcode = ""
        let client_contact = ""
        let client_phone = ""
        let induction = ""
        let induction_req = ""
        let purchaseno = ""

            client_image = selected_client.dp_thumbnail
            client_id = selected_client.client_id
            client_name = selected_client.client_name
            client_email = selected_client.client_email
            date_joined = selected_client.date_joined
            client_building = selected_client.building
            client_location = selected_client.place
            client_latitude = selected_client.location_latitude
            client_longitude = selected_client.location_logitude
            contact_number = selected_client.site_contact_mob
            client_address = selected_client.site_address
            client_postcode = selected_client.site_post_code
            client_contact = selected_client.site_contact_person
            client_phone = selected_client.site_phone_no
            induction = selected_client.induction_type
            induction_req = selected_client.induction_required_str
            purchaseno = selected_client.invoice_purchase_no


        
        if (selected_client.location_logitude !== null &&
            // || selected_client.location_logitude !==undefined ||
            // selected_client.location_logitude !== "" || 
            selected_client.location_latitude !== null ||
            selected_client.location_latitude !== undefined ||
            selected_client.location_latitude !== "") {
            //    user_location={"latitude":parseFloat(selected_client.location_latitude),"longitude": parseFloat(selected_client.location_logitude)}
            user_location = { "latitude": 10.676676, "longitude": 79.09909889 }
            select_location_data(user_location)

        } else {
            user_location = { "latitude": 10.676676, "longitude": 79.09909889 }
            select_location_data(user_location)


        }
        const [ClientId, setClientId] = useState(client_id)
        const [imageuri, setImageUri] = useState("")

        const [ClientName, setClientName] = useState(client_name)
        const [ClientFrom, setClientFrom] = useState(date_joined)
        const [ClientEmail, setClientEmail] = useState(client_email)
        const [ClientBuilding, setClientBuilding] = useState(client_building)
        const [ClientAddress, setClientAddress] = useState(client_address)
        const [ClientPost, setClientPost] = useState(client_postcode)
        const [ClientContact, setClientContact] = useState(client_contact)
        const [ClientPhone, setClientPhone] = useState(client_phone)
        const [ClientNumber, setClientNumber] = useState(contact_number)
        const [ClientInduc, setClientInduc] = useState(induction)
        const [ClientInducR, setClientInducR] = useState(induction_req)
        const [invoicePurc, setinvoicePurc] = useState(purchaseno)
        const [image, setImage] = useState("")
        const [alert, setAlert] = useState(false)
        const [imagenew, setImagenew] = useState(client_image)


        let inductionrequired = [{ "value": "NO" }, { "value": "YES" }, { "value": "NOT APPLICABLE" }]
        let dropdownData12 = []
        if (inductionrequired) {
            inductionrequired.map((item) => {
                const { value } = item
                return (
                    dropdownData12.push(value)
                )
            })
        }
        const selectData2 = (index) => {
            setClientInducR(dropdownData12[index])
        }
        if (image) {
            profPic = { uri: image };

        } else if (imagenew) {
            profPic = { uri: imagenew };


        }
        else {
            profPic = ClientImage;



        }
        const ProfilePictureAdd = () => {
            console.log("kljki") //IMAGE UPLOADING
            const options = {
                title: 'SelectAvatar',
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            };
            ImagePicker.showImagePicker(options, (response) => {

                if (response.didCancel) {
                } else if (response.error) {

                } else {
                    const source = { uri: response.uri };
                    setImage(response.uri)
                    setImagenew(response.uri)
                    setImageUri(response)
                }
            })
        };

        let address_data = selected_client.site_address
        let subrub_data = selected_client.site_suburb
        let company_subrub = selected_client.company_subrub


        let barcode_data = selected_client.barcode
        let accounts_data = selected_client.account_type
        let payment_data = selected_client.payment_type
        let bill_data = selected_client.pricing_billing
        let key_data = selected_client.key_required_type_str
        // let induction = selected_client.induction_type

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
        // let purchaseno = selected_client.invoice_purchase_no

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
        // const [invoicePurc, setinvoicePurc] = useState(purchaseno)
        const [postcode, setPostcode] = useState(post_data)

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
        const selectData12 = (index) => {
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
       

        if (ClientName !== selected_client.client_name || imagenew !== selected_client.dp_thumbnail ||
            ClientAddress !== selected_client.site_address ||
            ClientPost !== selected_client.site_post_code ||
            ClientPhone !== selected_client.site_phone_no ||
            ClientNumber !== selected_client.site_contact_mob ||
            ClientContact !== selected_client.site_contact_person
            || ClientEmail !== selected_client.client_email
            || ClientInducR !== selected_client.induction_required_str ||
            ClientInduc !== selected_client.induction_type ||
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
            || invoiceRe !== reasonforcancelling || invoicePa !== paymenttype || invoicePurc !== purchaseno
            ||
            comapantname !== compaName || comapantadd !== compaAdd || salesPerson !== salesPersons



        ) {

            edit_btn_status = true
        } else {


            edit_btn_status = false
        }
        console.log("data.invoice_purchase_no" + data.invoice_purchase_no)



        const editProfile = () => {
            if (!validateEmail(data.client_email)) {
                setMsg("Please enter valid email id")
            } else if (isNaN(postcode)) {
                setPostcode('')

            } else if (isNaN(name)) {
                setName('')

            } else if (isNaN(invoiceP)) {
                setinvoiceP('')

            }
            else {
                setMsg("")

                setLoader(true)
              
                var data1 = new FormData();
                console.log("data" + JSON.stringify(data))
                data1.append('client_id', ClientId);
                data1.append('client_name', ClientName);
                data1.append('client_email', ClientEmail);
                data1.append('building', ClientBuilding);

                data1.append('waste_type_str', waste)

                // data1.append('place', data.client_place);
                data1.append('device_capacity', deviceCapacity);
                data1.append('barcode', barcode);


                data1.append('site_address',  ClientAddress);
                data1.append('site_post_code', ClientPost)
                data1.append('site_phone_no', ClientPhone)
                data1.append('site_contact_person', ClientContact)
                data1.append('site_contact_mob', ClientNumber)
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
                data1.append('invoice_purchase_no', invoicePurc)

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
                data1.append('induction_type', ClientInduc);
                data1.append('induction_required_str',ClientInducR);

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
                if (imagenew) {
                    data1.append('dp', {
                        uri: imagenew,
                        type: 'image/jpg' || 'image/png' || 'image/jpeg',
                        name: "image.jpg" || "image.png"
                    })
                } else {

                }
                const success = (res) => {
                    console.log("rrrrrrrrrrr" + JSON.stringify(res))
                    setLoader(false)
                    dispatch({ type: 'RESET_CLIENT_DATA', client: res })
                    dispatch(fetch_client_list(type))
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
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
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
                 <View style={{ flex: 2.5, marginTop: '7%', flexDirection: 'row', height: 80 }}>
                    <View style={{ flex: 1.2, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={{height:80,width:80, justifyContent: 'center', alignItems: "center" ,marginTop:10}}
                                    onPress={() => ProfilePictureAdd()}>
                                    <Image style={{ height: 80, width: 80, borderRadius: 5, marginTop: 15 }}
                                        source={profPic} />

                                    <TouchableOpacity onPress={() => ProfilePictureAdd()}
                                        style={{ marginTop: -20, marginLeft: 60, backgroundColor: textlightgrey, height: 25, width: 25, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name="camera-alt" color={mainBlack} size={14} />
                                    </TouchableOpacity>
                                </TouchableOpacity>


                            </View>
                        {/* <Image style={{ height: 80, width: 80, borderRadius: 5 }} source={profPic} /> */}
                    <View style={{ flex: 0.1 }} />
                    <View style={{ paddingHorizontal: 20, flexDirection: 'column', flex: 2.5, }}>
                        {/* <View style={{ flex: 0.8, flexDirection: 'row', marginTop: 5, }}>
                            <View style={{ flex: 1 }}>
                                <Text style={styles.textStyle} >Site Name</Text>
                            </View>
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    placeholder="Site Name"
                                    value={ClientName}
                                    editable={false}

                                    numberOfLines={1}
                                    onChangeText={txt => setClientName(txt)}
                                />
                            </View>
                        </View> */}
                        {/* <View style={{ flex: 0.5, flexDirection: 'row', marginTop: 10 }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Site Email</Text>
                            </View>
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center', width: 150 }}
                                    autoCapitalize='none'
                                    placeholder="Site Email"
                                    value={ClientEmail}
                                    editable={false}

                                    numberOfLines={1}
                                    onChangeText={txt => setClientEmail(txt)}
                                />
                            </View> */}
                        {/* </View> */}
                    </View>
                </View>
                <View style={{ flex: 3.3, backgroundColor: lightGrey, height: 340, marginTop: 10 }}>

                    <View style={{ paddingHorizontal: 20, flexDirection: 'column', flex: 2, }}>

                        <View style={{ flex: 1, flexDirection: 'row', }}>

                            <View style={{ height: 30, flex: 0.5,flexDirection:'row' }}>
                                <Text style={styles.textStyle1} >Site Name</Text>

                            </View>

                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center',}}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center', width: 150 }}
                                    autoCapitalize='none'
                                    placeholder="Site Name"
                                    value={ClientName}

                                    numberOfLines={1}
                                    onChangeText={txt => setClientName(txt)}
                                />

                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.5,flexDirection:'row' }}>
                                <Text style={styles.textStyle1} >Site Email</Text>

                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center', width: 180 }}
                                    autoCapitalize='none'
                                    placeholder="Site Email"
                                    value={ClientEmail}

                                    numberOfLines={1}
                                        onChangeText={txt => {
                                            setClientEmail(txt)
                                            if (!validateEmail(txt)) {
                                                console.log("ghhhhhhhhhh")
                                                setAlert(true)
        
                                                // not a valid email
                                            } else {
                                                setAlert(false)
        
                                                // valid email
                                            }
        
                                        }}
        
                                    />
                                    {alert ? (
                                        <Icon style={{ alignSelf: 'center' }}
                                            name="error" size={20} color="red" />
                                    ) : (
                                            null
                                        )}
                                         
                                

                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.5, flexDirection:'row'}}>
                                <Text style={styles.textStyle1} >Site Address</Text>

                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center', width: 180 }}
                                    autoCapitalize='none'
                                    placeholder="Site Address"
                                    value={ClientAddress}

                                    numberOfLines={1}
                                    onChangeText={txt => setClientAddress(txt)}
                                />

                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.5, flexDirection:'row'}}>
                                <Text style={styles.textStyle1} >Site Postcode</Text>

                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={ClientPost}
                                    placeholder="Site Postcode"

                                    placeholderTextColor={textlightgrey}
                                    onChangeText={txt => setClientPost(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.5,flexDirection:'row' }}>
                                <Text style={styles.textStyle1} >Order Number</Text>

                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={invoicePurc}
                                    placeholder="Order Number"

                                    placeholderTextColor={textlightgrey}
                                    onChangeText={txt => setinvoicePurc(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.5,flexDirection:'row' }}>
                                <Text style={styles.textStyle1} >Site Contact</Text>

                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={ClientContact}
                                    placeholder="Site Contact/person"

                                    onChangeText={txt => setClientContact(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.5,flexDirection:'row' }}>
                                <Text style={styles.textStyle1} >Site Phone</Text>

                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={ClientPhone}
                                    placeholder="Site Phone"
                                    keyboardType="number-pad"
                                    contextMenuHidden={true}

                                    onChangeText={txt => setClientPhone(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.5,flexDirection:'row' }}>
                                <Text style={styles.textStyle1} >Site Mobile No</Text>

                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={ClientNumber}
                                    placeholder="Site Mobile No"
                                    keyboardType="number-pad"
                                    contextMenuHidden={true}

                                    onChangeText={txt => setClientNumber(txt)}
                                />
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.5, flexDirection:'row'}}>
                                <Text style={styles.textStyle1} >Induction Required</Text>

                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                {/* <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={ClientInducR}
                                    placeholder="Site Mobile No"
                                    keyboardType="number-pad"
                                 onChangeText={txt => setClientNumber(txt)}
                                /> */}
                            
                            <Dropdown
                                dropdown_data={dropdownData2}
                                selectData={selectData2}
                                 initialvalue={ClientInducR}

                            /> 
                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={{ height: 30, flex: 0.5,flexDirection:'row' }}>
                                <Text style={styles.textStyle1} >Induction Type</Text>

                            </View>
                            <View style={{ flex: 0.1 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>

                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                    autoCapitalize='none'
                                    value={ClientInduc}
                                    placeholder="Induction Type"
                                    onChangeText={txt => setClientInduc(txt)}
                                />
                            </View>
                        </View>

                    </View>
                    {/* {/* <View style={{ flex: 0.1, backgroundColor: lightGrey, flexDirection: 'row', marginTop: 5 }}>
                        <View style={{ flex: 1.4, backgroundColor: lightGrey }}>
                            <View style={{ flex: 4, marginTop: 5 }}>
                                <View style={{ flexDirection: 'row', flex: 4 }}>
                                    {ClientNumber !== "" || null ? (
                                        <TouchableOpacity onPress={() => call_dial()}
                                            style={{
                                                flex: 2, height: 35,
                                                backgroundColor: mainWhite, borderWidth: 0.5, borderColor: lightGreen,
                                                marginLeft: 10,
                                                marginRight: 10,
                                                alignItems: 'center', flexDirection: 'row'
                                            }}>

                                            <Icon1 style={{ paddingLeft: 10 }} name="cellphone-android" size={25} color={lightGreen} />
                                            <Text style={{ paddingLeft: 10, color: lightGreen, fontSize: 14 }} >Call</Text>
                                        </TouchableOpacity>
                                    ) : (
                                            <View
                                                style={{
                                                    opacity: 0.6,
                                                    flex: 2, height: 35,
                                                    backgroundColor: mainWhite, borderWidth: 0.5, borderColor: lightGreen,
                                                    marginLeft: 10,
                                                    marginRight: 10,
                                                    alignItems: 'center', flexDirection: 'row'
                                                }}>

                                                <Icon1 style={{ paddingLeft: 10 }} name="cellphone-android" size={25} color={lightGreen} />
                                                <Text style={{ paddingLeft: 10, color: lightGreen, fontSize: 14 }} >Call</Text>
                                            </View>
                                        )}

                                    {ClientEmail !== "" || null ? (
                                        <TouchableOpacity onPress={() => send_email()}
                                            style={{
                                                flex: 2, height: 35, backgroundColor: mainWhite, borderWidth: 0.5, borderColor: lightGreen,
                                                marginLeft: 10, marginRight: 10, alignItems: 'center', flexDirection: 'row'
                                            }}>
                                            <Icon1 style={{ paddingLeft: 10 }} name="email" size={25} color={lightGreen} />
                                            <Text style={{ paddingLeft: 10, color: lightGreen, fontSize: 14 }} >Email</Text>

                                        </TouchableOpacity>
                                    ) : (
                                            <View
                                                style={{
                                                    opacity: 0.6,
                                                    flex: 2, height: 35, backgroundColor: mainWhite, borderWidth: 0.5, borderColor: lightGreen,
                                                    marginLeft: 10, marginRight: 20, alignItems: 'center', flexDirection: 'row'
                                                }}>
                                                <Icon1 style={{ paddingLeft: 10 }} name="email" size={25} color={lightGreen} />
                                                <Text style={{ paddingLeft: 10, color: lightGreen, fontSize: 14 }} >Email</Text>

                                            </View>
                                        )}
                                    {contact_number !== "" || null ? (
                                        <TouchableOpacity onPress={() => call_sendsms()}
                                            style={{
                                                flex: 2, height: 35, backgroundColor: mainWhite, borderWidth: 0.5, borderColor: lightGreen,
                                                marginLeft: 10, marginRight: 20, alignItems: 'center', flexDirection: 'row'
                                            }}>
                                            <Icon1 style={{ paddingLeft: 10 }} name="message" size={25} color={lightGreen} />
                                            <Text style={{ paddingLeft: 10, color: lightGreen, fontSize: 14 }} >Text</Text>

                                        </TouchableOpacity>
                                    ) : (
                                            <View
                                                style={{
                                                    opacity: 0.6,
                                                    flex: 2, height: 35, backgroundColor: mainWhite, borderWidth: 0.5, borderColor: lightGreen,
                                                    marginLeft: 10, marginRight: 20, alignItems: 'center', flexDirection: 'row'
                                                }}>
                                                <Icon1 style={{ paddingLeft: 10 }} name="message" size={25} color={lightGreen} />
                                                <Text style={{ paddingLeft: 10, color: lightGreen, fontSize: 14 }} >Text</Text>

                                            </View>
                                        )}
                                </View>
                            </View>
                        </View>

                    </View> */}
                </View>
                                    <View style={{ marginTop: '10%' }}>
                        <MapViews navigation={navigation} details={user_location} data={selected_client} />
                    </View>
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
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={comapantname}

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
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={comapantadd}
                                editable={false}

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
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={name}

                                keyboardType={"number-pad"}
                                onChangeText={txt => setName(txt)}
                            />
                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Company Email</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle1}>


                            <TextInput
                                underlineColorAndroid="transparent"
                                style={{ color: mainGrey, fontSize: 14, width: 150 }}
                                autoCapitalize='none'
                                value={email}

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

                            <Dropdown
                                dropdown_data={dropdownPerson}
                                selectData={selectData9}
                                initialvalue={salesPerson}

                            />

                        </View>
                    </View>



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

                            <Dropdown
                                dropdown_data={dropdownAccount}
                                selectData={selectData4}
                                initialvalue={invoiceTacc}

                            />

                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Account Status</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Dropdown
                                dropdown_data={dropdownStatus}
                                selectData={selectData8}
                                initialvalue={invoiceAcc}

                            />

                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Reason For Cancelling</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Dropdown
                                dropdown_data={dropdownCancel}
                                selectData={selectData6}
                                initialvalue={invoiceRe}

                            />


                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Payment Type</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Dropdown
                                dropdown_data={dropdownPayment}
                                selectData={selectData7}
                                initialvalue={invoicePa}

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
                            <Dropdown
                                dropdown_data={dropdownType}
                                selectData={selectData5}
                                initialvalue={waste}

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
                            <DatePicker
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

                            />

                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Last Service</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <DatePicker
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
                            <Dropdown
                                dropdown_data={dropdownData3}
                                selectData={selectData3}
                                initialvalue={key}

                            />

                        </View>
                    </View>

                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Job status</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Dropdown
                                dropdown_data={dropdownjob}
                                selectData={selectData10}
                                initialvalue={jobS}

                            />

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
                                    <Dropdown
                                        dropdown_data={dropdownPellet}
                                        selectData={selectData11}
                                        initialvalue={pellet}

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
                                            numberOfLines={3}
                                            onChangeText={txt => setLocation(txt)}
                                        />
                                    </View>
                                </View>
                            </>

                        )}
                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 30 }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Information</Text>
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
                                value={information}
                                numberOfLines={3}
                                onChangeText={txt => setInformation(txt)}
                            />
                        </View>
                    </View>





                {edit_btn_status && !userEmailAlert && !userNameAlert && email !== null && invoiceE !== null && !alert ? (
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
                    )}
                <View style={{ marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'red' }}>{msg}</Text>
                </View>

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



export default connect(mapStateToProps)(AddDetailsEdit)
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
    textStyle1: {
        paddingTop: 20,
        color: darkGrey,
        height:40,
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