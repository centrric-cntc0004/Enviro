import React, { useState } from 'react'
import { View, Text, ToastAndroid, Alert, TouchableOpacity, } from 'react-native'
import { mainWhite, mainBlue, lightGreen, textBlue, mainGrey, } from '../../../../../common/Colors'
import TeamMembers from './TeamMembers'
import { connect } from 'react-redux'
import Modal from 'react-native-modal'
import DatePicker from 'react-native-datepicker'
let date2 = ""
let obj = {}



const Job = ({ navigation, details1, dispatch, job_performance_detail }) => {
    const [count, setCount] = useState(1)
    const [modal, setModal] = useState(false)
    const [date, setDate] = useState(job_performance_detail.data.schedule.start_date)



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
                {job_performance_detail.data.schedule ? (
                    <View>
                        {job_performance_detail.data.quote.status === "pending" ? (
                            <View style={{ flex: 1, backgroundColor: mainWhite, }}>
                                <View style={{ flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row', }}>
                                    <View
                                        // onPress={() => call_statusapi()}
                                        style={{ marginLeft: 20, justifyContent: 'center', alignItems: 'center', flex: 0.48, backgroundColor: lightGreen, height: 40, marginTop: 10, marginBottom: 10, borderRadius: 5 }}>
                                        <Text style={{ fontSize: 14, color: mainWhite }}>Pending</Text>
                                    </View>
                                    <View style={{ flex: 0.05 }} />
                                    {/* <View style={{ marginRight: 20, justifyContent: 'center', alignItems: 'center', flex: 0.48, backgroundColor: textBlue, height: 40, marginTop: 10, marginBottom: 10, borderRadius: 5 }}>
                                        <Text style={{ fontSize: 14, color: mainWhite }}>Message to admin</Text>

                                    </View> */}
                                </View>
                                <View style={{ flex: 1 }} />

                                <View style={{ flex: 0.5, backgroundColor: mainWhite }}>
                                    <TeamMembers navigation={navigation} details2={job_performance_detail.data} />
                                </View>
                            </View>
                        ) : job_performance_detail.data.quote.status === "doing" ? (
                            <View style={{ flex: 1, backgroundColor: mainWhite, }}>
                                <View style={{ flex: 1, backgroundColor: mainWhite, flexDirection: 'column' }}>
                                    <View style={{ flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row', }}>
                                        <View
                                            // onPress={() => call_statusapi1()}
                                            style={{ marginLeft: 20, justifyContent: 'center', alignItems: 'center', flex: 0.48, backgroundColor: lightGreen, height: 40, marginTop: 10, marginBottom: 10, borderRadius: 5 }}>
                                            <Text style={{ fontSize: 14, color: mainWhite }}>{job_performance_detail.data.quote.status}</Text>
                                        </View>
                                        <View style={{ flex: 0.05 }} />
                                        {/* <View style={{ marginRight: 20, justifyContent: 'center', alignItems: 'center', flex: 0.48, backgroundColor: textBlue, height: 40, marginTop: 10, marginBottom: 10, borderRadius: 5 }}>
                                            <Text style={{ fontSize: 14, color: mainWhite }}>Message to admin</Text>

                                        </View> */}
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, marginTop: 15, marginBottom: 10 }}>
                                        <View style={{ flex: 0.43, flexDirection: 'row', }}>
                                            <Text style={{ color: mainBlue }}>Started</Text>
                                        </View>

                                        <Text style={{ color: mainGrey }}>: {job_performance_detail.data.schedule.start_time}</Text>
                                    </View>

                                </View>
                                <View style={{ flex: 2 }} />

                                <View style={{ flex: 0.5, backgroundColor: mainWhite }}>
                                    <TeamMembers navigation={navigation} details2={job_performance_detail.data} />
                                </View>
                            </View>
                        ) : job_performance_detail.data.quote.status === "completed" ? (
                            <View style={{ flex: 1, backgroundColor: mainWhite, }}>
                                <View style={{ flex: 1, backgroundColor: mainWhite, flexDirection: 'column' }}>
                                    <View style={{ flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row', }}>
                                        <View
                                            // onPress={() => navigation.navigate("enviro-media")}
                                            style={{ marginLeft: 20, justifyContent: 'center', alignItems: 'center', flex: 0.48, backgroundColor: lightGreen, height: 40, marginTop: 10, marginBottom: 10, borderRadius: 5 }}>
                                            <Text style={{ fontSize: 14, color: mainWhite }}>Completed</Text>
                                        </View>
                                        <View style={{ flex: 0.05 }} />

                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, marginTop: 15, marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', width: 130 }}>
                                            <Text style={{ color: mainBlue }}>Started</Text>
                                        </View>

                                        <Text style={{ color: mainGrey }}>: {job_performance_detail.data.schedule.start_time}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, marginTop: 5, marginBottom: 10 }}>
                                        <View style={{ flexDirection: 'row', width: 130 }}>
                                            <Text style={{ color: mainBlue }}>End Time</Text>
                                        </View>

                                        <Text style={{ color: mainGrey }}>: {job_performance_detail.data.schedule.end_time}</Text>
                                    </View>

                                </View>
                                <View style={{ flex: 2 }} />

                                <View style={{ flex: 0.5, backgroundColor: mainWhite }}>
                                    <TeamMembers navigation={navigation} details2={job_performance_detail.data} />
                                </View>
                            </View>




                        ) : (
                                        <View style={{ flex: 1, backgroundColor: mainWhite, }}>
                                            <View style={{ flex: 1, backgroundColor: mainWhite, flexDirection: 'column' }}>
                                                <View style={{ flex: 0.5, backgroundColor: mainWhite, flexDirection: 'row', }}>
                                                    <View
                                                        // onPress={() => navigation.navigate("enviro-media")}
                                                        style={{ marginLeft: 20, justifyContent: 'center', alignItems: 'center', flex: 0.48, backgroundColor: lightGreen, height: 40, marginTop: 10, marginBottom: 10, borderRadius: 5 }}>
                                                        <Text style={{ fontSize: 14, color: mainWhite }}>{job_performance_detail.data.quote.status}</Text>
                                                    </View>
                                                    <View style={{ flex: 0.05 }} />

                                                </View>
                                                {Object.keys(job_performance_detail.data.schedule).length !== 0 ? (
                                                    <View>
                                                        {job_performance_detail.data.schedule.start_time !== "" ? (
                                                            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, marginTop: 15, marginBottom: 10 }}>

                                                                <View style={{ flexDirection: 'row', width: 130 }}>
                                                                    <Text style={{ color: mainBlue }}>Started</Text>
                                                                </View>

                                                                <Text style={{ color: mainGrey }}>: {job_performance_detail.data.schedule.start_time}</Text>
                                                            </View>
                                                        ) : (
                                                                null
                                                            )}
                                                    </View>
                                                ) : (
                                                        null
                                                    )}
                                                {Object.keys(job_performance_detail.data.schedule).length !== 0 ? (
                                                    <View>
                                                        {job_performance_detail.data.schedule.end_time !== "" ? (
                                                            <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 20, marginTop: 5, marginBottom: 10 }}>
                                                                <View style={{ flexDirection: 'row', width: 130 }}>
                                                                    <Text style={{ color: mainBlue }}>End Time</Text>
                                                                </View>

                                                                <Text style={{ color: mainGrey }}>: {job_performance_detail.data.schedule.end_time}</Text>
                                                            </View>
                                                        ) : (
                                                                null
                                                            )}
                                                    </View>
                                                ) : (
                                                        null
                                                    )}

                                            </View>

                                            <View style={{ flex: 2 }} />

                                            <View style={{ flex: 0.5, backgroundColor: mainWhite }}>
                                                <TeamMembers navigation={navigation} details2={job_performance_detail.data} />
                                            </View>
                                        </View>
                                    )}
                    </View>
                ) : (
                        null
                    )}
            </View>


        </>

    )
}

const mapStateProps = (state) => {
    const { selected_client, job_performance_detail } = state.sales_enviroWaste
    return { selected_client, job_performance_detail }

}



export default connect(mapStateProps)(Job)





