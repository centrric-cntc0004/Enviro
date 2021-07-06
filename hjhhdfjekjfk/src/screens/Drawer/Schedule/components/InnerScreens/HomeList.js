



import React, { useState } from 'react'
import { View, Text, FlatList, Image, TouchableOpacity, Dimensions, } from 'react-native'
import { mainWhite, darkGrey, lightGrey, textDark, mainGrey, lightGreen, mainBlue } from '../../../../../common/Colors'
import { ClientImage, LocationImage } from '../../../../../common/Images'
import { select_data, select_comment, select_status,complete_schedule_list,daywise_schedule_list } from '../common/action'
let width = Dimensions.get('window').width
width = width - (width / 100) * 16;
import { connect } from 'react-redux'



const HomeList = ({ navigation, schedule_enviro, select_client_data, dispatch }) => {

    const RenderContacts = ({ values }) => {
        const { schedule_list, isLoading, type } = schedule_enviro
        const DATA = [1, 45, 7, 6, 9, 9, 90, 98, 98];
        const [selected, setSelected] = useState(schedule_list[0])



        const call_api = (item) => {
            dispatch(select_data(item))
            dispatch(select_status(item.status))

            if (item.comments === null) {

            } else {
                dispatch(select_comment(item.comments))
            }
            navigation.navigate("enviro-detail")
        }



    //     const call_apicompleted = () => {
    //         var day = new Date().getDate()
    // var month = new Date().getMonth() + 1
    // var year = new Date().getFullYear()
    // let date = day + '-' + month + '-' + year
    // let newdate = date.split("-").reverse().join("-");
    // if (day.toString().length <= 1) {
    //     day = '0' + day;
    //     date2 = year + '-' + month + '-' + day;
       

    // }
    // if (month.toString().length <= 1) {
    //     month = '0' + month;
    //     date2 = year + '-' + month + '-' + day;
      
    // } else {
    //     date2 = year + '-' + month + '-' + day;
       


    // }
    //         dispatch(schedule_list(date2, type))
    //         dispatch(complete_schedule_list(type))
    //         dispatch(daywise_schedule_list(date2, date2, type))

    //     }
        const call_apid = (item) => {
            dispatch(select_data(item))
            if (item.comments === null) {

            } else {
                dispatch(select_comment(item.comments))
            }
            navigation.navigate("enviro-detail")
        }

        const RenderList = ({ item }) => {
            if (item === selected) {

                return (
                    <TouchableOpacity
                        onPress={() => call_api(item)}
                        style={{
                            flex: 1, flexDirection: 'column', width: width, borderRadius: 10, borderWidth: 0.2, borderColor: darkGrey,
                            backgroundColor: '#DCDCDC', borderRadius: 20, marginLeft: 10,
                            height: 200,
                        }}>

                        <View style={{
                            flex: 0.5,
                            marginTop: 10,
                            marginBottom: 10,
                            paddingHorizontal: 20,
                            marginRight: 10,
                            alignItems: 'center', flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                                marginTop: 10, marginBottom: 10,
                                alignItems: 'center',
                            }}>
                                <Image style={{ height: 47, width: 47, borderRadius: 25 }} source={ClientImage} />


                            </View>
                            <View style={{
                                flex: 5,
                                width: 140,
                                marginBottom: 10,
                                alignItems: 'center',
                            }}>
                                <Text numberOfLines={1}
                                    style={{ paddingTop: 10, color: darkGrey, fontSize: 14, textAlign: 'left', paddingHorizontal: 20 }} >{item.created_by}</Text>







                            </View>

                            <View style={{
                                flex: 0.9,
                                marginTop: 10,

                                marginBottom: 10,
                                paddingHorizontal: 10,
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <View style={{ width: 80, height: 30, backgroundColor: lightGreen, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: mainWhite, fontSize: 13 }}>Next Job</Text>
                                </View>
                            </View>

                        </View>
                        <View style={{
                            flex: 1.5, alignItems: 'center', flexDirection: 'row',
                        }}>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={{ marginLeft: 10, flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 13, color: textDark, }}>Day</Text>
                                    <Text style={{ fontSize: 13, color: textDark, marginTop: 10 }}>Time</Text>
                                    <Text style={{ fontSize: 13, color: textDark, marginTop: 10 }}>Type</Text>
                                    <Text style={{ fontSize: 13, color: textDark, marginTop: 10 }}>Company</Text>
                                </View>
                                <View style={{ marginLeft: 10, flex: 1.5, flexDirection: 'column' }}>
                                    <Text numberOfLines={1}
                                        style={{ fontSize: 13, color: textDark, }}>: {item.start_date}</Text>
                                    <Text numberOfLines={1}
                                        style={{ fontSize: 13, color: textDark, marginTop: 10 }}>: {item.start_time}</Text>
                                    <Text numberOfLines={1}
                                        style={{ fontSize: 13, color: textDark, marginTop: 10 }}>: {item.job_type}</Text>
                                    <Text numberOfLines={1}
                                        style={{ fontSize: 13, color: textDark, marginTop: 10 }}>: {item.client.site_address}</Text>
                                </View>
                            </View>
                            <View style={{
                                paddingHorizontal: 20, height: 120,
                                flex: 0.5, justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Image style={{ height: 130, marginTop: -10 }} source={LocationImage} />
                            </View>

                        </View>
                    </TouchableOpacity>





                )
            }
            else {
                return (

                    <TouchableOpacity onPress={() => call_apid(item)}
                        style={{
                            flex: 1, flexDirection: 'column', width: width, borderRadius: 10, borderWidth: 0.2, borderColor: darkGrey,
                            backgroundColor: mainWhite, borderRadius: 20, marginLeft: 10,
                            height: 200,
                        }}>

                        <View style={{
                            flex: 0.5,
                            marginTop: 10,
                            marginBottom: 10,
                            paddingHorizontal: 20,
                            marginRight: 10,
                            alignItems: 'center', flexDirection: 'row'
                        }}>
                            <View style={{
                                flex: 1,
                                marginTop: 10, marginBottom: 10,
                                alignItems: 'center',
                            }}>
                                <Image style={{ height: 47, width: 47, borderRadius: 25 }} source={ClientImage} />


                            </View>
                            <View style={{
                                flex: 5,
                                width: 140,
                                marginBottom: 10,
                                alignItems: 'center',
                            }}>
                                <Text numberOfLines={1}
                                    style={{ paddingTop: 10, color: darkGrey, fontSize: 14, textAlign: 'left', paddingHorizontal: 20 }} >{item.created_by}</Text>







                            </View>

                            <View style={{
                                flex: 0.9,
                                marginTop: 10,

                                marginBottom: 10,
                                paddingHorizontal: 10,
                                alignItems: 'center', justifyContent: 'center'
                            }}>
                                <View style={{ width: 80, height: 30, backgroundColor: lightGreen, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: mainWhite, fontSize: 13 }}>Next Job</Text>
                                </View>
                            </View>

                        </View>
                        <View style={{
                            flex: 1.5, alignItems: 'center', flexDirection: 'row',
                        }}>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={{ marginLeft: 10, flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 13, color: textDark, }}>Day</Text>
                                    <Text style={{ fontSize: 13, color: textDark, marginTop: 10 }}>Time</Text>
                                    <Text style={{ fontSize: 13, color: textDark, marginTop: 10 }}>Type</Text>
                                    <Text style={{ fontSize: 13, color: textDark, marginTop: 10 }}>Company</Text>
                                </View>
                                <View style={{ marginLeft: 10, flex: 1.5, flexDirection: 'column' }}>
                                    <Text numberOfLines={1}
                                        style={{ fontSize: 13, color: textDark, }}>: {item.start_date}</Text>
                                    <Text numberOfLines={1}
                                        style={{ fontSize: 13, color: textDark, marginTop: 10 }}>: {item.start_time}</Text>
                                    <Text numberOfLines={1}
                                        style={{ fontSize: 13, color: textDark, marginTop: 10 }}>: {item.job_type}</Text>
                                    <Text numberOfLines={1}
                                        style={{ fontSize: 13, color: textDark, marginTop: 10 }}>: {item.client.site_address}</Text>
                                </View>
                            </View>
                            <View style={{
                                paddingHorizontal: 20, height: 120,
                                flex: 0.5, justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Image style={{ height: 130, marginTop: -10 }} source={LocationImage} />
                            </View>

                        </View>
                    </TouchableOpacity>





                )
            }
        }


        if (schedule_list.length === 0)
            return (
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <View style={{ height: 200, margin: 20, width: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: lightGrey }}>
                        <Text style={{ fontSize: 16, color: mainGrey }}>No Data Found</Text>

                    </View>
                </View>
            )

        return (
            <View style={{ flex: 1.5, backgroundColor: lightGrey, marginLeft: 10, paddingRight: 10 }}>
                <FlatList style={{ marginTop: '1%' }}
                    horizontal
                    data={schedule_list}
                    renderItem={RenderList}
                    keyExtractor={(item, key) => key.toString()}
                    showsHorizontalScrollIndicator={false}
                    onEndReachedThreshold={1}
                    refreshing={false}
                    // onRefresh={() => call_apicompleted()}
                />
            </View>
        )
    }

    return (

        <RenderContacts />

    )

}

const mapStateProps = (state) => {
    const { schedule_enviro } = state

    return { schedule_enviro }
}



export default connect(mapStateProps)(HomeList)



