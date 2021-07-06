import React from 'react'
import { View, Text, TouchableOpacity, Image, } from 'react-native'
import { darkGrey, mainGrey, textDark, mainWhite, } from '../../../../../common/Colors'
import { ClientImage } from '../../../../../common/Images'
import { connect } from 'react-redux'
import { select_data, select_comment, select_status } from '../common/action'


const TodaysRoaster = ({ navigation, date, datenew, schedule_enviro, dispatch }) => {

    const { daywise_schedule_list, schedule_list } = schedule_enviro


    const RenderContacts = () => {
        let roaster_list = [1, 6, 9]
        var day = new Date().getDate()
        var daynew = new Date().getDate() + 1

        var month = new Date().getMonth() + 1
        var year = new Date().getFullYear()
        let date1 = day + '-' + month + '-' + year
        let datenew1 = daynew + '-' + month + '-' + year





        const call_api = (item) => {
            dispatch(select_status(item.status))
            dispatch(select_data(item))
            if (item.comments === null) {

            } else {
                dispatch(select_comment(item.comments))
            }

            navigation.navigate("enviro-detail")
        }

        const renderData = () => {
            return (

                <View style={{ marginTop: 10, flexDirection: 'column' }}>

                    {
                        daywise_schedule_list.map((item1, key) => {
                            return (
                                <TouchableOpacity
                                    onPress={() => call_api(item1)}
                                >
                                    <View style={{
                                        flexDirection: 'row', height: 90, backgroundColor: mainWhite,
                                        marginTop: 10, borderWidth: 0.5, borderColor: darkGrey, borderRadius: 10,
                                    }}>

                                        <View style={{ flex: 1, backgroundColor: mainWhite, marginTop: 10, marginLeft: 5 }}>
                                            <View style={{ flex: 1, marginBottom: 10 }}>
                                                <Image style={{ marginLeft: 2, height: 60, width: 60, borderRadius: 32.5 }} source={ClientImage} />
                                            </View>
                                        </View>
                                        <View style={{ borderRadius: 30, marginTop: 3, marginBottom: 2, flex: 4, flexDirection: 'column', backgroundColor: mainWhite }}>
                                            <View style={{ flex: 1.3, flexDirection: 'row' }}>
                                                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: mainWhite }}>
                                                    <View style={{ flexDirection: 'column', marginTop: 20 }}>
                                                        <Text numberOfLines={1}
                                                            style={{ paddingLeft: 10, color: mainGrey, fontSize: 14 }}>{item1.created_by}</Text>
                                                        <Text style={{ paddingLeft: 10, paddingTop: 5, color: mainGrey, textAlign: 'justify', fontSize: 12 }}>{item1.start_time}-{item1.end_time}</Text>
                                                    </View>
                                                </View>
                                                <View style={{ flex: 1, flexDirection: 'column', backgroundColor: mainWhite, borderRadius: 30, }}>

                                                    <View style={{ flexDirection: 'column', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                                                        <Text style={{ color: textDark, textAlign: 'justify', fontSize: 12 }}>Job {item1.job}</Text>
                                                        <View style={{ marginTop: 5, justifyContent: 'center', alignItems: 'center', width: 85, height: 25, borderWidth: 0.2, borderColor: mainGrey, borderRadius: 20 }}>
                                                            <Text style={{ color: textDark, textAlign: 'justify', fontSize: 12 }}>{item1.status}</Text>

                                                        </View>
                                                    </View>
                                                </View>
                                            </View>

                                        </View>
                                    </View>
                                </TouchableOpacity>
                            )
                        })}



                </View>

            )
        }




        return (
            <View style={{ flex: 1, backgroundColor: mainWhite, }}>
                <Text style={{ color: textDark, paddingTop: 20, fontSize: 16 }}>Schedule List</Text>
                {daywise_schedule_list.length === 0 ? (
                    <View style={{ marginTop: 100, justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite, }}>
                        <Text style={{ fontSize: 16, color: mainGrey }}>No data Found</Text>
                    </View>
                ) : (
                        <View>
                            {renderData()}
                        </View>

                    )}

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



export default connect(mapStateProps)(TodaysRoaster)





