
import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator, SafeAreaView, StyleSheet, TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { mainWhite, mainBlue, mainGrey, textGrey, darkGrey, lightGrey, lightGreyBackground, lightGreen, mediumGrey, textBlack, textBlue } from '../../../../common/Colors'
import CheckBoxs from './InnerScreen/CheckBoxs'
import { sub } from 'react-native-reanimated'
import moment from 'moment'


const JobCardDetails = ({ navigation, route, sales_enviroWaste }) => {
    let paymentArray = [{ "id": 1, "name": 'COD' }, { "id": 2, "name": 'Account' }, { "id": 3, "name": 'Credit Card' }]
    let options = [{ "id": 1, "option": 'Yes' }, { "id": 1, "option": 'No' }]
    const { job_card, isLoading } = sales_enviroWaste
    const [isCheck, setCheck] = useState(false)
    const [isCheck1, setCheck1] = useState(false)
    const [isCheck2, setCheck2] = useState(false)
    const [isCheck3, setCheck3] = useState(false)
    const [isCheck4, setCheck4] = useState(false)
    const [isCheck5, setCheck5] = useState(false)
    const [isCheck6, setCheck6] = useState(false)
    const [isCheck7, setCheck7] = useState(false)
    const [isCheck8, setCheck8] = useState(false)


   
    const [loader, setLoader] = useState(true)
    useEffect(() => {


        let loadingInterval = setInterval(() => {
            setLoader(false)
            clearInterval(loadingInterval)
        }, 2500)
        return () => {
            clearInterval(loadingInterval)
        }
    }, [])
    if (job_card === undefined || loader) return (
        <View style={{ marginTop: 300, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={mainBlue} />
        </View>
    )
    let formatted_date=""
    if(job_card){
        if(job_card.date){
            let date_val = new Date(job_card.date)
             formatted_date = moment(date_val).format('YYYY-MM-DD')

        }
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
                            <Text style={{ marginTop: 10}}
                            >{job_card.company_name}</Text>
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
                            >{job_card.company_address}</Text>

                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Subrub</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text style={{height: 40, marginTop: 10}}
                            >{job_card.subrub}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Postal Code</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text style={{height: 40, marginTop: 10}}
                            >{job_card.postal_code}</Text>
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
                            >{job_card.job_site_address}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Building Name</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text style={{height: 40, marginTop: 10}}
                            >{job_card.building_name}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Job Site Contact Name</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text style={{height: 40, marginTop: 10}}
                            >{job_card.job_site_contact_name}</Text>
                        </View>

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Contact Number</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text style={{height: 40, marginTop: 10}}
                            >{job_card.contact_number}</Text>

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
                            >{job_card.contact_email_address}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: lightGreyBackground, height: 40 }}>

                    <Text style={{ paddingLeft: 10, marginTop: 10, color: textBlack }}>Payment Details</Text>
                </View>
                <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 10, }}>

                    <Text>{job_card.payment_details} </Text>

                </View>
                <View style={{ marginTop: 20, flex: 1, backgroundColor: lightGreyBackground, height: 40 }}>

                    <Text style={{ paddingLeft: 10, marginTop: 10, color: textBlack }}>Service Details</Text>
                </View>
                <View style={{ flexDirection: "row", marginLeft: 10 }}>

<View style={{ width: '10%', flexDirection: "column", marginLeft: 10 }}>
    <Text style={{ fontWeight: 'bold', marginBottom: 20 }}>No</Text>
    {job_card.service_list ? (
        <>
            {job_card.service_list.map((item, key) => {
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
    {job_card.service_list ? (
        <>
            {job_card.service_list.map((item, key) => {
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
    {job_card.service_list ? (
        <>
            {job_card.service_list.map((item, key) => {
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
    {job_card.service_list ? (
        <>
            {job_card.service_list.map((item, key) => {
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
    {job_card.service_list ? (
        <>
            {job_card.service_list.map((item, key) => {
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
                        >{job_card.access_restriction}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >TC required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>

                        {job_card.tc_required === false ? (
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

                        {job_card.waste_data_form === false ? (
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
                        >{job_card.access_height}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Key Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>

                        {job_card.key_required === false ? (
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


                        {job_card.security_required === false ? (
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

                        {job_card.induction_required === false ? (
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
                        >{job_card.contact_name}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Phone Number</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text style={{height: 40, marginTop: 10}} 
                        >{job_card.phone_number}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Type of Induction</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text style={{height: 40, marginTop: 10}}
                        >{job_card.type_of_induction}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Pit Location</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text style={{height: 40, marginTop: 10}}
                        >{job_card.pit_distacnce_from_truck_location}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Water Tap Location</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text style={{height: 40, marginTop: 10}} 
                        >{job_card.water_tap_location}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Gumy Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>


                        {job_card.gumy_required === false ? (
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


                        {job_card.confined_space === false ? (
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
                        >{job_card.number_of_trucks_required}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Service Time</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text style={{height: 40, marginTop: 10}} 
                        >{job_card.service_time}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >PPE Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />

                    <View style={styles.editableBoxStyle}>

                        {job_card.specific_ppe_reqired === false ? (
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
                        >{job_card.if_yes_specify}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Completed By</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text style={{height: 40, marginTop: 10}} 
                        >{job_card.completed_by}</Text>

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
    const { sales_enviroWaste } = state

    return { sales_enviroWaste }
}



export default connect(mapStateProps)(JobCardDetails)
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
