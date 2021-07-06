

import React, { useState } from 'react'
import { View, Text, ActivityIndicator, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { mainWhite, mainBlue, mainGrey, textGrey, darkGrey, lightGrey, lightGreyBackground, lightGreen, mediumGrey, textBlack, textBlue } from '../../../../common/Colors'
import { sub } from 'react-native-reanimated'
import moment from 'moment'

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
    const [serviceDet, setServiceDet] = useState()

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
    let formatted_date=""
    if(job_card_data){
        if(job_card_data.date){
            let date_val = new Date(job_card_data.date)
             formatted_date = moment(date_val).format('YYYY-MM-DD')

        }
    }
console.log("print"+JSON.stringify(job_card_data))
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
                        <Text style={{ marginTop: 10}}
                        >{job_card_data.company_name}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Company Address</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text numberOfLines={2}
                        style={{height: 40, marginTop: 10}}
                        >{job_card_data.company_address}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Subrub</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text style={{height: 40, marginTop: 10}}
                        >{job_card_data.subrub}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Postal Code</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text style={{height: 40, marginTop: 10}}
                        >{job_card_data.postal_code}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Job Site Address</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text numberOfLines={2}
                        style={{height: 40, marginTop: 10}}
                        >{job_card_data.job_site_address}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Building Name</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text style={{height: 40, marginTop: 10}}
                        >{job_card_data.building_name}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Job Site Contact Name</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text style={{height: 40, marginTop: 10}}
                        >{job_card_data.job_site_contact_name}</Text>
                    </View>

                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Contact Number</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text style={{height: 40, marginTop: 10}}
                        >{job_card_data.contact_number}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Contact Email Address</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text numberOfLines={1}
                        style={{height: 40, marginTop: 10}}
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
<Text style={{ fontWeight: 'bold', marginBottom: 20 }}>No</Text>
{job_card_data.service_list ? (
    <>
        {job_card_data.service_list.map((item, key) => {
            return (

                <Text
                    style={{ height: 40, marginTop: 5, }}>{key + 1}</Text>
            )
        })}
    </>
) : (
        null
    )}
</View>
<View style={{ width: '20%', flexDirection: "column", }}>
<Text style={{ fontWeight: 'bold' }}>Type</Text>
{job_card_data.service_list ? (
    <>
        {job_card_data.service_list.map((item, key) => {
            return (
                <View style={styles.editableBoxStyle}>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 10 }}
                        autoCapitalize='none'
                        placeholder="type"
                        value={item.waste_type} 
                        // onChangeText={(e) => {
                        //     setTempInput(e)
                        //     let temp = { ...item, waste_type: e };
                        //     let tempArr = job_card_data.service_list
                        //     tempArr.splice(key, 1, temp)

                        //     setServiceDet(tempArr)
                        // }}

                    // onChangeText={txt => setSubrub(txt)}
                    />
                </View>
            )
        })}
    </>) : (
        null
    )}

</View>
<View style={{ width: '20%', flexDirection: "column", marginLeft: 10 }}>
<Text style={{ fontWeight: 'bold' }}>Capacity</Text>
{job_card_data.service_list ? (
    <>
        {job_card_data.service_list.map((item, key) => {
            return (
                <View style={styles.editableBoxStyle}>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 10 }}
                        autoCapitalize='none'
                        placeholder="capacity"
                        value={item.capacity} 
                        // onChangeText={(e) => {
                        //     setTempInput(e)
                        //     let temp = { ...item, capacity: e };
                        //     let tempArr = job_card_data.service_list
                        //     tempArr.splice(key, 1, temp)

                        //     setServiceDet(tempArr)
                        // }}

                    // onChangeText={txt => setSubrub(txt)}
                    />
                </View>
            )
        })}
    </>
) : (
        null
    )}

</View>
<View style={{ width: '20%', flexDirection: "column", marginLeft: 10 }}>
<Text style={{ fontWeight: 'bold' }}>Frequency</Text>
{job_card_data.service_list ? (
    <>
        {job_card_data.service_list.map((item, key) => {
            return (
                <View style={styles.editableBoxStyle}>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 10 }}
                        autoCapitalize='none'
                        placeholder="Frequency"
                        value={item.frequency} 
                        // onChangeText={(e) => {
                        //     setTempInput(e)
                        //     let temp = { ...item, frequency: e };
                        //     let tempArr = job_card_data.service_list
                        //     tempArr.splice(key, 1, temp)

                        //     setServiceDet(tempArr)
                        // }}

                    // onChangeText={txt => setSubrub(txt)}
                    />
                </View>
            )
        })}
    </>
) : (
        null
    )}
</View>
<View style={{ width: '20%', flexDirection: "column", marginLeft: 10 }}>
<Text style={{ fontWeight: 'bold' }}>Location</Text>
{job_card_data.service_list ? (
    <>
        {job_card_data.service_list.map((item, key) => {
            return (
                <View style={styles.editableBoxStyle}>
                    <TextInput
                        underlineColorAndroid="transparent"
                        style={{ color: mainGrey, fontSize: 14, width: 150, height: 40, marginTop: 10 }}
                        autoCapitalize='none'
                        placeholder="location"
                        value={item.pit_location} 
                        // onChangeText={(e) => {
                        //     setTempInput(e)
                        //     let temp = { ...item, pit_location: e };
                        //     let tempArr = job_card_data.service_list
                        //     tempArr.splice(key, 1, temp)

                        //     setServiceDet(tempArr)
                        // }}

                    // onChangeText={txt => setSubrub(txt)}
                    />
                </View>
            )
        })}
    </>) : (
        null
    )}

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
                    <Text style={{height: 40, marginTop: 10}}
                    >{job_card_data.access_restriction}</Text>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >TC required</Text>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={styles.editableBoxStyle}>

                    {job_card_data.tc_required === false ? (
                        <Text style={{height: 40, marginTop: 10}}>No</Text>
                    ) : (
                            <Text style={{height: 40, marginTop: 10}}>Yes</Text>

                        )}
                </View>

            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >Data Form</Text>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={styles.editableBoxStyle}>

                    {job_card_data.waste_data_form === false ? (
                        <Text style={{height: 40, marginTop: 10}}>No</Text>
                    ) : (
                            <Text style={{height: 40, marginTop: 10}}>Yes</Text>

                        )}
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >Access Height</Text>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={styles.editableBoxStyle}>
                    <Text style={{height: 40, marginTop: 10}}
                    >{job_card_data.access_height}</Text>

                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >Key Required</Text>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={styles.editableBoxStyle}>

                    {job_card_data.key_required === false ? (
                        <Text style={{height: 40, marginTop: 10}}>No</Text>
                    ) : (
                            <Text style={{height: 40, marginTop: 10}}>Yes</Text>

                        )}
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >Security Required</Text>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={styles.editableBoxStyle}>


                    {job_card_data.security_required === false ? (
                        <Text style={{height: 40, marginTop: 10}}>No</Text>
                    ) : (
                            <Text style={{height: 40, marginTop: 10}}>Yes</Text>

                        )}
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >Induction Required</Text>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={styles.editableBoxStyle}>

                    {job_card_data.induction_required === false ? (
                        <Text style={{height: 40, marginTop: 10}}>No</Text>
                    ) : (
                            <Text style={{height: 40, marginTop: 10}}>Yes</Text>

                        )}
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >Contact Name</Text>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={styles.editableBoxStyle}>
                    <Text style={{height: 40, marginTop: 10}} 
                    >{job_card_data.contact_name}</Text>

                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >Phone Number</Text>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={styles.editableBoxStyle}>
                    <Text style={{height: 40, marginTop: 10}} 
                    >{job_card_data.phone_number}</Text>

                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >Type of Induction</Text>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={styles.editableBoxStyle}>
                    <Text style={{height: 40, marginTop: 10}}
                    >{job_card_data.type_of_induction}</Text>

                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >Pit Location</Text>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={styles.editableBoxStyle}>
                    <Text style={{height: 40, marginTop: 10}}
                    >{job_card_data.pit_distacnce_from_truck_location}</Text>

                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >Water Tap Location</Text>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={styles.editableBoxStyle}>
                    <Text style={{height: 40, marginTop: 10}} 
                    >{job_card_data.water_tap_location}</Text>

                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >Gumy Required</Text>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={styles.editableBoxStyle}>


                    {job_card_data.gumy_required === false ? (
                        <Text style={{height: 40, marginTop: 10}}>No</Text>
                    ) : (
                            <Text style={{height: 40, marginTop: 10}}>Yes</Text>

                        )}
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >Confined Space</Text>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={styles.editableBoxStyle}>


                    {job_card_data.confined_space === false ? (
                        <Text style={{height: 40, marginTop: 10}}>No</Text>
                    ) : (
                            <Text style={{height: 40, marginTop: 10}}>Yes</Text>

                        )}
                </View>

            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >Truck Required</Text>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={styles.editableBoxStyle}>
                    <Text style={{height: 40, marginTop: 10}}
                    >{job_card_data.number_of_trucks_required}</Text>
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >Service Time</Text>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={styles.editableBoxStyle}>
                    <Text style={{height: 40, marginTop: 10}} 
                    >{job_card_data.service_time}</Text>

                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >PPE Required</Text>
                </View>
                <View style={{ flex: 0.1 }} />

                <View style={styles.editableBoxStyle}>

                    {job_card_data.specific_ppe_reqired === false ? (
                        <Text style={{height: 40, marginTop: 10}}>No</Text>
                    ) : (
                            <Text style={{height: 40, marginTop: 10}}>Yes</Text>

                        )}
                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >If Yes ,Specify</Text>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={styles.editableBoxStyle}>
                    <Text style={{height: 40, marginTop: 10}} 
                    >{job_card_data.if_yes_specify}</Text>

                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >Completed By</Text>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={styles.editableBoxStyle}>
                    <Text style={{height: 40, marginTop: 10}} 
                    >{job_card_data.completed_by}</Text>

                </View>
            </View>
            <View style={{ flex: 1, flexDirection: 'row', }}>
                <View style={styles.staticBoxStyle}>
                    <Text style={styles.textStyle} >Date</Text>
                </View>
                <View style={{ flex: 0.1 }} />
                <View style={styles.editableBoxStyle}>
                    <Text style={{height: 40, marginTop: 10}} 
                    >{formatted_date}</Text>

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
    marginTop: 10,
  
    // borderBottomWidth: 1,
    // borderColor: mainGrey
},
editableBoxStyle1: {
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