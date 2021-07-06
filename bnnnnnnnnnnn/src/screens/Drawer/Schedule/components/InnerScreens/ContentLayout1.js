import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator } from 'react-native'
import { lightGrey, mainWhite, darkGrey, mainGrey, mainBlue, textGrey, textBlack } from '../../../../../common/Colors'
import HomeList from './HomeList'
import RoasterList from './RoasterList'
import { connect } from 'react-redux'
import { schedule_list, complete_schedule_list, select_type } from '../common/action'
let date2 = ""
const ContentLayout1 = ({ navigation, schedule_enviro, dispatch }) => {
    const { isLoading } = schedule_enviro


    let dummyData = ['Waste', 'Pumps','Hills','Destruction','All']
    const [selected, setSelected] = useState(dummyData[0])
    var day = new Date().getDate()
    var month = new Date().getMonth() + 1
    var year = new Date().getFullYear()
    let date = day + '-' + month + '-' + year
    let newdate = date.split("-").reverse().join("-");
    if (day.toString().length <= 1) {
        day = '0' + day;
        date2 = year + '-' + month + '-' + day;

    }
    if (month.toString().length <= 1) {
        month = '0' + month;
        date2 = year + '-' + month + '-' + day;

    } else {
        date2 = year + '-' + month + '-' + day;


    }

    const call_nextapi = (data) => {
        setSelected(data)


        if (data === "Pumps") {
            dispatch(select_type("pumps"))
            dispatch(schedule_list(date2, "pumps"))
            dispatch(complete_schedule_list("pumps"))
        }
        else if (data === "Destruction") {
            dispatch(select_type("destruction"))

            dispatch(schedule_list(date2, "destruction"))
            dispatch(complete_schedule_list("destruction"))
        } else if (data === "Hills") {
            dispatch(select_type("hills"))

            dispatch(schedule_list(date2, "hills"))
            dispatch(complete_schedule_list("hills"))
        } else if (data === "Waste") {
            dispatch(select_type("waste"))

            dispatch(schedule_list(date2, "waste"))
            dispatch(complete_schedule_list("waste"))
        } else if(data === "All") {
            dispatch(select_type("all"))

            dispatch(schedule_list(date2, "all"))
            dispatch(complete_schedule_list("all"))
        } 


    }


    if (isLoading)
        return (
            <View style={{ marginTop: 200, justifyContent: 'center', alignItems: 'center', backgroundColor: lightGrey }}>
                <ActivityIndicator size="large" color={mainBlue} />
            </View>
        )

    return (

        <View style={{ flex: 1, backgroundColor: lightGrey }}>
            <View style={{ height: 13, backgroundColor: textGrey }}>

            </View>
            <View style={{ paddingHorizontal: 10, marginTop: '5%' }}>
                <View style={{ flexDirection: 'row', backgroundColor: mainWhite, borderRadius: 20, height: 40, borderWidth: 0.3, borderColor: darkGrey }}>
                    {
                        dummyData.map((item1, key) => {

                            if (item1 === selected) {

                                return (


                                    <View style={{backgroundColor:mainBlue, marginTop: 1, marginBottom: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', flex: 3.5, }}>
                                        <Text numberOfLines={1}
                                            style={{ fontSize: 13, color: mainWhite, }}>{item1}</Text>
                                    </View>

                                )
                            } else {
                                return (
                                    <TouchableOpacity onPress={() => call_nextapi(item1)} style={{backgroundColor:mainWhite, marginTop: 2, marginBottom: 4, borderRadius: 20, justifyContent: 'center', alignItems: 'center', flex: 3.5, }}>
                                        <Text numberOfLines={1}
                                            style={{ fontSize: 13, color: mainGrey, }}>{item1}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: '5%', paddingHorizontal: 20 }}>
                <View style={{
                    flex: 1, marginRight: 10, marginBottom: 10, alignItems: 'center', flexDirection: 'row', paddingLeft: 10, paddingRight: 5, height: 40,
                }}>

                    <View style={{ flex: 4, justifyContent: 'center', }}>
                        <Text style={{ color: mainGrey, fontSize: 16, fontWeight: "900" }}>Today's Schedule</Text>
                    </View>
                </View>

                <View style={{ flex: 0.1 }} />

                <TouchableOpacity onPress={() => navigation.navigate("enviro-calendar")}

                    style={{
                        flex: 0.4,
                        backgroundColor: 'orange',
                        marginLeft: 30,
                        marginTop: 5,
                        marginBottom: 10,
                        alignItems: 'center', justifyContent: 'center', alignItems: 'center',
                        flexDirection: 'row', borderRadius: 20, height: 30, borderWidth: 0.2, backgroundColor: mainWhite, borderColor: mainGrey
                    }}>

                    <Text style={{ color: textBlack, textAlign: 'center', fontSize: 12 }} >Calender</Text>
                </TouchableOpacity>



            </View>
            <View style={{ flex: 0.8, }}>
                <HomeList navigation={navigation} />
            </View>
            <View style={{ flex: 1 }}>
                <RoasterList navigation={navigation} />
            </View>
        </View>

    )
}


const mapStateProps = (state) => {
    const { schedule_enviro } = state

    return { schedule_enviro }
}



export default connect(mapStateProps)(ContentLayout1)




