// import React from 'react'
// import { View, Text, ActivityIndicator, } from 'react-native'
// import { ScrollView } from 'react-native-gesture-handler'

import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, SafeAreaView, StyleSheet, TouchableOpacity } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { connect } from 'react-redux'
import { mainWhite, mainBlue, mainGrey, textGrey, darkGrey, lightGrey, lightGreyBackground, lightGreen, mediumGrey, textBlack, textBlue } from '../../../../common/Colors'
import Toast from 'react-native-simple-toast';
import { fetch_job_card, job_list } from './common/action'
import moment from "moment"


const AddJobIndividual = ({ navigation, route, sales_enviroWaste, dispatch }) => {
    let paymentArray = [{ "id": 1, "name": 'COD' }, { "id": 2, "name": 'Account' }, { "id": 3, "name": 'Credit Card' }]
    let options = [{ "id": 1, "option": 'Yes' }, { "id": 1, "option": 'No' }]
    const { job_full } = sales_enviroWaste
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

    const addJob = () => {
        let name = ""
        if (job_full.company_name !== "") {
            name = job_full.company_name
        } else {
            name = "job"
        }
        let item1 = { "id": job_full.id, "name": name }


        dispatch(fetch_job_card(item1))
        Toast.showWithGravity('Job card Added Successfully', Toast.SHORT, Toast.BOTTOM);

        navigation.pop()



    }

    if (job_full === undefined || loader) return (
        <View style={{ marginTop: 300, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={mainBlue} />
        </View>
    )
    let formatted_date=""
    if(job_full){
        if(job_full.date){
            let date_val = new Date(job_full.date)
             formatted_date = moment(date_val).format('YYYY-MM-DD')

        }
    }

    console.log("data" + JSON.stringify(job_full))
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
                            <Text style={{ height: 40, marginTop: 10 }}
                            >{job_full.company_name}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Company Address</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text style={{ height: 40, marginTop: 10 }}
                            >{job_full.company_address}</Text>

                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Subrub</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text
                            >{job_full.subrub}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Postal Code</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text style={{ height: 40, marginTop: 10 }}
                            >{job_full.postal_code}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Site Address</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text style={{ height: 40, marginTop: 10 }}
                            >{job_full.job_site_address}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Building Name</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text style={{ height: 40, marginTop: 10 }}
                            >{job_full.building_name}</Text>
                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Site Contact Name</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text style={{ height: 40, marginTop: 10 }}
                            >{job_full.job_site_contact_name}</Text>
                        </View>

                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Contact Number</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text style={{ height: 40, marginTop: 10 }}
                            >{job_full.contact_number}</Text>

                        </View>
                    </View>
                    <View style={{ flex: 1, flexDirection: 'row', }}>
                        <View style={styles.staticBoxStyle}>
                            <Text style={styles.textStyle} >Email Address</Text>
                        </View>
                        <View style={{ flex: 0.1 }} />
                        <View style={styles.editableBoxStyle}>
                            <Text style={{ height: 40, marginTop: 10 }}
                            >{job_full.contact_email_address}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: lightGreyBackground, height: 40 }}>

                    <Text style={{ paddingLeft: 10, marginTop: 10, color: textBlack }}>Payment Details</Text>
                </View>
                <View style={{ flexDirection: "row", paddingLeft: 20, marginTop: 10, }}>

                    <Text
                    >{job_full.payment_details} </Text>

                </View>
                <View style={{ marginTop: 20, flex: 1, backgroundColor: lightGreyBackground, height: 40 }}>

                    <Text style={{ paddingLeft: 10, marginTop: 10, color: textBlack }}>Service Details</Text>
                </View>
                <View style={{ marginTop: 10, flexDirection: "row", marginLeft: 10 }}>

                    <View style={{ width: '10%', flexDirection: "column", marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>No</Text>
                        <Text style={{ marginTop: 20 }}>0</Text>
                        <Text style={{ marginTop: 25 }}>1</Text>
                        <Text style={{ marginTop: 25 }}>2</Text>


                    </View>
                    <View style={{ width: '20%', flexDirection: "column", }}>
                        <Text style={{ fontWeight: 'bold' }}>Type</Text>
                        <View style={styles.editableBoxStyle}>
                            {job_full.service_list[0] ? (
                                <Text style={{ height: 40, marginTop: 10 }}
                                >{job_full.service_list[0].waste_type}</Text>
                            ) : (
                                    null
                                )}

                        </View>
                        <View style={styles.editableBoxStyle}>
                            {job_full.service_list[1] ? (
                                <Text style={{ height: 40, marginTop: 10 }}
                                >{job_full.service_list[1].waste_type}</Text>
                            ) : (null)}
                        </View>
                        <View style={styles.editableBoxStyle}>
                            {job_full.service_list[2] ? (
                                <Text style={{ height: 40, marginTop: 10 }}
                                >{job_full.service_list[2].waste_type}</Text>
                            ) : (null)}
                        </View>


                    </View>
                    <View style={{ width: '20%', flexDirection: "column", marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Capacity</Text>
                        <View style={styles.editableBoxStyle}>
                            {job_full.service_list[0] ? (
                                <Text style={{ height: 40, marginTop: 10 }}
                                >{job_full.service_list[0].capacity}</Text>
                            ) : (null)}
                        </View>
                        <View style={styles.editableBoxStyle}>
                            {job_full.service_list[1] ? (
                                <Text>{job_full.service_list[1].capacity}</Text>
                            ) : (null)}
                        </View>
                        <View style={styles.editableBoxStyle}>
                            {job_full.service_list[2] ? (
                                <Text style={{ height: 40, marginTop: 10 }}
                                >{job_full.service_list[2].capacity}</Text>
                            ) : (null)}
                        </View>


                    </View>
                    <View style={{ width: '20%', flexDirection: "column", marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Frequency</Text>
                        <View style={styles.editableBoxStyle}>
                            {job_full.service_list[0] ? (
                                <Text style={{ height: 40, marginTop: 10 }}
                                >{job_full.service_list[0].frequency}</Text>
                            ) : (null)}

                        </View>
                        <View style={styles.editableBoxStyle}>
                            {job_full.service_list[1] ? (
                                <Text style={{ height: 40, marginTop: 10 }}
                                >{job_full.service_list[1].frequency}</Text>
                            ) : (null)}

                        </View>
                        <View style={styles.editableBoxStyle}>
                            {job_full.service_list[2] ? (
                                <Text style={{ height: 40, marginTop: 10 }}
                                >{job_full.service_list[2].frequency}</Text>
                            ) : (null)}
                        </View>
                    </View>
                    <View style={{ width: '20%', flexDirection: "column", marginLeft: 10 }}>
                        <Text style={{ fontWeight: 'bold' }}>Location</Text>
                        <View style={styles.editableBoxStyle}>
                            {job_full.service_list[0] ? (
                                <Text style={{ height: 40, marginTop: 10 }}
                                >{job_full.service_list[0].pit_location}</Text>
                            ) : (null)}
                        </View>
                        <View style={styles.editableBoxStyle}>
                            {job_full.service_list[1] ? (
                                <Text style={{ height: 40, marginTop: 10 }}
                                >{job_full.service_list[1].pit_location}</Text>
                            ) : (null)}
                        </View>
                        <View style={styles.editableBoxStyle}>
                            {job_full.service_list[2] ? (
                                <Text style={{ height: 40, marginTop: 10 }}
                                >{job_full.service_list[2].pit_location}</Text>
                            ) : (null)}
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
                        <Text style={{ height: 40, marginTop: 10 }}
                        >{job_full.access_restriction}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >TC required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={{ flex: 1, marginTop: 20, marginRight: 10 }}>

                        {job_full.tc_required === false ? (
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
                    <View style={{ flex: 1, marginTop: 20, marginRight: 10 }}>

                        {job_full.waste_data_form === false ? (
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
                        <Text style={{ height: 40, marginTop: 10 }}
                        >{job_full.access_height}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Key Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={{ flex: 1, marginTop: 20, marginRight: 10 }}>

                        {job_full.key_required === false ? (
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
                    <View style={{ flex: 1, marginTop: 20, marginRight: 10 }}>

                        {job_full.security_required === false ? (
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
                    <View style={{ flex: 1, marginTop: 20, marginRight: 10 }}>

                        {job_full.induction_required === false ? (
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
                        <Text style={{ height: 40, marginTop: 10 }}
                        >{job_full.contact_name}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Phone Number</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text style={{ height: 40, marginTop: 10 }}
                        >{job_full.phone_number}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Type of Induction</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text style={{ height: 40, marginTop: 10 }}
                        >{job_full.type_of_induction}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Pit Location</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text style={{ height: 40, marginTop: 10 }}
                        >{job_full.pit_distacnce_from_truck_location}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Water Tap Location</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text style={{ height: 40, marginTop: 10 }}
                        >{job_full.water_tap_location}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Gumy Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={{ flex: 1, marginTop: 20, marginRight: 10 }}>

                        {job_full.gumy_required === false ? (
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
                    <View style={{ flex: 1, marginTop: 20, marginRight: 10 }}>

                        {job_full.confined_space === false ? (
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
                        <Text style={{ height: 40, marginTop: 10 }}>{job_full.number_of_trucks_required}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Service Time</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text style={{ height: 40, marginTop: 10 }}>{job_full.service_time}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >PPE Required</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />

                    <View style={{ flex: 1, marginTop: 20, marginRight: 10 }}>

                        {job_full.specific_ppe_reqired === false ? (
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
                        <Text style={{ height: 40, marginTop: 10 }}>{job_full.if_yes_specify}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Completed By</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text style={{ height: 40, marginTop: 10 }}>{job_full.completed_by}</Text>

                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <View style={styles.staticBoxStyle}>
                        <Text style={styles.textStyle} >Date</Text>
                    </View>
                    <View style={{ flex: 0.1 }} />
                    <View style={styles.editableBoxStyle}>
                        <Text numberOfLines={1} style={{ height: 40, marginTop: 10 }}>{formatted_date}</Text>

                    </View>
                </View>
                {job_full.connected === false ? (
                    <TouchableOpacity onPress={() => addJob()}
                        style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, marginBottom: 20 }}>

                        <View style={{ borderRadius: 20, height: 40, width: 150, justifyContent: 'center', alignItems: 'center', backgroundColor: mainBlue }}>

                            <Text style={{ color: mainWhite }}>Add</Text>

                        </View>
                    </TouchableOpacity>
                ) : (
                        null
                    )}
            </SafeAreaView>
        </ScrollView>


    )
}
const mapStateProps = (state) => {
    const { sales_enviroWaste } = state

    return { sales_enviroWaste }
}



export default connect(mapStateProps)(AddJobIndividual)
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
        marginLeft: 5,
        borderBottomWidth: 1,
        borderColor: mainGrey
    },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 }



});
