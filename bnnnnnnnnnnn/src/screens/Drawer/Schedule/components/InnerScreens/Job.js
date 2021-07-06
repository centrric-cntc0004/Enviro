import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput } from 'react-native'
import { lightGrey, mainWhite, mainBlue, lightGreen, textBlue, mainGrey, darkkBlue } from '../../../../../common/Colors'
import TeamMembers from './TeamMembers'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { status_change, select_status } from '../common/action'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import DatePicker from 'react-native-datepicker'
let date2 = ""


const Job = ({ navigation, details1, dispatch, schedule_enviro }) => {
    const { selected_client, type, status } = schedule_enviro
    const [modal, setModal] = useState(false)
    const [date, setDate] = useState(selected_client.start_date)


    const call_statusapi = () => {



        let date = new Date();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        console.log(`${hours}:${minutes}:${seconds}`)
        let time = `${hours}:${minutes}:${seconds}`
        let t = ""
        const timeString = `${time}`;
        if (timeString.length === 2) {
            t = time
        } else {
            t = `0${time}`
        }

        var day = new Date().getDate()
        var month = new Date().getMonth() + 1
        var year = new Date().getFullYear()
        let date1 = day + '-' + month + '-' + year
        if (day.toString().length <= 1) {
            day = '0' + day;
            date2 = year + '-' + month + '-' + day;


        } else if (month.toString().length <= 1) {
            month = '0' + month;
            date2 = year + '-' + month + '-' + day;


        } else {
            date2 = year + '-' + month + '-' + day;



        }


        let form_body = new FormData()

        form_body.append('id', selected_client.id)
        form_body.append('start_date', selected_client.start_date)
        form_body.append('start_time', selected_client.start_time)
        form_body.append('end_time', selected_client.end_time)
        form_body.append('status', "doing")


        const success = (response) => {
            // setLoader(false)
            dispatch(select_status("doing"))


        }

        const failed = (response) => {

        }

        dispatch(status_change(form_body, selected_client.start_date, success, failed, type))


    }
    const call_statusapi1 = () => {
        let date = new Date();

        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        console.log(`${hours}:${minutes}:${seconds}`)
        let time = `${hours}:${minutes}:${seconds}`
        let t1 = ""
        const timeString = `${time}`;

        if (timeString.length === 8) {
            t1 = time
        } else {
            t1 = `0${time}`
        }

        let image_name = "image.png" || "image.jpg"
        let form_body = new FormData()

        form_body.append('id', selected_client.id)
        form_body.append('start_date', selected_client.start_date)
        form_body.append('start_time', selected_client.start_time)
        form_body.append('end_time', selected_client.end_time)
        form_body.append('status', "completed")


        const success = (response) => {
            // setLoader(false)
            dispatch(select_status("completed"))


        }

        const failed = (response) => {

        }

        dispatch(status_change(form_body, selected_client.start_date, success, failed, type))


    }


    return (
        <>

            <View style={{ flex: 1, backgroundColor: mainWhite, marginTop: '2%' }}>
                <Modal isVisible={modal}>
                    <View style={{ backgroundColor: '#edebeb', padding: 10, borderRadius: 10 }}>
                        <View style={{ backgroundColor: mainWhite, borderRadius: 10, padding: 5 }}>
                            <View style={{ paddingLeft: 10, paddingTop: 5 }}>
                                <View style={{ width: 150, borderRadius: 3, justifyContent: 'center', alignItems: 'center' }}>
                                    {/* <Text style={{ fontSize: 16, color: mainBlue, fontWeight: 'bold' }}>Scheduled Job</Text> */}
                                </View>
                            </View>


                            <View style={{ marginTop: 30, paddingHorizontal: 10 }}>
                                <View style={{ height: 35, }}>
                                    <View style={{ justifyContent: "center", alignItems: "center", flex: 1, paddingHorizontal: 15, flexDirection: 'row' }}>
                                        <Text style={{
                                            width: 100,

                                        }}>Start Date</Text>
                                        <DatePicker
                                            style={{
                                                width: 100,

                                            }}
                                            date={date}
                                            mode="date"
                                            placeholder="YYYY-MM-DD"
                                            format="YYYY-MM-DD"
                                            showIcon={false}
                                            minDate="2000-01-01"
                                            textColor="#FFFFFF"
                                            maxDate="2030-12-31"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{

                                                dateInput: {
                                                    borderWidth: 0,
                                                    fontSize: 12,
                                                    textColor: "red"

                                                },
                                                dateText: {
                                                    color: mainGrey,
                                                    fontSize: 14,

                                                }
                                            }}

                                            onDateChange={(date) => { setDate(date) }}

                                        />

                                    </View>




                                </View>
                                <View style={{ height: 35, }}>
                                    <View style={{ justifyContent: "center", alignItems: "center", flex: 1, paddingHorizontal: 15, flexDirection: 'row' }}>
                                        <Text style={{
                                            width: 100,

                                        }}>Start Time</Text>
                                        <DatePicker
                                            style={{
                                                width: 100,

                                            }}
                                            date={date}
                                            mode="date"
                                            placeholder="YYYY-MM-DD"
                                            format="YYYY-MM-DD"
                                            showIcon={false}
                                            minDate="2000-01-01"
                                            textColor="#FFFFFF"
                                            maxDate="2030-12-31"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{

                                                dateInput: {
                                                    borderWidth: 0,
                                                    fontSize: 12,
                                                    textColor: "red"

                                                },
                                                dateText: {
                                                    color: mainGrey,
                                                    fontSize: 14,

                                                }
                                            }}

                                            onDateChange={(date) => { setDate(date) }}

                                        />

                                    </View>




                                </View>
                                <View style={{ height: 35, }}>
                                    <View style={{ justifyContent: "center", alignItems: "center", flex: 1, paddingHorizontal: 15, flexDirection: 'row' }}>
                                        <Text style={{
                                            width: 100,

                                        }}>End Time</Text>
                                        <DatePicker
                                            style={{
                                                width: 100,

                                            }}
                                            date={date}
                                            mode="date"
                                            placeholder="YYYY-MM-DD"
                                            format="YYYY-MM-DD"
                                            showIcon={false}
                                            minDate="2000-01-01"
                                            textColor="#FFFFFF"
                                            maxDate="2030-12-31"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{

                                                dateInput: {
                                                    borderWidth: 0,
                                                    fontSize: 12,
                                                    textColor: "red"

                                                },
                                                dateText: {
                                                    color: mainGrey,
                                                    fontSize: 14,

                                                }
                                            }}

                                            onDateChange={(date) => { setDate(date) }}

                                        />

                                    </View>




                                </View>
                                <View style={{ height: 35, }}>
                                    <View style={{ justifyContent: "center", alignItems: "center", flex: 1, paddingHorizontal: 15, flexDirection: 'row' }}>
                                        <Text style={{
                                            width: 100,

                                        }}>Job Status</Text>
                                        <DatePicker
                                            style={{
                                                width: 100,

                                            }}
                                            date={date}
                                            mode="date"
                                            placeholder="YYYY-MM-DD"
                                            format="YYYY-MM-DD"
                                            showIcon={false}
                                            minDate="2000-01-01"
                                            textColor="#FFFFFF"
                                            maxDate="2030-12-31"
                                            confirmBtnText="Confirm"
                                            cancelBtnText="Cancel"
                                            customStyles={{

                                                dateInput: {
                                                    borderWidth: 0,
                                                    fontSize: 12,
                                                    textColor: "red"

                                                },
                                                dateText: {
                                                    color: mainGrey,
                                                    fontSize: 14,

                                                }
                                            }}

                                            onDateChange={(date) => { setDate(date) }}

                                        />

                                    </View>




                                </View>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 15 }}>
                            <TouchableOpacity onPress={() => onCancelButton()}>
                                <Text style={{ fontSize: 17, paddingRight: 15 }}>Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => onOkeyButton(add_card, update_cardList)}>
                                <Text style={{ fontSize: 17, paddingRight: 15 }}>Ok</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {status === "pending" ? (
                    <View style={{ flex: 1, backgroundColor: mainWhite, }}>
                        <View style={{ flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row', }}>
                            <TouchableOpacity onPress={() => call_statusapi()}
                                style={{ marginLeft: 20, justifyContent: 'center', alignItems: 'center', flex: 0.48, backgroundColor: lightGreen, height: 40, marginTop: 10, marginBottom: 10, borderRadius: 5 }}>
                                <Text style={{ fontSize: 14, color: mainWhite }}>Start Job</Text>
                            </TouchableOpacity>
                            <View style={{ flex: 0.05 }} />
                            <View style={{ marginRight: 20, justifyContent: 'center', alignItems: 'center', flex: 0.48, backgroundColor: textBlue, height: 40, marginTop: 10, marginBottom: 10, borderRadius: 5 }}>
                                <Text style={{ fontSize: 14, color: mainWhite }}>Message to admin</Text>

                            </View>
                        </View>
                        <View style={{ flex: 1 }} />

                        <View style={{ flex: 0.5, backgroundColor: mainWhite }}>
                            <TeamMembers navigation={navigation} details2={details1} />
                        </View>
                    </View>
                ) : status === "doing" ? (
                    <View style={{ flex: 1, backgroundColor: mainWhite, }}>
                        <View style={{ flex: 1, backgroundColor: mainWhite, flexDirection: 'column' }}>
                            <View style={{ flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row', }}>
                                <TouchableOpacity onPress={() => call_statusapi1()}
                                    style={{ marginLeft: 20, justifyContent: 'center', alignItems: 'center', flex: 0.48, backgroundColor: lightGreen, height: 40, marginTop: 10, marginBottom: 10, borderRadius: 5 }}>
                                    <Text style={{ fontSize: 14, color: mainWhite }}>Finished Job</Text>
                                </TouchableOpacity>
                                <View style={{ flex: 0.05 }} />
                                <View style={{ marginRight: 20, justifyContent: 'center', alignItems: 'center', flex: 0.48, backgroundColor: textBlue, height: 40, marginTop: 10, marginBottom: 10, borderRadius: 5 }}>
                                    <Text style={{ fontSize: 14, color: mainWhite }}>Message to admin</Text>

                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, marginTop: 15, marginBottom: 10 }}>
                                <View style={{ flex: 0.43, flexDirection: 'row', }}>
                                    <Text style={{ color: mainBlue }}>Started</Text>
                                </View>

                                <Text style={{ color: mainGrey }}>: {selected_client.start_time}</Text>
                            </View>

                        </View>
                        <View style={{ flex: 2 }} />

                        <View style={{ flex: 0.5, backgroundColor: mainWhite }}>
                            <TeamMembers navigation={navigation} details2={selected_client} />
                        </View>
                    </View>
                ) : (
                            <View style={{ flex: 1, backgroundColor: mainWhite, }}>
                                <View style={{ flex: 1, backgroundColor: mainWhite, flexDirection: 'column' }}>
                                    <View style={{ flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row', }}>
                                       
                                        <TouchableOpacity
                                            onPress={() => navigation.navigate("enviro-media")}
                                            style={{ marginLeft: 20, justifyContent: 'center', alignItems: 'center', flex: 0.48, backgroundColor: lightGreen, height: 40, marginTop: 10, marginBottom: 10, borderRadius: 5 }}>
                                           {selected_client.image!==null?(
                                            <Text style={{ fontSize: 14, color: mainWhite }}>Comment</Text>
                                           ):(
                                            <Text style={{ fontSize: 14, color: mainWhite }}>Take Signature</Text>

                                           )}
                                            </TouchableOpacity>
                                        <View style={{ flex: 0.05 }} />
                                        <TouchableOpacity onPress={() => navigation.navigate("enviro-addimage")}
                                            style={{ flexDirection: 'row', marginRight: 20, justifyContent: 'center', alignItems: 'center', flex: 0.48, backgroundColor: darkkBlue, height: 40, marginTop: 10, marginBottom: 10, borderRadius: 5 }}>
                                            <Icon name="camera" color={mainWhite} size={20}></Icon>
                                            <Text style={{ paddingLeft: 10, fontSize: 14, color: mainWhite }}>Add Media</Text>

                                        </TouchableOpacity>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, marginTop: 15, marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', width: 130 }}>
                                            <Text style={{ color: mainBlue }}>Started</Text>
                                        </View>

                                        <Text style={{ color: mainGrey }}>: {selected_client.start_time}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, marginTop: 5, marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', width: 130 }}>
                                            <Text style={{ color: mainBlue }}>Finished</Text>
                                        </View>

                                        <Text style={{ color: mainGrey }}>: {selected_client.end_time}</Text>
                                    </View>

                                </View>
                                <View style={{ flex: 2 }} />

                                <View style={{ flex: 0.5, backgroundColor: mainWhite }}>
                                    <TeamMembers navigation={navigation} details2={details1} />
                                </View>
                            </View>




                        )}
            </View>


        </>

    )
}

const mapStateProps = (state) => {
    const { schedule_enviro } = state

    return { schedule_enviro }
}



export default connect(mapStateProps)(Job)





