import React, { useState } from 'react'
import { View, Text, ScrollView, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native'
import { mainWhite, darkGrey, mainGrey, darkkBlue, mainBlue, textGrey } from '../../../../../common/Colors'
import CalendarPicker from 'react-native-calendar-picker';
import TodaysRoaster from './TodaysRoaster'
import { connect } from 'react-redux'
let date1 = ''
let datenext = ''
let date2 = ""
import { daywise_schedule_list, select_date, select_client, select_type } from '../common/action'
const ChooseRoaster = ({ navigation, dispatch, current_date, isLoading }) => {


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
    const [selectedDate, setSelectedDate] = useState(date2)
    const [datanew, setDate] = useState('')
    let data = [7, 8, 9]
    let width = Dimensions.get('window').width / 1.1
    width = width - (width / 20);
    let dummyData = ['Waste', 'Pumps','Hills', 'Destruction', 'All' ]
    const [selected, setSelected] = useState(dummyData[0])
    const [update, setUpdate] = useState(false)

    const onDateChange = (date) => {
        setUpdate(true)
        var d = new Date(date);
        let day = d.getDate()
        let month = (d.getMonth() + 1)
        let year = d.getFullYear()
        date1 = d.getDate() + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();

        datenext = d.getDate() + 1 + '-' + (d.getMonth() + 1) + '-' + d.getFullYear();
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
        dispatch(select_date(date2))
        setDate(date2)
        call_nextapi(date2)

    }

    const call_nextapi = (date23) => {
        const success = () => {




        }
        const failed = () => {
        }
        if (selected === "Pumps") {
            dispatch(select_type("pumps"))
            dispatch(daywise_schedule_list(date23, date23, "pumps"))

        }
        else if (selected === "Destruction") {
            dispatch(select_type("destruction"))
            dispatch(daywise_schedule_list(date23, date23, "destruction"))

        } else if (selected === "Hills") {
            dispatch(select_type("hills"))
            dispatch(daywise_schedule_list(date23, date23, "hills"))

        } else if (selected === "Waste") {
            dispatch(select_type("waste"))
            dispatch(daywise_schedule_list(date23, date23, "waste"))

        } else if (selected === "All") {
            dispatch(select_type("all"))
            dispatch(daywise_schedule_list(date23, date23, "all"))

        } else{

        }



    }
    const call_nextdata = (item) => {
        setSelected(item)
        if (selected === "Pumps") {

            dispatch(daywise_schedule_list(datanew, datanew, "pumps"))

        }
        else if (selected === "Destruction") {
            dispatch(daywise_schedule_list(datanew, datanew, "destruction"))

        } else if (selected === "Hills") {
            dispatch(daywise_schedule_list(datanew, datanew, "hills"))

        } else if (selected === "Waste") {
            dispatch(daywise_schedule_list(datanew, datanew, "waste"))

        } else if (selected === "All") {
            dispatch(daywise_schedule_list(datanew, datanew, "all"))

        }else {

        }

    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ height: 3, backgroundColor: textGrey }}>

            </View>
            <View style={{ flex: 1, backgroundColor: mainWhite, paddingHorizontal: 10, }}>

                <View style={{ marginTop: '5%' }}>
                    <View style={{ flexDirection: 'row', backgroundColor: mainWhite, borderRadius: 20, height: 40, borderWidth: 0.3, borderColor: darkGrey }}>
                        {
                            dummyData.map((item1, key) => {

                                if (item1 === selected) {

                                    return (


                                        <View style={{ marginTop: 1, marginBottom: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: mainBlue, flex: 4.5, }}>
                                            <Text numberOfLines={1}
                                                style={{ fontSize: 13, color: mainWhite, }}>{item1}</Text>
                                        </View>

                                    )
                                } else {
                                    return (
                                        <TouchableOpacity onPress={() => call_nextdata(item1)} style={{ marginTop: 2, marginBottom: 4, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite, flex: 4.5, }}>
                                            <Text numberOfLines={1}
                                                style={{ fontSize: 13, color: mainGrey, }}>{item1}</Text>
                                        </TouchableOpacity>
                                    )
                                }
                            })
                        }
                    </View>
                </View>
                <View style={{ flex: 1.3, backgroundColor: mainWhite, paddingHorizontal: 10 }}>

                    <View style={{ flex: 1, backgroundColor: '#F2F2F2', marginTop: '5%' }}>
                        {current_date === "" ? (
                            <CalendarPicker
                                width={width}
                                height={width}

                                backgroundColor="red"
                                dayShape={"square"}


                                selectedStartDate={selectedDate}
                                initialDate={selectedDate}
                                startFromMonday={true}
                                previousTitleStyle={{
                                    fontSize: 25,
                                    paddingLeft: 10

                                }}
                                nextTitleStyle={{
                                    fontSize: 25,
                                    paddingRight: 10

                                }}
                                todayBackgroundColor="red"
                                customDatesStyles={[
                                    { textStyle: { fontSize: 14, fontWeight: 'bold', } }

                                ]}
                                weekdays={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
                                textStyle={{
                                    fontSize: 14

                                }}
                                nextTitle=">"
                                previousTitle="<"

                                selectedDayColor={darkkBlue}
                                selectedDayTextColor={mainWhite}
                                onDateChange={onDateChange}
                            />
                        ) : (
                                <CalendarPicker
                                    width={width}
                                    height={width}

                                    backgroundColor="red"
                                    dayShape={"square"}


                                    selectedStartDate={current_date}
                                    initialDate={current_date}
                                    startFromMonday={true}
                                    previousTitleStyle={{
                                        fontSize: 25,
                                        paddingLeft: 10

                                    }}
                                    nextTitleStyle={{
                                        fontSize: 25,
                                        paddingRight: 10

                                    }}
                                    todayBackgroundColor="red"
                                    customDatesStyles={[
                                        { textStyle: { fontSize: 15, fontWeight: 'bold', } }

                                    ]}
                                    weekdays={['M', 'T', 'W', 'T', 'F', 'S', 'S']}
                                    textStyle={{
                                        fontSize: 14

                                    }}
                                    nextTitle=">"
                                    previousTitle="<"

                                    selectedDayColor={darkkBlue}
                                    selectedDayTextColor={mainWhite}
                                    onDateChange={onDateChange}
                                />
                            )}
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: mainWhite, }}>
                    {isLoading ? (
                        <View style={{ marginTop: '40%', backgroundColor: mainWhite, }}>
                            <ActivityIndicator size="large" color={mainBlue} />
                        </View>
                    ) : (
                            <View style={{ flex: 1, backgroundColor: mainWhite, paddingHorizontal:10,}}>

                                <TodaysRoaster navigation={navigation} date={date1} datenew={datenext} />
                            </View>

                        )
                    }
                </View>

            </View>
        </ScrollView>

    )
}


const mapStateProps = (state) => {
    const { current_date, isLoading } = state.schedule_enviro
    return { current_date, isLoading }

}

export default connect(mapStateProps)(ChooseRoaster)





