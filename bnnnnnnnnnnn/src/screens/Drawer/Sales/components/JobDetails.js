import React, { useState, useEffect } from 'react'
import {TouchableOpacity, View, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView, Image, TextInput, Text, FlatList, Dimensions } from 'react-native'
import { mainBlue, mainWhite, mainGrey, textGrey, textBlue, textlightgrey } from '../../../../common/Colors'
import { connect } from 'react-redux'
import { ClientImage } from '../../../../common/Images'
import MapViews from './InnerScreen/MapViews'
import Job from './InnerScreen/Job'
import { BASE_IMAGE_URL } from '../../../../store/endpoint'
import { job_performance_details,job_card_data } from './common/action'
let user_location = ""
let width = Dimensions.get('window').width / 6
let id = ""


const JobDetails = ({ navigation, route, job_performance_detail, isLoading,dispatch }) => {
 console.log("job_performance_detail"+JSON.stringify(job_performance_detail))

    if (job_performance_detail) {
        if (job_performance_detail.client_latitude !== "" || undefined && job_performance_detail.client_longitude !== "" || undefined) {
            // user_location={"latitude":parseFloat(job_performance_detail.client_latitude),"longitude":parseFloat(job_performance_detail.client_longitude)}
            user_location = { "latitude": 10.676676, "longitude": 79.09909889 }

        } else {
            user_location = { "latitude": 10.676676, "longitude": 79.09909889 }

        }
    } else {
        user_location = { "latitude": 10.676676, "longitude": 79.09909889 }

    }
    if (job_performance_detail) {
    if (job_performance_detail.data.quote.client.id !== null) {
        id = job_performance_detail.data.quote.client.id.toString()
    } else {

    }
}



    const RenderContacts = () => {

        const [individual_client, setIndividualClient] = useState('')
        const [loader, setLoader] = useState(true)
        useEffect(() => {
            let loadingInterval = setInterval(() => {
                setLoader(false)
                clearInterval(loadingInterval)
            }, 1500)
            return () => {
                clearInterval(loadingInterval)
            }
        }, [])
        const call_api_jobcard = () => {
            if (job_performance_detail.data) {
                if (job_performance_detail.data.quote) {
                    if(job_performance_detail.data.quote.id!==""||null){
                    dispatch(job_card_data(job_performance_detail.data.quote.id))

                    navigation.navigate("JobCardDetail", { items: job_performance_detail.data.job })
                }
                }
            }
            
        }

        if (job_performance_detail === undefined || loader===true) return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={mainBlue} />
            </View>
        )

        return (
            <ScrollView style={{ flex: 1, backgroundColor: mainWhite }}>
                <SafeAreaView style={{ flex: 1, backgroundColor: mainWhite }}>


                    <View style={{ flex: 1, backgroundColor: mainWhite }}>
                        <View style={{ backgroundColor: textGrey, height: 11 }}>
                        </View>
                        <View style={{ flex: 1, backgroundColor: mainWhite }}>
                            
                        <TouchableOpacity onPress={() => call_api_jobcard()}
                                style={{ marginTop: 10, marginLeft: "70%", justifyContent: 'center', alignItems: 'center', borderRadius: 20, width: 90, height: 30, borderWidth: 0.3, borderColor: mainGrey }} >
                                <Text>Job Card</Text>
                            </TouchableOpacity>
                       
                            <View style={{ flex: 2.5, marginTop: '3%', flexDirection: 'row', height: 80 }}>
                                <View style={{ flex: 0.3 }} />
                                <View style={{ flex: 1, }}>
                                    <Image style={{ height: 80, width: 80, borderRadius: 5 }} source={ClientImage} />
                                </View>
                                <View style={{ flex: 0.1 }} />
                                <View style={{ paddingHorizontal: 20, flexDirection: 'column', flex: 2.2, }}>
                                    <View style={{ flex: 0.1, flexDirection: 'row', marginTop: 5, }}>
                                        <View style={styles.staticBoxStyle}>
                                            <Text style={styles.textStyle} >Client Id</Text>
                                        </View>
                                        <View style={{ flex: 0.05 }} />
                                        <View style={styles.editableBoxStyle}>
                                            <Text style={{ alignSelf: 'center' }}>:</Text>

                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                                autoCapitalize='none'
                                                placeholder="Client Id"
                                                editable={false}
                                                value={id}
                                            // onChangeText={txt => setClientId(txt)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', marginTop: 30 }}>
                                        <View style={styles.staticBoxStyle}>
                                            <Text style={styles.textStyle} >Client Name</Text>
                                        </View>
                                        <View style={{ flex: 0.1 }} />
                                        <View style={styles.editableBoxStyle}>
                                            <Text style={{ alignSelf: 'center' }}>:</Text>

                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                style={{ color: mainGrey, fontSize: 14, alignSelf: 'center', width: 150 }}
                                                autoCapitalize='none'
                                                placeholder="Client Name"
                                                value={job_performance_detail.data.quote.client.name}
                                                numberOfLines={1}
                                                editable={false}
                                            // onChangeText={txt => setClientName(txt)}
                                            />
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View style={{ flex: 3.3, backgroundColor: mainWhite, marginTop: 10, marginBottom: 10 }}>

                                <View style={{ paddingHorizontal: 20, flexDirection: 'column', flex: 2, }}>
                                    <View style={{ flex: 1, flexDirection: 'row', }}>
                                        <View style={{ height: 30, flex: 0.5, }}>
                                            <Text style={styles.textStyle} >Tab Type</Text>
                                        </View>
                                        <View style={{ flex: 0.1 }} />
                                        <View style={styles.editableBoxStyle}>
                                            <Text style={{ alignSelf: 'center', color: mainGrey }}>: {job_performance_detail.data.quote.tab_type}</Text>


                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', }}>
                                        <View style={{ height: 30, flex: 0.5, }}>
                                            <Text style={styles.textStyle} >Amount</Text>
                                        </View>
                                        <View style={{ flex: 0.1 }} />
                                        <View style={styles.editableBoxStyle}>
                                            <Text style={{ alignSelf: 'center' }}>:</Text>

                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                                autoCapitalize='none'
                                                value={job_performance_detail.data.quote.invoice_amount}
                                                placeholder="Code"
                                                editable={false}
                                                placeholderTextColor={textlightgrey}
                                            // onChangeText={txt => setClientBuilding(txt)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', }}>
                                        <View style={{ height: 30, flex: 0.5, }}>
                                            <Text style={styles.textStyle} >Status</Text>
                                        </View>
                                        <View style={{ flex: 0.1 }} />
                                        <View style={styles.editableBoxStyle}>
                                            <Text style={{ alignSelf: 'center' }}>:</Text>

                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                style={{width:150, color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                                autoCapitalize='none'
                                                value={job_performance_detail.data.quote.status}
                                                placeholder="type"
                                                editable={false}

                                            // onChangeText={txt => setClientLocation(txt)}
                                            />
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', }}>
                                        <View style={{ height: 30, flex: 0.5, }}>
                                            <Text style={styles.textStyle} >Quoted By</Text>
                                        </View>
                                        <View style={{ flex: 0.1 }} />
                                        <View style={styles.editableBoxStyle}>
                                            <Text style={{ alignSelf: 'center' }}>:</Text>

                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                style={{ color: mainGrey, fontSize: 14, alignSelf: 'center' }}
                                                autoCapitalize='none'
                                                value={job_performance_detail.data.quote.created_by.name}
                                                placeholder="Quoted by"
                                                editable={false}
                                            // onChangeText={txt => setClientLocation(txt)}
                                            />
                                        </View>
                                    </View>
                                    

                                </View>

                            </View>
                            <MapViews navigation={navigation} data={user_location} />



                            <Job navigation={navigation} />
                            {job_performance_detail.schedule ? (
                                <View>
                                    {job_performance_detail.schedule.gallery.length !== 0 ? (
                                        <FlatList style={{ paddingBottom: 40 }}
                                            horizontal
                                            data={job_performance_detail.schedule.gallery}
                                            renderItem={({ item: rowData }) => {
                                                return (
                                                    <Image style={{ marginLeft: 20, width: width, height: width }}
                                                        source={{ uri: BASE_IMAGE_URL + rowData.file }} />
                                                )
                                            }}
                                        />
                                    ) : (
                                            null
                                        )}
                                </View>
                            ) : (
                                    null
                                )}
                            {job_performance_detail.schedule ? (
                                <View>
                                    {job_performance_detail.schedule.signature !== undefined ? (
                                        <View style={{ flexDirection: 'column', backgroundColor: mainWhite }}>
                                            <Image style={{ marginLeft: 20, width: width, height: width }}
                                                source={{ uri: BASE_IMAGE_URL + job_performance_detail.schedule.signature }} />
                                        </View>
                                    ) : (
                                            null

                                        )}


                                </View>



                            ) : (
                                    null
                                )}


                        </View>




                    </View>
                    {/* )} */}
                </SafeAreaView>

            </ScrollView>

        )
    }





    return (

        <View style={{ flex: 1 }}>
            <RenderContacts />
        </View>

    )

}


const mapStateToProps = (state) => {
    const { selected_client, job_performance_detail, isLoading } = state.sales_enviroWaste
    return { selected_client, job_performance_detail, isLoading }

}



export default connect(mapStateToProps)(JobDetails)



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
        color: textBlue
    },
    staticBoxStyle: {
        flex: 1,
        backgroundColor: mainWhite,
        height: 40,
    },
    editableBoxStyle: {
        flex: 1,
        height: 40,
        flexDirection: 'row',

    }



});


