import React, { useState, useEffect } from 'react'
import { TouchableOpacity, View, StyleSheet, ScrollView, ActivityIndicator, SafeAreaView, Image, TextInput, Text, FlatList, Dimensions } from 'react-native'
import { lightGrey, mainBlue, textBlack, mainWhite, mainGrey, textGrey, textBlue, textlightgrey, lightGreen } from '../../../../common/Colors'
import { connect } from 'react-redux'
import { ClientImage } from '../../../../common/Images'
import MapViews from './InnerScreen/MapViews'
import Job from './InnerScreen/Job'
import { BASE_IMAGE_URL } from '../../../../store/endpoint'
import { job_performance_details, job_card_data,fetch_selected_payment,fetch_job_card_full_data } from './common/action'
import { SALES_REVIEW, SALES_JOB_CARD } from '../../../../store/endpoint'
import Api from '../../../../store/api'
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal'
import UpdateJobCard from './UpdateJobCard'



let user_location = ""
let width = Dimensions.get('window').width / 6
let id = ""


const QuoteDetail = ({ navigation, route, job_performance_detail, isLoading, dispatch }) => {


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
        if (job_performance_detail.data) {
            if (job_performance_detail.data.quote) {
                if (job_performance_detail.data.quote.client.id !== null) {
                    id = job_performance_detail.data.quote.client.id.toString()
                }
            }
        } else {

        }
    }




    const [loader, setLoader] = useState(true)
    const [editModal, setEditModal] = useState(false)
    const [jobCardObj, setJobCardObj] = useState({})
    const [updateLoader, setUpdateLoader] = useState(false)
    const [addInfo, setAddInfo] = useState("")
    const [pitLoc, setPitLoc] = useState("")
    const [restrict, setRestrict] = useState("")
    const [address, setAddress] = useState("")
    const [subrub, setSubrub] = useState("")
    const [loaderA, setLoaderA] = useState(false)
    const [idA, setId] = useState('')

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
        if (job_performance_detail) {
            if (job_performance_detail.data) {
                if (job_performance_detail.data.quote) {
                     dispatch(job_card_data(job_performance_detail.data.quote.id))
                    // dispatch(job_card_data(706))

                    navigation.navigate("JobCardDetail", { items: job_performance_detail.data.job })
                }
            }
        }
    }

    const call_Modal = () => {

        if (job_performance_detail.data) {
            if (job_performance_detail.data.quote) {
                setUpdateLoader(true)
                Api('get', `${SALES_JOB_CARD}${job_performance_detail.data.quote.id}/`).then(res => {
                    // Api('get', `${SALES_JOB_CARD}${706}/`).then(res => {
   

                    console.log("RESPONSE", res)
                    setJobCardObj(res)
                    setAddInfo(res.aditional_information)
                    setPitLoc(res.pit_location)
                    setRestrict(res.access_restriction)
                    setAddress(res.site_location)
                    setSubrub(res.site_suburb)
                    setId(res.id)


                    setUpdateLoader(false)
                    // setEditModal(true)
                    if(res){
                        dispatch(fetch_job_card_full_data(res))
                       
                            dispatch(fetch_selected_payment({id:1,name:res.payment_details}))

                        

                    }
                    navigation.navigate("UpdateJobCard",{data:res});


                })
            }
        }



    }

    const updateCard = () => {
        setLoaderA(true)

        let content = new FormData()
        content.append('custom_site_suburb', subrub)
        content.append('custom_site_address', address)
        content.append('custom_information', addInfo)
        content.append('custom_pit_location', pitLoc)
        content.append('custom_access_restriction', restrict)
        content.append('custom_quote', job_performance_detail.data.quote.id)



        const success = () => {
            setLoaderA(false)

            setEditModal(false)
            Toast.showWithGravity('Updated Successfully', Toast.SHORT, Toast.BOTTOM);

        }
        const failure = () => {
            setLoaderA(false)

            setEditModal(false)
            Toast.showWithGravity('Failed ! Try again', Toast.SHORT, Toast.BOTTOM);


        }
        Api('patch-form', `${SALES_JOB_CARD}${idA}/`, content, success, failure)


    }


    const completeReview = (val, act) => {

        const success = () => {

        }
        const failed = () => {

        }
        Api('get', `${SALES_REVIEW}${act}/${val}/`).then(res => {
            if (res.status === 200) {
                success()
                Toast.showWithGravity('Updated Successfully', Toast.SHORT, Toast.BOTTOM);
                navigation.pop()

            }
            else {
                failed()
                Toast.showWithGravity('Failed !', Toast.SHORT, Toast.BOTTOM);

            }
        })

    }
    if (job_performance_detail === undefined || loader === true) return (
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
                       {/* {} */}
                    <TouchableOpacity onPress={() => call_api_jobcard()}
                        style={{ marginTop: 10, marginLeft: "70%", justifyContent: 'center', alignItems: 'center', borderRadius: 20, width: 90, height: 30, borderWidth: 0.3, borderColor: mainGrey }} >
                        <Text>Job Card</Text>
                    </TouchableOpacity>


                    <View style={{ flex: 1, backgroundColor: mainWhite }}>

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
                                            style={{ width: 150, color: mainGrey, fontSize: 14, alignSelf: 'center' }}
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

                    <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
                        {/* {  quote && !quote.sales_team_review ? */}
                        <TouchableOpacity
                            onPress={() => call_Modal()}
                            style={{ justifyContent: 'center', alignItems: 'center', width: 150, backgroundColor: mainBlue, height: 38, marginTop: 10, marginBottom: 10, borderRadius: 30 }}>
                            {updateLoader ? (
                                <ActivityIndicator size="small" color={mainWhite}></ActivityIndicator>
                            ) : (
                                    <Text style={{ fontSize: 14, color: mainWhite }}>Update job Card</Text>
                                )}
                        </TouchableOpacity>
                        {job_performance_detail.data.quote && !job_performance_detail.data.quote.sales_team_review ? (
                            <TouchableOpacity
                                onPress={() => completeReview(job_performance_detail.data.quote.id, 'accepted')}
                                style={{ marginLeft: 20, justifyContent: 'center', alignItems: 'center', width: 150, backgroundColor: lightGreen, height: 38, marginTop: 10, marginBottom: 10, borderRadius: 30 }}>
                                <Text style={{ fontSize: 14, color: mainWhite }}> Review is Complete</Text>
                            </TouchableOpacity>
                        ) : (
                                <TouchableOpacity
                                    onPress={() => completeReview(job_performance_detail.data.quote.id, 'rejected')}
                                    style={{  marginLeft: 20, justifyContent: 'center', alignItems: 'center', width: 150, backgroundColor: "#FF0000", height: 38, marginTop: 10, marginBottom: 10, borderRadius: 30 }}>
                                    <Text style={{ fontSize: 14, color: mainWhite }}> Review is pending</Text>
                                </TouchableOpacity>
                            )}

                    </View>
                  


                </View>

                {/* )} */}
            </SafeAreaView>

        </ScrollView>

    )


}

const mapStateToProps = (state) => {
    const { selected_client, job_performance_detail, isLoading } = state.sales_enviroWaste
    return { selected_client, job_performance_detail, isLoading }

}



export default connect(mapStateToProps)(QuoteDetail)



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


