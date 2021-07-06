import React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native'
import { lightGrey, darkGrey, mainGrey, textDark, mainWhite, lightGreen } from '../../../../../common/Colors'
import { ClientImage } from '../../../../../common/Images'
import { connect } from 'react-redux'
import { daywise_schedule_list, select_data, select_comment, select_status } from '../common/action'
let date2 = ""
import moment from "moment"

const RoasterList = ({ navigation, schedule_enviro, select_client_data, dispatch }) => {





    const RenderContacts = ({ navigation }) => {
        const { schedule_list, complete_schedule_list } = schedule_enviro
        console.log("gggggggg"+JSON.stringify( complete_schedule_list ))

        const call_data = (item) => {
            dispatch(select_data(item))
            dispatch(select_status(item.status))

            if (item.comments === null) {

            } else {
                dispatch(select_comment(item.comments))
            }

            navigation.navigate("enviro-detail")
        }

        const call_weekapi = () => {
            var day = new Date().getDate()
            var month = new Date().getMonth() + 1
            var year = new Date().getFullYear()
            let date = day + '-' + month + '-' + year
            let newdate = date.split("-").reverse().join("-");
            if (day.toString().length <= 1) {
                day = '0' + day;
                date2 = year + '-' + month + '-' + day;


            } else if (month.toString().length <= 1) {
                month = '0' + month;
                date2 = year + '-' + month + '-' + day;


            } else {
                date2 = year + '-' + month + '-' + day;



            }
            var curr = new Date();

            let lastday = new Date(curr.getTime() + 60 * 60 * 24 * 6 * 1000); //adding (60*60*6*24*1000) means adding six days to the firstday which results in lastday (saturday) of the week

            let date_val = new Date(lastday)
            let formatted_date = moment(date_val).format('YYYY-MM-DD')

            console.log(formatted_date)
            dispatch(daywise_schedule_list(date2, formatted_date))





        }

        const DATA = [1, 4, 6, 8, 9];
        const delete_api = (id, date) => {
            Alert.alert(
                "Confirmation",
                "Are you sure to delete?",
                [
                    {
                        text: "Cancel",
                        onPress: () => console.log("kkk"),
                        style: "cancel"
                    },
                    { text: "OK", onPress: () => call_api(id, date) }
                ],
                { cancelable: false }
            );
        }
        const call_api = (id, date) => {
            let data = {
                id: id,
                date: date
            }
            const onSuccess = (response) => {
            }

            const onFailue = (response) => {
            }
            let functions = {
                success: onSuccess,
                failed: onFailue
            }
            roaster_delete_data(data, functions)

        }
        const RenderList = ({ item }) => {
            const { id, day } = item

            return (
                <TouchableOpacity
                    onPress={() => call_data(item)}
                >
                    <View style={{
                        flexDirection: 'row', flex: 1, height: 85, backgroundColor: mainWhite,
                        marginTop: 10, borderWidth: 0.26, borderColor: darkGrey, borderRadius: 10,
                    }}>

                        <View style={{ marginBottom: 3, flex: 1, backgroundColor: mainWhite, marginTop: 10, marginLeft: 5 }}>
                            <View style={{ flex: 1, }}>
                                <Image style={{ marginLeft: 5, height: 60, width: 60, borderRadius: 32.5 }} source={ClientImage} />
                            </View>
                        </View>
                        <View style={{ marginBottom: 3, flex: 4, flexDirection: 'column', marginTop: 10, marginLeft: 5, backgroundColor: mainWhite, borderRadius: 30 }}>
                            <View style={{ flex: 1.3, flexDirection: 'row' }}>
                                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: mainWhite }}>
                                    <View style={{ flexDirection: 'column', marginTop: 10 }}>
                                        <Text numberOfLines={1}
                                            style={{ paddingLeft: 10, color: mainGrey, textAlign: 'justify', fontSize: 14 }}>{item.created_by}</Text>
                                        <Text style={{ paddingLeft: 10, paddingTop: 5, color: mainGrey, textAlign: 'justify', fontSize: 12 }}>{item.start_time}-{item.end_time}</Text>
                                    </View>
                                </View>
                                <View style={{ marginBottom: 3, marginTop: 10, marginLeft: 5, flex: 1, flexDirection: 'column', backgroundColor: mainWhite, }}>

                                    <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: textDark, textAlign: 'justify', fontSize: 12 }}>Job {item.job}</Text>
                                        <View style={{ marginTop: 5, justifyContent: 'center', alignItems: 'center', width: 85, height: 25, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 20 }}>
                                            <Text style={{ color: textDark, textAlign: 'justify', fontSize: 12 }}>{item.status}</Text>

                                        </View>
                                    </View>
                                </View>
                            </View>

                        </View>
                    </View>
                </TouchableOpacity>
            )
        }


        return (
            <View style={{ flex: 1, backgroundColor: lightGrey, paddingHorizontal: 20, paddingBottom: 10 }}>
                {/* <Text style={{ color: textDark, fontSize: 14,marginTop:'1%' }}>Todays Roaster</Text> */}
                <View style={{ flexDirection: 'row', marginTop: '1%', }}>
                    <View style={{
                        flex: 1, marginRight: 10, alignItems: 'center', flexDirection: 'row', paddingLeft: 10, paddingRight: 5,
                    }}>

                        <View style={{ flex: 4, justifyContent: 'center', }}>
                            <Text style={{ color: textDark, fontSize: 16, }}>Schedule List</Text>
                        </View>
                    </View>

                    <View style={{ flex: 0.3, }} />

                    <TouchableOpacity onPress={() => call_weekapi()}

                        style={{
                            flex: 0.4,
                            backgroundColor: 'orange',

                            marginTop: 10,
                            marginBottom: 10, height: 30,
                            alignItems: 'center', justifyContent: 'center', alignItems: 'center',
                            flexDirection: 'row', borderRadius: 20, borderWidth: 0.2, backgroundColor: mainWhite, borderColor: mainGrey
                        }}>

                        <Text style={{ color: lightGreen, textAlign: 'center', fontSize: 12 }} >Week</Text>
                    </TouchableOpacity>




                </View>
                {complete_schedule_list.length === 0 ? (
                    <View style={{ height: 250, width: '100%', borderRadius: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: lightGrey }}>
                        <Text style={{ fontSize: 16, color: mainGrey }}>No Data Found</Text>

                    </View>
                ) : (

                        <FlatList
                            style={{}}
                            data={complete_schedule_list}
                            renderItem={RenderList}
                            keyExtractor={(item, key) => key.toString()}
                            showsVerticalScrollIndicator={false}
                            onEndReachedThreshold={1}
                            refreshing={false}
                        />
                    )}
            </View>
        )
    }

    return (

        <RenderContacts navigation={navigation} />

    )


}

const mapStateProps = (state) => {
    const { schedule_enviro } = state

    return { schedule_enviro }
}


export default connect(mapStateProps)(RoasterList)






