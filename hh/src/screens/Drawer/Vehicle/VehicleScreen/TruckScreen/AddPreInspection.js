
import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native'
import { mainWhite, darkGrey, mainGrey, lightGrey, mainBlue, mediumGrey, mainBlack, textBlack, textRed } from '../../../../../common/Colors'
import Checkboxadd from './Innerscreen/Checkboxadd'
import CheckBoxReview from './Innerscreen/CheckBoxReview'
import DatePicker from 'react-native-datepicker'
 import VehicleSelection from './Innerscreen/VehicleSelection'
 import { connect } from 'react-redux'
 import Icon1 from 'react-native-vector-icons/FontAwesome5'
 import { __create_preinspection, fetch_all_truck_list ,} from './common/action'
import Toast from 'react-native-simple-toast';



const AddPreInspection = ({ navigation, vehicledata ,route,all_truck_list,dispatch}) => {
    const RenderContacts = () => {
        let box_item = ['I am Fit for Work', 'I have the appropriate valid driving Licence', 'Appropriate PPE for operation of this Vehicle']
        let item = ['I have conducted the above pre-start checklist and satisfied that the vehicle is safe and ready to operate', 'I have reported all faults in the appropriate section and notified the authorized personnel.']
        
        const [isCheck, setCheck] = useState(false)
        const [isCheck1, setCheck1] = useState(false)
        const [isCheck2, setCheck2] = useState(false)
        const [isCheck3, setCheck3] = useState(false)
        const [isCheck4, setCheck4] = useState(false)
        const [isCheck5, setCheck5] = useState(false)
        const [isCheck6, setCheck6] = useState(false)
        const [isCheck7, setCheck7] = useState(false)
        const [isCheck8, setCheck8] = useState(false)
        const [isCheck9, setCheck9] = useState(false)
        const [isCheck10, setCheck10] = useState(false)
        const [isCheck11, setCheck11] = useState(false)
        const [isCheck12, setCheck12] = useState(false)
        const [isCheck13, setCheck13] = useState(false)
        const [isCheck14, setCheck14] = useState(false)
        const [isCheck15, setCheck15] = useState(false)
        const [isCheck16, setCheck16] = useState(false)
        const [isCheck17, setCheck17] = useState(false)
        const [isCheck18, setCheck18] = useState(false)
        const [isCheck19, setCheck19] = useState(false)
        const [isCheck20, setCheck20] = useState(false)
        const [isCheck21, setCheck21] = useState(false)
        const [isCheck22, setCheck22] = useState(false)
        const [isCheck23, setCheck23] = useState(false)
        const [isCheck24, setCheck24] = useState(false)
        const [isCheck25, setCheck25] = useState("2020-09-05")
        const [isCheck26, setCheck26] = useState(false)
        const [isCheck27, setCheck27] = useState(false)
        const [isCheck28, setCheck28] = useState(false)
        const [isCheck29, setCheck29] = useState(false)
        const [isCheck30, setCheck30] = useState(false)
        const [isCheck31, setCheck31] = useState(false)
        const [isCheck40, setCheck40] = useState(false)
        const [isCheck41, setCheck41] = useState(false)
        const [isCheck42, setCheck42] = useState(false)
        const [isCheck43, setCheck43] = useState(false)
        const [isCheck44, setCheck44] = useState(false)
        const [isCheck45, setCheck45] = useState(false)
        const [loader, setLoader] = useState(false)




        const [isCheck34, setCheck34] = useState(false)
        const [isCheck35, setCheck35] = useState(false)
        const [isCheck36, setCheck36] = useState(false)
        const [isCheck37, setCheck37] = useState(false)
        const [isCheck38, setCheck38] = useState(false)
        const[msg,setmsg]=useState("")



        var date1 = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        let date2=year + '-' + month + '-' + date1
  

        const [initItem, setItem] = useState('')
        const [date, setDate] = useState(date2)
        const [drivername, setDriverName] = useState("")
        const [odometer, setodometer] = useState("")
        const [signature, setSignature] = useState("")
        const [hour, setHour] = useState("")


        let submit_btn = false;
        console.log(odometer + signature+ hour  
            + isCheck2 +isCheck3+isCheck30 +isCheck31)
        if(odometer && signature && hour  && isCheck2  && isCheck30 && isCheck31 ) {
            submit_btn = true
        }

        let dropdownData = []
        if (all_truck_list) {
            all_truck_list.map((item) => {
                const { registration } = item
                return (
                    dropdownData.push(registration)
                )
            })
        }
        const [selectedData, setSelectedData] = useState(dropdownData[0])
        const [indexData, setIndexData] = useState(all_truck_list[0].id)
        // const [indexData, setIndexData] = useState([])


        const onSelect = (index) => {
            indexposition = index
            console.log("index" + index)
            console.log("indexpositiom" + index)



            setIndexData(index)
            setSelectedData(dropdown[index])
            console.log("indexdata" + indexData)

        }

        const checkClicked = (item) => {
            setCheck(!isCheck)
            console.log(isCheck)
            setItem(item)
        }


        const selectData = (index) => {
            console.log('Selected index : ' + index)
            setIndexData(all_truck_list[index].id)
        }



        const submit_form = () => {
            
            console.log("kjjkjkjkjkj")
            setLoader(true)
            let form_body = new FormData()
            form_body.append("vehicle", indexData)
            // form_body.append("date_time", date)

            form_body.append("odometer", odometer)
            form_body.append("odometdriver_signature", signature)
            form_body.append("hour_meter_start", hour)
    
            form_body.append("fit_for_work", isCheck)
            form_body.append("Valid_driving_license", isCheck1)
            form_body.append("appropriate_ppe", isCheck2)
    
            form_body.append("engine_oil_level", isCheck3)
            form_body.append("warning_system", isCheck4)
            form_body.append("steering", isCheck5)
            form_body.append("safety_emerg_stop", isCheck6)
            form_body.append("handbreak_alarm", isCheck7)
            form_body.append("pto_vacpump", isCheck8)
    
            form_body.append("horn", isCheck9)
            form_body.append("rev_alarm_camera", isCheck10)
            form_body.append("lights_head", isCheck11)
            form_body.append("lights_tail", isCheck12)
            form_body.append("light_beacons", isCheck13)
            form_body.append("hazard_light", isCheck14)
    
            form_body.append("rims_wheelnut", isCheck15)
            form_body.append("coolant", isCheck16)
            form_body.append("wheels", isCheck17)
            form_body.append("mirror_windowscreen", isCheck18)
            form_body.append("structure_bodywork", isCheck19)
            form_body.append("wipers", isCheck20)
    
            form_body.append("fuel_levelpump", isCheck40)
            form_body.append("fuel_leveltruck", isCheck41)
            form_body.append("seat_seatbelt", isCheck42)
            form_body.append("parkbrake_trailer", isCheck43)
            form_body.append("foot_brake", isCheck44)
            form_body.append("electrical", isCheck45)
    
            form_body.append("hoses", isCheck21)
            form_body.append("fittings", isCheck22)
            form_body.append("first_aid_kit", isCheck23)
            form_body.append("ppe", isCheck24)
            form_body.append("fire_extinguisher_date", isCheck25)
    
            form_body.append("garden_hose", isCheck26)
            form_body.append("gatic_lifters", isCheck27)
            form_body.append("bucket_rags", isCheck28)
            form_body.append("spill_kit", isCheck29)
    
            form_body.append("reported_faults", isCheck30)
            form_body.append("reviewed_form", isCheck31)
            form_body.append("corrected", isCheck34)
            form_body.append("scheduled_for_repair", isCheck35)
    
             form_body.append("no_action", isCheck36)
           
            const success = () => {
                setLoader(false)
                
                Toast.showWithGravity('Added Successfully', Toast.SHORT, Toast.BOTTOM);
    
                navigation.pop()
    
            }
    
            const failed = (response) => {
                console.log("data"+JSON.stringify(response.data.app_data))

                setLoader(false)
                
                Alert.alert(  
                    'Failed!',  
                    response.data.app_data,  
                    [  
                        {  
                            text: 'Cancel',  
                            onPress: () => console.log('Cancel Pressed'),  
                            style: 'cancel',  
                        },  
                        {text: 'OK', onPress: () => console.log('OK Pressed')},  
                    ]  
                );  



            }
    
            dispatch(__create_preinspection(form_body, success, failed))
        
        }
        return (
            <ScrollView showsVerticalScrollIndicator={false}
                style={{ flex: 1, }}>
                <View style={{paddingHorizontal:20, flex: 1, backgroundColor: lightGrey, marginTop: '1%', paddingBottom: 60 }}>
                <View style={{ flex: 1.5, backgroundColor: lightGrey, }}>
                        <View style={{ marginTop: 30 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                {/* Top boxes  */}
                                <TouchableOpacity onPress={() => navigation.pop()}
                                    style={styles.topBox}>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: mainBlue, fontSize: 16 }} >Back</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{ flex: 4.5 }} />
                                
                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 2, backgroundColor: lightGrey, height: 200,marginTop:20, }}>
                        
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Date and Time</Text>

                            </View>

                            
                            <View style={{ flex: 0.3 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                {/* <Text style={{ paddingLeft: 5, alignSelf: 'center', color: darkGrey }}>30-09-2020</Text> */}
                                <DatePicker
                                    style={{
                                        width: 90,

                                    }}
                                    date={date}
                                    mode="date"
                                    placeholder="yyyy-mm-dd"
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
                                            textColor: "red",
                                            paddingBottom:10,
                                            paddingLeft:5

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
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Vehicle Registration</Text>
                            </View>
                            <View style={{ flex: 0.3 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <View style={{ marginLeft: 5, flex: 4, justifyContent: 'center', }}>
                                    <VehicleSelection
                                        dropdown_data={dropdownData}
                                        selectData={selectData}
                                    />

                                </View>

                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Odometer</Text>
                                <Icon1  style={{alignSelf:'center',marginTop:5,marginLeft:5}} size={8} color="red" name="star-of-life"></Icon1>

                            </View>
                            <View style={{ flex: 0.3 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ paddingLeft: 5, alignSelf: 'center', color: darkGrey, marginBottom: -6,width:150 }}
                                    autoCapitalize='none'
                                    value={odometer}
                                    keyboardType={"number-pad"}
                                    onChangeText={txt => setodometer(txt)}
                                />

                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Driver's Name</Text>
                                <Icon1  style={{alignSelf:'center',marginTop:5,marginLeft:5}} size={8} color="red" name="star-of-life"></Icon1>

                            </View>
                            <View style={{ flex: 0.3 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ paddingLeft: 5, alignSelf: 'center',width:150, color: darkGrey, marginBottom: -6 }}
                                    autoCapitalize='none'
                                    value={drivername}
                                    onChangeText={txt => setDriverName(txt)}
                                />

                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Driver's Signature</Text>
                                <Icon1  style={{alignSelf:'center',marginTop:5,marginLeft:5}} size={8} color="red" name="star-of-life"></Icon1>

                            </View>
                            <View style={{ flex: 0.3 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ paddingLeft: 5, alignSelf: 'center',width:150, color: darkGrey, marginBottom: -6 }}
                                    autoCapitalize='none'
                                    value={signature}
                                    onChangeText={txt => setSignature(txt)}
                                />

                            </View>
                        </View>
                        <View style={{ flex: 1, flexDirection: 'row', }}>
                            <View style={styles.staticBoxStyle}>
                                <Text style={styles.textStyle} >Hour Meter Start</Text>
                                <Icon1  style={{alignSelf:'center',marginTop:5,marginLeft:5}} size={8} color="red" name="star-of-life"></Icon1>

                            </View>
                            <View style={{ flex: 0.3 }} />
                            <View style={styles.editableBoxStyle}>
                                <Text style={{ alignSelf: 'center' }}>:</Text>
                                <TextInput
                                    underlineColorAndroid="transparent"
                                    style={{ paddingLeft: 5, alignSelf: 'center',width:150, color: darkGrey, marginBottom: -6 }}
                                    autoCapitalize='none'
                                    value={hour}
                                    onChangeText={txt => setHour(txt)}
                                />

                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 2, backgroundColor: lightGrey, marginTop: 20, flexDirection: 'column' }}>

                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, paddingHorizontal: 10 }}>

                            <View style={{ height: 25 }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>

                                        <Checkboxadd checked={isCheck} state={setCheck} />

                                    </View>

                                    <View style={{ flex: 11,flexDirection:'row' }}>
                                        <Text style={{ fontSize: 14, color: mainGrey }}>I am Fit for Work</Text>
                                        <Icon1  style={{alignSelf:'center',marginLeft:5,marginBottom:5}} size={8} color="red" name="star-of-life"></Icon1>

                                    </View>


                                </View>
                            </View>

                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, paddingHorizontal: 10 }}>

                            <View style={{ height: 25 }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>

                                        <Checkboxadd checked={isCheck1} state={setCheck1} />

                                    </View>

                                    <View style={{ flex: 11,flexDirection:'row' }}>
                                        <Text style={{ fontSize: 14, color: mainGrey }}>I have the appropriate valid driving Licence</Text>
                                        <Icon1  style={{alignSelf:'center',marginLeft:5,marginBottom:5}} size={8} color="red" name="star-of-life"></Icon1>

                                    </View>


                                </View>
                            </View>

                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, paddingHorizontal: 10 }}>

                            <View style={{ height: 25 }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, justifyContent: 'center' }}>

                                        <Checkboxadd checked={isCheck2} state={setCheck2} />

                                    </View>

                                    <View style={{ flex: 13,flexDirection:"row" }}>
                                        <Text style={{ fontSize: 14, color: mainGrey }}>Appropriate PPE for operation of this Vehicle</Text>
                                        <Icon1  style={{alignSelf:'center',marginLeft:5,marginBottom:5}} size={8} color="red" name="star-of-life"></Icon1>

                                    </View>


                                </View>
                            </View>

                        </View>


                    </View>
                    <View style={{ flex: 0.5, backgroundColor: lightGrey, height: 40, marginTop: 20 }}>
                        <Text style={{ fontSize: 12 }}>Pre-Start Checklist-All fields are Mandatory ( No Obvious Defect) ( X-Fault Identified) & N/A not applicable</Text>

                    </View>
                    <View style={{ flex: 0.1 }} />

                    <View style={{ borderWidth: 0.5, borderColor: mainGrey, flex: 2, marginTop: 10, backgroundColor: lightGrey, height: 50, backgroundColor: mediumGrey }}>
                        <Text style={{ fontSize: 12 }}>Cat“A“ Fault: {" "}
                            <Text style={{ color: 'red' }}>MUST NOT be operated {" "}
                                <Text style={{ color: mainBlack }}>until fault is rectified Cat “B” Fault: May be operated.Corrective action is required</Text>
                            </Text>
                        </Text>
                    </View>

                    <View style={{ flex: 1, backgroundColor: lightGrey, flexDirection: 'column', marginTop: 30 }}>


                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Engine Oil steel</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck3} state={setCheck3} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Warning System</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck4} state={setCheck4} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Steering</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck5} state={setCheck5} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Safety / Emerg Stops</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck6} state={setCheck6} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Hand Brake Alarm</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck7} state={setCheck7} 
                                />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>PTO / Vac.Pump</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck8} state={setCheck8} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Horn</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck9} state={setCheck9} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Rev alarm/Camera</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck10} state={setCheck10} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Lights-Head</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck11} state={setCheck11} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Lights-Tail</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck12} state={setCheck12} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Light-beacons</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck13} state={setCheck13} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Hazards Light</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck14} state={setCheck14} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Rims & Wheel Nuts</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck15} state={setCheck15} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Coolant</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck16} state={setCheck16} />
                            </View>
                        </View>

                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Wheels & Tyres</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck17} state={setCheck17} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Mirrors & Windscreen</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck18} state={setCheck18} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Structure & Bodywork</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck19} state={setCheck19} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Wipers</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck20} state={setCheck20} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Fuel Level Pumb</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck40} state={setCheck40} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Fuel Level Truck</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck41} state={setCheck41} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Seat/Seat Belt</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck42} state={setCheck42} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Park Barke/Trailer</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck43} state={setCheck43} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Foot Brake</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck44} state={setCheck44} />
                            </View>
                        </View>
                        <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                            <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                <Text style={{ color: textBlack }}>Electrical</Text>
                            </View>
                            <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                <Checkboxadd checked={isCheck45} state={setCheck45} />
                            </View>
                        </View>




                    </View>
                    <View style={{ flex: 2, backgroundColor: lightGrey, marginTop: 10 }}>
                        <Text style={{ color: mainGrey }}>Accessories & Fittings</Text>
                        <View style={{ flex: 2, backgroundColor: lightGrey, flexDirection: 'row' }}>

                            <View style={{ flex: 1, backgroundColor: lightGrey, flexDirection: 'column' }}>



                                <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                                    <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                        <Text style={{ color: textBlack }}>Hoses</Text>
                                    </View>
                                    <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                        <Checkboxadd checked={isCheck21} state={setCheck21} />
                                    </View>
                                </View>
                                <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                                    <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                        <Text style={{ color: textBlack }}>Fittings</Text>
                                    </View>
                                    <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                        <Checkboxadd checked={isCheck22} state={setCheck22} />
                                    </View>
                                </View>
                                <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                                    <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                        <Text style={{ color: textBlack }}>First Aid Kit</Text>
                                    </View>
                                    <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                        <Checkboxadd checked={isCheck23} state={setCheck23} />
                                    </View>
                                </View>
                                <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                                    <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                        <Text style={{ color: textBlack }}>PPE</Text>
                                    </View>
                                    <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                        <Checkboxadd checked={isCheck24} state={setCheck24} />
                                    </View>
                                </View>
                                {/* <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                                    <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                        <Text style={{ color: textBlack }}>Fire Extinguisher (Date Calibrated)</Text>
                                    </View>
                                    <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                        <Checkboxadd checked={isCheck25} state={setCheck25} />
                                    </View>
                                </View> */}
                                <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                                    <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                        <Text style={{ color: textBlack }}>Garden Hose</Text>
                                    </View>
                                    <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                        <Checkboxadd checked={isCheck26} state={setCheck26} />
                                    </View>
                                </View>
                                <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                                    <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                        <Text style={{ color: textBlack }}>Gattic Lifters</Text>
                                    </View>
                                    <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                        <Checkboxadd checked={isCheck27} state={setCheck27} />
                                    </View>
                                </View>
                                <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                                    <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                        <Text style={{ color: textBlack }}>Bucket / Rags</Text>
                                    </View>
                                    <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                        <Checkboxadd checked={isCheck28} state={setCheck28} />
                                    </View>
                                </View>
                                <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                                    <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                        <Text style={{ color: textBlack }}>Spill kit</Text>
                                    </View>
                                    <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                        <Checkboxadd checked={isCheck29} state={setCheck29} />
                                    </View>
                                </View>


                            </View>

                        </View>
                    </View>
                    <View style={{ flex: 2, height: 60, backgroundColor: '#F8F189' }}>
                        <Text style={{ paddingLeft: 10 }} >Any Faults to Report (of any Category) & any additional information</Text>

                    </View>
                    <View style={{ flex: 2, height: 70, flexDirection: 'row', marginTop: 20 }}>
                        <Text >Action Taken By</Text>
                        <View style={{ flex: 1 }} />
                        <Text >Authorized By</Text>


                    </View>
                    <View style={{ flex: 2, backgroundColor: lightGrey, marginTop: 20, flexDirection: 'column' }}>

                        <View style={{ height: 50, backgroundColor: lightGrey, marginTop: 15, }}>

                            <View style={{ height: 25 }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, justifyContent: 'center', }}>
                                        <Checkboxadd checked={isCheck30} state={setCheck30} />

                                    </View>

                                    <View style={{ flex: 11, flexDirection:'row',height:40}}>
                                        <Text style={{ fontSize: 14, color: textBlack }}>I have conducted the above pre-start checklist and satisfied that the vehicle is safe and ready to operate</Text>
                                        <Icon1  style={{alignSelf:'center',marginLeft:2,marginBottom:5}} size={8} color="red" name="star-of-life"></Icon1>

                                    </View>


                                </View>
                            </View>
                            <View style={{ height: 50, backgroundColor: lightGrey, marginTop: 15, }}>

                            <View style={{ height: 25 }}>
                                <View style={{ flex: 1, flexDirection: 'row' }}>
                                    <View style={{ flex: 1, justifyContent: 'center', }}>
                                        <Checkboxadd checked={isCheck31} state={setCheck31} />

                                    </View>

                                    <View style={{ flex: 11,flexDirection:'row',height:40 }}>
                                        <Text style={{ fontSize: 14, color: textBlack }}>I have reported all faults in the appropriate section and notified the authorized personnel.</Text>
                                        <Icon1  style={{alignSelf:'center',marginLeft:2,marginBottom:5}} size={8} color="red" name="star-of-life"></Icon1>

                                    </View>

</View>
                                </View>
                            </View>

                        </View>



                    </View>
                    {/* <TouchableOpacity onPress={()=>submit_form()}
                    style={{ paddingTop: 60, paddingBottom: 60, flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                        <View style={{ width: 150, height: 40, backgroundColor: mainBlue, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: mainWhite, }}>Submit</Text>
                        </View>
                    </TouchableOpacity> */}
                    <View style={{ flex: 1, backgroundColor: "#c3edf6", marginTop: '10%', paddingHorizontal: 10 }}>
                <View style={{ height: 40, backgroundColor: "#c3edf6" }}>
                    <Text style={{ fontSize: 14, color: textBlack, opacity: 1, paddingTop: 20 }}>Manager Brief and Review</Text>
                </View>
                <View style={{ flex: 0.3, paddingTop: 20, backgroundColor: "#c3edf6", flexDirection: 'row', height: 90 }}>
                    <CheckBoxReview checked={isCheck34} state={setCheck34} />
                    <Text style={{ paddingLeft: 10, fontSize: 14, color: textBlack, opacity: 1 }}>I have reviewed this form and satisfied that required maintenance or safety related items have been addressed.</Text>
                    <Icon1  style={{marginBottom:5,alignSelf:'center'}} size={8} color="red" name="star-of-life"></Icon1>

                </View>
                <View style={{ flex: 0.5, backgroundColor: "#c3edf6", flexDirection: 'column' }}>
                    <Text>I certify that faults reported have been</Text>
                    <View style={{ flex: 0.5, backgroundColor: "#c3edf6", flexDirection: 'row', height: 40, marginTop: 20 }}>
                        <CheckBoxReview checked={isCheck35} state={setCheck35} />
                        <Text style={{ paddingLeft: 20, fontSize: 14, color: textBlack, opacity: 1 }}>Corrected</Text>
                        <View style={{ flex: 1 }} />
                        <CheckBoxReview checked={isCheck36} state={setCheck36} />
                        <Text style={{ paddingLeft: 20, fontSize: 14, color: textBlack, opacity: 1 }}>No Action</Text>

                    </View>
                    <View style={{ flex: 0.5, backgroundColor: "#c3edf6", flexDirection: 'row', height: 40, }}>

                        <CheckBoxReview checked={isCheck37} state={setCheck37} />
                        <Text style={{ paddingLeft: 20, fontSize: 14, color: textBlack, opacity: 1 }}>Schedule for repair</Text>
                    </View>
                    <View style={{ flex: 0.5, backgroundColor: "#c3edf6", flexDirection: 'row', height: 50, }}>

                        <CheckBoxReview checked={isCheck38} state={setCheck38} />
                        <Text style={{ paddingLeft: 20, fontSize: 14, color: textBlack, opacity: 1 }}>Issues scheduled for maintenance or repair do not affect the safe operation of this vehicle</Text>
                    </View>
                </View>
                <View style={{ paddingTop: 10, flex: 0.5, backgroundColor: "#c3edf6", justifyContent: 'flex-start' }}>
                    <Text>Date</Text>
                </View>
                <View style={{ flex: 0.5, backgroundColor: "#c3edf6" }}>
                    <View style={{ flex: 2.5, marginTop: '7%', flexDirection: 'row', height: 80 }}>
                        <View style={{ flex: 0.3 }} />

                        <View style={{ flex: 0.2, }}>
                        </View>

                        <View style={{ flexDirection: 'column', flex: 1.5, }}>
                            <Text style={{ paddingTop: 10, color: textBlack, textAlign: 'justify' }}>Date</Text>
                            <Text style={{ paddingTop: 10, color: textBlack, textAlign: 'justify' }}>Designation</Text>
                        </View>

                    </View>

                </View>
                {
                        submit_btn ? (
                <TouchableOpacity onPress={()=>submit_form()}
                style={{ paddingTop: 20, paddingBottom: 60, flex: 0.5, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                  
                    <View style={{ width: 150, height: 40, backgroundColor: mainBlue, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                      {loader?(
                          <ActivityIndicator color={mainWhite} size="small"></ActivityIndicator>
                      ):(
                        <Text style={{ color: mainWhite, }}>Submit</Text>
                        )}
                    </View>
                </TouchableOpacity>
                        ):(
                            <View 
                            style={{opacity:0.6, paddingTop: 20, paddingBottom: 60, flex: 0.5, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                              
                                <View style={{ width: 150, height: 40, backgroundColor: mainBlue, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                                    <Text style={{ color: mainWhite, }}>Submit</Text>
                                </View>
                            </View>
                        )}
            </View>
                     {/* <ReviewScreen data={route.params.items} />  */}
                     <Text style={{ color: "red", }}>{msg}</Text>

                </View>
            </ScrollView>
        )
    }



    return (
       
                    <RenderContacts  />
               
    )

}
const mapStateProps = (state) => {
    const { truck_preinspection_list  ,all_truck_list} = state.vehicle__truck
    return {all_truck_list}
}

export default connect(mapStateProps) (AddPreInspection)

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
        paddingLeft: 10,
        color: darkGrey,
        fontSize: 14
    },
    staticBoxStyle: {
        flex: 1.5,
        backgroundColor: lightGrey,
        height: 30,
        marginRight: 10,
        flexDirection:"row"
    },
    editableBoxStyle: {
        flex: 1.5,
        backgroundColor: lightGrey,
        height: 30,
        flexDirection: 'row'

    }



});






