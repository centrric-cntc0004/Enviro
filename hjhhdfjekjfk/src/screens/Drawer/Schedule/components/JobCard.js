// import React  from 'react'
// import { View, Text, ActivityIndicator, } from 'react-native'
// import { ScrollView } from 'react-native-gesture-handler'
// import { connect } from 'react-redux'
// import {  mainWhite, mainBlue,  mainGrey, textGrey, lightGreen, mediumGrey, textBlack, textBlue } from '../../../../common/Colors'


// const JobCard = ({ navigation, route, schedule_enviro }) => {
//     let data = route.params.items
//     const { job_card_data, isLoading } = schedule_enviro


//     const RenderForm = () => {



//         if (job_card_data === undefined) return (
//             <View style={{ marginTop: 300, justifyContent: 'center', alignItems: 'center' }}>
//                 <ActivityIndicator size="large" color={mainBlue} />
//             </View>
//         )

//         return (


//             <View style={{ flex: 1, backgroundColor: mainWhite, }}>
//                 <View style={{ height: 10, backgroundColor: textGrey }}>

//                 </View>
//                 <View
//                     style={{
//                         flexDirection: 'column',
//                         flex: 1, backgroundColor: mainWhite,
//                     }}>
//                     <View style={{ flexDirection: 'row', flex: 1, backgroundColor: mainWhite, marginTop: 10, paddingHorizontal: 20 }}>

//                         <View style={{ flex: 2.4, marginRight: 10, flexDirection: 'column', }}>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Customer ID</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Customers Name</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Site Location</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Site Suburb</Text>



//                         </View>
//                         <View style={{ flex: 3, marginLeft: 10, marginRight: 10, }}>
//                             <Text style={{ color: mainBlue, marginTop: 20 }}>: {job_card_data.customer_id}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {job_card_data.customer_name}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {job_card_data.site_location}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {job_card_data.site_suburb}</Text>

//                         </View>

//                     </View>
//                     <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, paddingHorizontal: 20 }}>
//                         <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ alignSelf: 'center', color: mainGrey }}>Quote ID</Text>
//                             <View style={{ marginTop: 5, borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: 150, height: 40, backgroundColor: lightGreen }}>
//                                 <Text style={{ color: mainWhite }}>{job_card_data.quote}</Text>
//                             </View>
//                         </View>
//                         <View style={{ flex: 0.6 }} />
//                         <View style={{ flexDirection: 'column', }}>
//                             <Text style={{ alignSelf: 'center', color: mainGrey }}>Date scheduled to</Text>
//                             <View style={{ marginTop: 5, borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: 150, height: 40, backgroundColor: lightGreen }}>
//                                 <Text style={{ color: mainWhite }}>{job_card_data.schedule_date}</Text>
//                             </View>
//                         </View>
//                     </View>
//                     <View style={{ flexDirection: 'row', flex: 1, backgroundColor: mainWhite, marginLeft: 5, marginRight: 5, }}>

//                         <View style={{ flex: 3.5, marginLeft: 20, marginRight: 10, flexDirection: 'column', }}>
//                             <Text style={{ color: mainGrey, marginTop: 10 }}>Truck Number</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Technician</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Duration</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Safety Induction required</Text>

//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Site contact name</Text>

//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Mobile number</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Phone number</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Service time</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Security Key require</Text>
//                         </View>
//                         <View style={{ flex: 3, marginLeft: 10, marginRight: 10, }}>

//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 10 }}>: {job_card_data.truck_number}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {job_card_data.technician_name} </Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {job_card_data.duration} </Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {job_card_data.induction_type} </Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 10 }}>: {job_card_data.site_contact_name}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 10 }}>: {job_card_data.mobile_number}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {job_card_data.phone_number} </Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {job_card_data.service_time} </Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {job_card_data.security_key_required} </Text>

//                         </View>

//                     </View>

//                     <View style={{
//                         backgroundColor: mainWhite,
//                         flex: 0.6,
//                         marginTop: '2%',


//                     }}>

//                         <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>

//                             <View style={{ width: '100%', height: 150, backgroundColor: textGrey, }}>
//                                 <Text style={{
//                                     paddingLeft: 10,
//                                     paddingTop: 10, paddingRight: 10,
//                                     color: textBlue
//                                 }} >Access and Restriction</Text>
//                                 <Text style={{ height: 100, paddingLeft: 10, paddingRight: 10 }}
//                                 >
//                                     {job_card_data.access_restriction} </Text>
//                             </View>
//                         </View>
//                         <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>

//                             <View style={{ width: '100%', height: 150, backgroundColor: textGrey, }}>
//                                 <Text style={{
//                                     paddingLeft: 10, paddingRight: 10,
//                                     paddingTop: 10,
//                                     color: textBlue
//                                 }} >Additional Information</Text>
//                                 <Text style={{ height: 100, paddingLeft: 10, paddingRight: 10, }}
//                                 >
//                                     {job_card_data.aditional_information}</Text>

//                             </View>
//                         </View>
//                         <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20 }}>

//                             <View style={{ width: '100%', height: 150, backgroundColor: textGrey, }}>
//                                 <Text style={{
//                                     paddingLeft: 10, paddingRight: 10,
//                                     paddingTop: 10,
//                                     color: textBlue
//                                 }} >Pit Location</Text>
//                                 <Text style={{ height: 100, paddingLeft: 10, paddingRight: 10, }}
//                                 >
//                                     {job_card_data.pit_location}</Text>

//                             </View>
//                         </View>
//                         <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <View style={{ flexDirection: 'column' }}>
//                                 <Text style={{ alignSelf: 'center' }}>Date Service Complete</Text>
//                                 <View style={{ marginTop: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: 150, height: 40, backgroundColor: lightGreen }}>
//                                     <Text style={{ color: mainWhite }}>{job_card_data.date_service_complete}</Text>
//                                 </View>
//                             </View>
//                             <View style={{ flex: 0.7 }} />
//                             <View style={{ flexDirection: 'column' }}>
//                                 <Text style={{ alignSelf: 'center' }}>Payment Details</Text>
//                                 <View style={{ marginTop: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: 150, height: 40, backgroundColor: lightGreen }}>
//                                     <Text style={{ color: mainWhite }}>{job_card_data.payment_details}</Text>
//                                 </View>
//                             </View>
//                         </View>
//                         <View style={{ paddingHorizontal: 20, flexDirection: 'row', marginBottom: 30, marginTop: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: mediumGrey }}>
//                             <View style={{ flexDirection: 'column', marginBottom: 20 }}>
//                                 <Text style={{ alignSelf: 'center' }}>Capacity</Text>
//                                 <View style={{ marginTop: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: 150, height: 40, backgroundColor: lightGreen }}>
//                                     <Text style={{ color: mainWhite }}>{job_card_data.capacity}</Text>
//                                 </View>

//                             </View>
//                             <View style={{ flex: 0.7 }} />
//                             <View style={{ flexDirection: 'column', marginBottom: 20 }}>
//                                 <Text style={{ alignSelf: 'center' }}>Amount</Text>
//                                 <View style={{ marginTop: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: 150, height: 40, backgroundColor: textGrey }}>
//                                     <Text style={{ color: textBlack }}>{job_card_data.amount}</Text>
//                                 </View>

//                             </View>
//                         </View>

//                     </View>
//                 </View>

//             </View>



//         )

//     }
//     return (
//         <ScrollView>

//             <RenderForm />
//         </ScrollView>

//     )
// }

// const mapStateProps = (state) => {
//     const { schedule_enviro } = state

//     return { schedule_enviro }
// }



// export default connect(mapStateProps)(JobCard)


// import React from 'react'
// import { View, Text, ActivityIndicator, } from 'react-native'
// import { ScrollView } from 'react-native-gesture-handler'
// import { connect } from 'react-redux'
// import { mainWhite, mainBlue, mainGrey, textGrey, lightGreen, mediumGrey, textBlack, textBlue } from '../../../../common/Colors'
// let typeData=""

// const JobCardDetails = ({ navigation, route, sales_enviroWaste }) => {
//     let data = route.params.items
//     const { job_card, isLoading } = sales_enviroWaste


//     const RenderForm = () => {

//        if(job_card){
//            if(job_card.induction_type){
//            typeData=job_card.induction_type.toString()

//            }
//        }

//         if (job_card === undefined) return (
//             <View style={{ marginTop: 300, justifyContent: 'center', alignItems: 'center' }}>
//                 <ActivityIndicator size="large" color={mainBlue} />
//             </View>
//         )

//         return (


//             <View style={{ flex: 1, backgroundColor: mainWhite, }}>
//                 <View style={{ height: 10, backgroundColor: textGrey }}>

//                 </View>
//                 <View
//                     style={{
//                         flexDirection: 'column',
//                         flex: 1, backgroundColor: mainWhite,
//                     }}>
//                     <View style={{ flexDirection: 'row', flex: 1, backgroundColor: mainWhite, marginTop: 10, paddingHorizontal: 20 }}>

//                         <View style={{ flex: 2.4, marginRight: 10, flexDirection: 'column', }}>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Customer ID</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Customers Name</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Site Location</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Site Suburb</Text>



//                         </View>
//                         <View style={{ flex: 3, marginLeft: 10, marginRight: 10, }}>
//                             <Text style={{ color: mainBlue, marginTop: 20 }}>: {job_card.customer_id}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {job_card.customer_name}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {job_card.site_location}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {job_card.site_suburb}</Text>

//                         </View>

//                     </View>
//                     <View style={{ flexDirection: 'row', marginTop: 20, marginBottom: 20, paddingHorizontal: 20 }}>
//                         <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ alignSelf: 'center', color: mainGrey }}>Quote ID</Text>
//                             <View style={{ marginTop: 5, borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: 150, height: 40, backgroundColor: lightGreen }}>
//                                 <Text style={{ color: mainWhite }}>{job_card.quote_id}</Text>
//                             </View>
//                         </View>
//                         <View style={{ flex: 0.6 }} />
//                         <View style={{ flexDirection: 'column', }}>
//                             <Text style={{ alignSelf: 'center', color: mainGrey }}>Date scheduled to</Text>
//                             <View style={{ marginTop: 5, borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: 150, height: 40, backgroundColor: lightGreen }}>
//                                 <Text style={{ color: mainWhite }}>{job_card.schedule_date}</Text>
//                             </View>
//                         </View>
//                     </View>
//                     <View style={{ flexDirection: 'row', flex: 1, backgroundColor: mainWhite, marginLeft: 5, marginRight: 5, }}>

//                         <View style={{ flex: 3.5, marginLeft: 20, marginRight: 10, flexDirection: 'column', }}>
//                             <Text style={{ color: mainGrey, marginTop: 10 }}>Truck Number</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Technician</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Duration</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Safety Induction required</Text>

//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Site contact name</Text>

//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Mobile number</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Phone number</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Service time</Text>
//                             <Text style={{ color: mainGrey, marginTop: 20 }}>Security Key require</Text>
//                         </View>
//                         <View style={{ flex: 3, marginLeft: 10, marginRight: 10, }}>

//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 10 }}>: {job_card.truck_number}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {job_card.technician_name} </Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {job_card.duration} </Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {typeData} </Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 10 }}>: {job_card.site_contact_name}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 10 }}>: {job_card.mobile_number}</Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {job_card.phone_number} </Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {job_card.service_time} </Text>
//                             <Text numberOfLines={1}
//                                 style={{ color: mainBlue, marginTop: 20 }}>: {job_card.security_key_required} </Text>

//                         </View>

//                     </View>

//                     <View style={{
//                         backgroundColor: mainWhite,
//                         flex: 0.6,
//                         marginTop: '2%',


//                     }}>

//                         <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>

//                             <View style={{ width: '100%', height: 150, backgroundColor: textGrey, }}>
//                                 <Text style={{
//                                     paddingLeft: 10,
//                                     paddingTop: 10, paddingRight: 10,
//                                     color: textBlue
//                                 }} >Access and Restriction</Text>
//                                 <Text style={{ height: 100, paddingLeft: 10, paddingRight: 10 }}
//                                 >
//                                     {job_card.access_restriction} </Text>
//                             </View>
//                         </View>
//                         <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>

//                             <View style={{ width: '100%', height: 150, backgroundColor: textGrey, }}>
//                                 <Text style={{
//                                     paddingLeft: 10, paddingRight: 10,
//                                     paddingTop: 10,
//                                     color: textBlue
//                                 }} >Additional Information</Text>
//                                 <Text style={{ height: 100, paddingLeft: 10, paddingRight: 10, }}
//                                 >
//                                     {job_card.aditional_information}</Text>

//                             </View>
//                         </View>
//                         <View style={{ flex: 1, flexDirection: 'row', marginBottom: 20 }}>

//                             <View style={{ width: '100%', height: 150, backgroundColor: textGrey, }}>
//                                 <Text style={{
//                                     paddingLeft: 10, paddingRight: 10,
//                                     paddingTop: 10,
//                                     color: textBlue
//                                 }} >Pit Location</Text>
//                                 <Text style={{ height: 100, paddingLeft: 10, paddingRight: 10, }}
//                                 >
//                                     {job_card.pit_location}</Text>

//                             </View>
//                         </View>
//                         <View style={{ paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
//                             <View style={{ flexDirection: 'column' }}>
//                                 <Text style={{ alignSelf: 'center' }}>Date Service Complete</Text>
//                                 <View style={{ marginTop: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: 150, height: 40, backgroundColor: lightGreen }}>
//                                     <Text style={{ color: mainWhite }}>{job_card.date_service_complete}</Text>
//                                 </View>
//                             </View>
//                             <View style={{ flex: 0.7 }} />
//                             <View style={{ flexDirection: 'column' }}>
//                                 <Text style={{ alignSelf: 'center' }}>Payment Details</Text>
//                                 <View style={{ marginTop: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: 150, height: 40, backgroundColor: lightGreen }}>
//                                     <Text style={{ color: mainWhite }}>{job_card.payment_details}</Text>
//                                 </View>
//                             </View>
//                         </View>
//                         <View style={{ paddingHorizontal: 20, flexDirection: 'row', marginBottom: 30, marginTop: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: mediumGrey }}>
//                             <View style={{ flexDirection: 'column', marginBottom: 20 }}>
//                                 <Text style={{ alignSelf: 'center' }}>Capacity</Text>
//                                 <View style={{ marginTop: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: 150, height: 40, backgroundColor: lightGreen }}>
//                                     <Text style={{ color: mainWhite }}>{job_card.capacity}</Text>
//                                 </View>

//                             </View>
//                             <View style={{ flex: 0.7 }} />
//                             <View style={{ flexDirection: 'column', marginBottom: 20 }}>
//                                 <Text style={{ alignSelf: 'center' }}>Amount</Text>
//                                 <View style={{ marginTop: 10, borderRadius: 5, justifyContent: 'center', alignItems: 'center', width: 150, height: 40, backgroundColor: textGrey }}>
//                                     <Text style={{ color: textBlack }}>{job_card.amount}</Text>
//                                 </View>

//                             </View>
//                         </View>

//                     </View>
//                 </View>

//             </View>



//         )

//     }
//     return (
//         <ScrollView>

//             <RenderForm />
//         </ScrollView>

//     )
// }

// const mapStateProps = (state) => {
//     const { sales_enviroWaste } = state

//     return { sales_enviroWaste }
// }



// export default connect(mapStateProps)(JobCardDetails)


import React, { useState } from 'react'
import { View, Text, ActivityIndicator, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { mainWhite, mainBlue, mainGrey, textGrey, darkGrey, lightGrey, lightGreyBackground, lightGreen, mediumGrey, textBlack, textBlue } from '../../../../common/Colors'
import { Table, Row, Rows } from 'react-native-table-component';
import { sub } from 'react-native-reanimated'

const JobCard = ({ navigation, route, schedule_enviro }) => {
    let paymentArray = [{ "id": 1, "name": 'COD' }, { "id": 2, "name": 'Account' }, { "id": 3, "name": 'Credit Card' }]
    let options = [{ "id": 1, "option": 'Yes' }, { "id": 1, "option": 'No' }]
    const [isCheck, setCheck] = useState(false)
    const [isCheck1, setCheck1] = useState(false)
    const [isCheck2, setCheck2] = useState(false)
    const [isCheck3, setCheck3] = useState(false)
    const [isCheck4, setCheck4] = useState(false)
    const [isCheck5, setCheck5] = useState(false)
    const [isCheck6, setCheck6] = useState(false)
    const [isCheck7, setCheck7] = useState(false)
    const [isCheck8, setCheck8] = useState(false)

    const { job_card_data, isLoading } = schedule_enviro
    // const [compName, setCompName] = useState('')
    // const [compAddr, setCompAddr] = useState('')
    // const [suburb, setSuburb]     = useState('')
    // const [postal, setPostal]     = useState('')
    // const [siteAddr, setSiteAddr] = useState('')
    // const [buildName, setBuildName] = useState('')
    // const [contactName, setContactName] = useState('')
    // const [contactNo, setContactNo] = useState('')
    // const [contactEmail, setContactEmail] = useState('')
    // const [payment, setPayment] = useState('COD')

    // const [serviceDet, setServiceDet] = useState([{type : '', cap : '', freq : '', pit : ''}, {type : '', cap : '', freq : '', pit : ''}, {type : '', cap : '', freq : '', pit : ''}])
    // const [access, setAccess] = useState('')
    // const [tcReq, setTcreq] = useState(false)
    // const [dataForm, setDataForm] = useState(false)
    // const [accessHeight, setAccessHeight] = useState(false)
    // const [keyReq, setKeyReq] = useState(false)
    // const [secReq, setSecReq] = useState(false)
    // const [indReq, setIndReq] = useState(false)
    // const [contName, setContName] = useState('')
    // const [contPh, setContPh] = useState('')
    // const [pitLoc, setPitLoc] = useState('')
    // const [typeOfInd, setTypeOfInd] = useState('')
    // const [waterTap, setWaterTap] = useState('')
    // const [gumReq, setGumReq] = useState(false)
    // const [confSpace, setConfSpace] = useState(false)
    // const [noTruck, setNoTruck] = useState('')
    // const [servTime, setServTime] = useState('')
    // const [spcPPEReq, setSpcPPEReq] = useState(false)
    // const [specify, setSpecify] = useState('')
    // const [compl, setCompl] = useState('')
    // const [sign, setSign] = useState('')
    // const [jobDate, setJobDate] = useState('')


           if (job_card_data === undefined) return (
            <View style={{ marginTop: 300, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={mainBlue} />
            </View>
        )

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
                            <Text
                            >{job_card_data.company_name}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Company Address</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text
                            >{job_card_data.company_address}</Text>

                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Subrub</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text
                            >{job_card_data.subrub}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Postal Code</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text
                            >{job_card_data.postal_code}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Job Site Address</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text
                            >{job_card_data.job_site_address}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Building Name</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text
                            >{job_card_data.building_name}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Job Site Contact Name</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text
                            >{job_card_data.job_site_contact_name}</Text>
                        </View>

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Contact Number</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text
                            >{job_card_data.contact_number}</Text>

                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Contact Email Address</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text
                            >{job_card_data.contact_email_address}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: lightGreyBackground, height: 40 }}>

                    <Text style={{ paddingLeft: 10, marginTop: 10, color: textBlack }}>Payment Details</Text>
                </View>
                <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 10, }}>

                    <Text>{job_card_data.payment_details} </Text>

                </View>
                <View style={{ marginTop: 20, flex: 1, backgroundColor: lightGreyBackground, height: 40 }}>

                    <Text style={{ paddingLeft: 10, marginTop: 10, color: textBlack }}>Service Details</Text>
                </View>
                <View style={{ flexDirection: "row", marginLeft: 10 }}>

                    <View style={{ width: '10%', flexDirection: "column", marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>No</Text>
                        <Text style={{ marginTop: 20 }}>0</Text>
                        <Text style={{ marginTop: 25 }}>1</Text>
                        <Text style={{ marginTop: 25 }}>2</Text>


                    </View>
                    <View style={{ width: '20%', flexDirection: "column", }}>
                        <Text style={{ fontWeight: 'bold' }}>Type</Text>
                        <View style={styles.editableBoxStyle}>
                            {job_card_data.service_list[0] ? (
                                <Text>{job_card_data.service_list[0].waste_type}</Text>
                            ) : (
                                    null
                                )}

                        </View>
                        <View style={styles.editableBoxStyle}>
                        {job_card_data.service_list[1] ? (
                            <Text>{job_card_data.service_list[1].waste_type}</Text>
                        ):(null)}
                        </View>
                        <View style={styles.editableBoxStyle}>
                        {job_card_data.service_list[2] ? (
                            <Text>{job_card_data.service_list[2].waste_type}</Text>
                        ):(null)}
                        </View>


                    </View>
                    <View style={{ width: '20%', flexDirection: "column", marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Capacity</Text>
                        <View style={styles.editableBoxStyle}>
                        {job_card_data.service_list[0] ? (
                            <Text>{job_card_data.service_list[0].capacity}</Text>
                        ):(null)}
                        </View>
                        <View style={styles.editableBoxStyle}>
                        {job_card_data.service_list[1] ? (
                            <Text>{job_card_data.service_list[1].capacity}</Text>
                        ):(null)}
                        </View>
                        <View style={styles.editableBoxStyle}>
                        {job_card_data.service_list[2] ? (
                            <Text>{job_card_data.service_list[2].capacity}</Text>
                        ):(null)}
                        </View>


                    </View>
                    <View style={{ width: '20%', flexDirection: "column", marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Frequency</Text>
                        <View style={styles.editableBoxStyle}>
                        {job_card_data.service_list[0] ? (
                            <Text>{job_card_data.service_list[0].frequency}</Text>
                        ):(null)}

                        </View>
                        <View style={styles.editableBoxStyle}>
                        {job_card_data.service_list[1] ? (
                            <Text>{job_card_data.service_list[1].frequency}</Text>
                        ):(null)}

                        </View>
                        <View style={styles.editableBoxStyle}>
                        {job_card_data.service_list[2] ? (
                            <Text>{job_card_data.service_list[2].frequency}</Text>
                        ):(null)}
                        </View>
                    </View>
                    <View style={{ width: '20%', flexDirection: "column", marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Location</Text>
                        <View style={styles.editableBoxStyle}>
                        {job_card_data.service_list[0] ? (
                            <Text>{job_card_data.service_list[0].pit_location}</Text>
                        ):(null)}
                        </View>
                        <View style={styles.editableBoxStyle}>
                        {job_card_data.service_list[1] ? (
                            <Text>{job_card_data.service_list[1].pit_location}</Text>
                        ):(null)}
                        </View>
                        <View style={styles.editableBoxStyle}>
                        {job_card_data.service_list[2] ? (
                            <Text>{job_card_data.service_list[2].pit_location}</Text>
                        ):(null)}
                        </View>
                    </View>
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
                        <Text>{job_card_data.access_restriction}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >TC required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={{ flex: 1,marginTop:20}}>

                    {job_card_data.tc_required === false ? (
                        <Text>No</Text>
                    ) : (
                            <Text>Yes</Text>

                        )}
                        </View>

                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Data Form</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={{ flex: 1,marginTop:20}}>

                    {job_card_data.waste_data_form === false ? (
                        <Text>No</Text>
                    ) : (
                            <Text>Yes</Text>

                        )}
                        </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Access Height</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text>{job_card_data.access_height}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Key Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={{ flex: 1,marginTop:20}}>

                    {job_card_data.key_required === false ? (
                        <Text>No</Text>
                    ) : (
                            <Text>Yes</Text>

                        )}
                        </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Security Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={{ flex: 1,marginTop:20}}>

                    {job_card_data.security_required === false ? (
                        <Text>No</Text>
                    ) : (
                            <Text>Yes</Text>

                        )}
                        </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Induction Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={{ flex: 1,marginTop:20}}>

                    {job_card_data.induction_required === false ? (
                        <Text>No</Text>
                    ) : (
                            <Text>Yes</Text>

                        )}
                        </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Contact Name</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text>{job_card_data.contact_name}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Phone Number</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text>{job_card_data.phone_number}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Type of Induction</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text>{job_card_data.type_of_induction}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Pit Location</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text>{job_card_data.pit_distacnce_from_truck_location}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Water Tap Location</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text>{job_card_data.water_tap_location}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Gumy Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={{ flex: 1,marginTop:20}}>

                    {job_card_data.gumy_required === false ? (
                        <Text>No</Text>
                    ) : (
                            <Text>Yes</Text>

                        )}
                        </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Confined Space</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={{ flex: 1,marginTop:20}}>

                    {job_card_data.confined_space === false ? (
                        <Text>No</Text>
                    ) : (
                            <Text>Yes</Text>

                        )}
                        </View>

                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Truck Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text>{job_card_data.number_of_trucks_required}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Service Time</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text>{job_card_data.service_time}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >PPE Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    
                    <View style={{ flex: 1,marginTop:20}}>

                        {job_card_data.specific_ppe_reqired === false ? (
                            <Text>No</Text>
                        ) : (
                                <Text>Yes</Text>

                            )}
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >If Yes ,Specify</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text>{job_card_data.if_yes_specify}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Completed By</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text>{job_card_data.completed_by}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Date</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text>{job_card_data.date}</Text>

                    </View>
                </View>

            </SafeAreaView>
        </ScrollView>


    )
}
const mapStateProps = (state) => {
    const { schedule_enviro } = state

    return { schedule_enviro }
}



 export default connect(mapStateProps)(JobCard)
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
