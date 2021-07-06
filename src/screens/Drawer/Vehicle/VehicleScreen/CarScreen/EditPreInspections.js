
import React, { useState,useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity ,ActivityIndicator} from 'react-native'
import { mainWhite, darkGrey, mainGrey, lightGrey, mainBlue, mediumGrey, mainBlack, textBlack, textRed } from '../../../../../common/Colors'

 import ReviewScreen from './Innerscreen/ReviewScreen'
import CheckBox from './Innerscreen/CheckBox'
import CheckBoxReview from './Innerscreen/CheckBoxReview'
import DatePicker from 'react-native-datepicker'
 import VehicleSelection from './Innerscreen/VehicleSelection'
 import { connect } from 'react-redux'
 import CheckBoxEdit from './Innerscreen/CheckBoxEdit'



 import CheckBoxCategory from './Innerscreen/CheckBoxCategory'



 const EditPreInspections = ({ navigation, vehicledata, route, all_truck_list }) => {
 
     const RenderContacts = () => {
 
 
 
         let box_item = ['I am Fit for Work', 'I have the appropriate valid driving Licence', 'Appropriate PPE for operation of this Vehicle']
         let item = ['I have conducted the above pre-start checklist and satisfied that the vehicle is safe and ready to operate', 'I have reported all faults in the appropriate section and notified the authorized personnel.']
         let id = ""
         let registration = ""
         let date_time = ""
         let odometers = ""
         let odometdriver_signature = ""
         let hour_meter_start = ""
         let fit_for_work = ""
         let Valid_driving_license = ""
         let appropriate_ppe = ""
         let engine_oil_level = ""
         let warning_system = ""
         let steering = ""
         let safety_emerg_stop = ""
         let handbreak_alarm = ""
         let pto_vacpump = ""
         let horn = ""
         let rev_alarm_camera = ""
         let lights_head = ""
         let lights_tail = ""
         let light_beacons = ""
         let hazard_light = ""
         let rims_wheelnut = ""
         let coolant = ""
         let wheels = ""
         let mirror_windowscreen = ""
         let structure_bodywork = ""
         let wipers = ""
         let fuel_levelpump = ""
         let fuel_leveltruck = ""
         let seat_seatbelt = ""
         let parkbrake_trailer = ""
         let foot_brake = ""
         let electrical = ""
         let pin_retainers = ""
         let hoses = ""
         let fittings = ""
         let first_aid_kit = ""
         let ppe = ""
         let fire_extinguisher_date = ""
         let garden_hose = ""
         let gatic_lifters = ""
         let bucket_rags = ""
         let spill_kit = ""
         let action_taken = ""
         let authorized_by = ""
         let safe_ready_to_operate = ""
         let reported_faults = ""
         let reviewed_form = ""
         let corrected = ""
         let scheduled_for_repair = ""
         let no_action = ""
         let do_not_affect_safe_operation = ""
         let name = ""
         let signatures = ""
         let date_now = ""
         let vehicle = ""
         let driver_name = ""
         if (route.params.items) {
             id = route.params.items.id
             registration = route.params.items.registration
             date_time = route.params.items.date_time
             if (route.params.items.odometer === null) {
                 odometers = route.params.items.odometer
 
             } else {
                 odometers = route.params.items.odometer.toString()
 
             }
             odometdriver_signature = route.params.items.odometdriver_signature
             hour_meter_start = route.params.items.hour_meter_start
             fit_for_work = route.params.items.fit_for_work
             Valid_driving_license = route.params.items.Valid_driving_license
             appropriate_ppe = route.params.items.appropriate_ppe
             engine_oil_level = route.params.items.engine_oil_level
             warning_system = route.params.items.warning_system
             steering = route.params.items.steering
             safety_emerg_stop = route.params.items.safety_emerg_stop
             handbreak_alarm = route.params.items.handbreak_alarm
 
             pto_vacpump = route.params.items.pto_vacpump
             horn = route.params.items.horn
             rev_alarm_camera = route.params.items.rev_alarm_camera
             lights_head = route.params.items.lights_head
             lights_tail = route.params.items.lights_tail
             light_beacons = route.params.items.light_beacons
             hazard_light = route.params.items.hazard_light
             rims_wheelnut = route.params.items.rims_wheelnut
             coolant = route.params.items.coolant
             wheels = route.params.items.wheels
             mirror_windowscreen = route.params.items.mirror_windowscreen
             structure_bodywork = route.params.items.structure_bodywork
             wipers = route.params.items.wipers
             fuel_levelpump = route.params.items.fuel_levelpump
             fuel_leveltruck = route.params.items.fuel_leveltruck
             seat_seatbelt = route.params.items.seat_seatbelt
             parkbrake_trailer = route.params.items.parkbrake_trailer
             foot_brake = route.params.items.foot_brake
             electrical = route.params.items.electrical
             pin_retainers = route.params.items.pin_retainers
             hoses = route.params.items.hoses
             fittings = route.params.items.fittings
             first_aid_kit = route.params.items.first_aid_kit
             ppe = route.params.items.ppe
             fire_extinguisher_date = route.params.items.fire_extinguisher_date
             garden_hose = route.params.items.garden_hose
             gatic_lifters = route.params.items.gatic_lifters
             bucket_rags = route.params.items.bucket_rags
             spill_kit = route.params.items.spill_kit
             action_taken = route.params.items.safe_ready_to_operate
             authorized_by = route.params.items.authorized_by
             safe_ready_to_operate = route.params.items.safe_ready_to_operate
             reported_faults = route.params.items.reported_faults
             reviewed_form = route.params.items.reviewed_form
             corrected = route.params.items.corrected
             scheduled_for_repair = route.params.items.scheduled_for_repair
             no_action = route.params.items.no_action
             do_not_affect_safe_operation = route.params.items.do_not_affect_safe_operation
             name = route.params.items.name
             signatures = route.params.items.signature
             date_now = route.params.items.date_now
             vehicle = route.params.items.vehicle
             driver_name = route.params.items.driver_name
 
 
 
 
 
 
 
 
 
 
 
 
 
 
         }
         const [isCheck, setCheck] = useState(fit_for_work)
         const [isCheck1, setCheck1] = useState(Valid_driving_license)
         const [isCheck2, setCheck2] = useState(appropriate_ppe)
         const [isCheck3, setCheck3] = useState(engine_oil_level)
         const [isCheck4, setCheck4] = useState(warning_system)
         const [isCheck5, setCheck5] = useState(steering)
         const [isCheck6, setCheck6] = useState(safety_emerg_stop)
         const [isCheck7, setCheck7] = useState(handbreak_alarm)
         const [isCheck8, setCheck8] = useState(pto_vacpump)
         const [isCheck9, setCheck9] = useState(horn)
         const [isCheck10, setCheck10] = useState(rev_alarm_camera)
         const [isCheck11, setCheck11] = useState(lights_head)
         const [isCheck12, setCheck12] = useState(lights_tail)
         const [isCheck13, setCheck13] = useState(light_beacons)
         const [isCheck14, setCheck14] = useState(hazard_light)
         const [isCheck15, setCheck15] = useState(rims_wheelnut)
         const [isCheck16, setCheck16] = useState(coolant)
         const [isCheck17, setCheck17] = useState(wheels)
         const [isCheck18, setCheck18] = useState(mirror_windowscreen)
         const [isCheck19, setCheck19] = useState(structure_bodywork)
         const [isCheck20, setCheck20] = useState(wipers)
         const [isCheck21, setCheck21] = useState(hoses)
         const [isCheck22, setCheck22] = useState(fittings)
         const [isCheck23, setCheck23] = useState(first_aid_kit)
         const [isCheck24, setCheck24] = useState(ppe)
         const [isCheck25, setCheck25] = useState(fire_extinguisher_date)
         const [isCheck26, setCheck26] = useState(garden_hose)
         const [isCheck27, setCheck27] = useState(gatic_lifters)
         const [isCheck28, setCheck28] = useState(bucket_rags)
         const [isCheck29, setCheck29] = useState(spill_kit)
         const [isCheck30, setCheck30] = useState(action_taken)
         const [isCheck31, setCheck31] = useState(safe_ready_to_operate)
         const [isCheck40, setCheck40] = useState(fuel_levelpump)
         const [isCheck41, setCheck41] = useState(fuel_leveltruck)
         const [isCheck42, setCheck42] = useState(seat_seatbelt)
         const [isCheck43, setCheck43] = useState(parkbrake_trailer)
         const [isCheck44, setCheck44] = useState(foot_brake)
         const [isCheck45, setCheck45] = useState(electrical)
 
 
 
 
 
 
         const [initItem, setItem] = useState('')
         const [date, setDate] = useState(date_time)
         const [drivername, setDriverName] = useState(driver_name)
         const [odometer, setodometer] = useState(odometers)
         const [signature, setSignature] = useState(odometdriver_signature)
         const [hour, setHour] = useState(hour_meter_start)
         const [loader, setLoader] = useState(true)
 
 
 
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
 
         useEffect(() => {
             let loadingInterval = setInterval(() => {
                 setLoader(false)
                 clearInterval(loadingInterval)
             }, 1500)
             return () => {
                 clearInterval(loadingInterval)
             }
         }, [])
 
 
 
 
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
             let form_body = new FormData()
             form_body.append("vehicle", indexData)
             form_body.append("date_time", date)
 
             form_body.append("odometer", odometer)
             form_body.append("driver_name", driver_name)
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
             // form_body.append("reviewed_form", ReviewdForm)
             // form_body.append("corrected", Corrected)
             // form_body.append("scheduled_for_repair", ScheduledForRepair)
 
             // form_body.append("no_action", NoAction)
             // form_body.append("do_not_affect_safe_operation", DoNotAffectSafeOperation)
 
             const success = () => {
 
             }
 
             const failed = () => {
 
             }
 
             create_preinspection(form_body, success, failed)
         }
 
         if (loader) return (
             <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                 <ActivityIndicator size="large" color={mainBlue} />
             </View>
         )
         return (
             <ScrollView showsVerticalScrollIndicator={false}
                 style={{ flex: 1, }}>
                 <View style={{ paddingHorizontal: 20, flex: 1, backgroundColor: lightGrey, marginTop: '1%', paddingBottom: 60 }}>
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
                     <View style={{ flex: 2, backgroundColor: lightGrey, height: 200, marginTop: 20, }}>
 
                         <View style={{ flex: 1, flexDirection: 'row', }}>
                             <View style={styles.staticBoxStyle}>
                                 <Text style={styles.textStyle} >Date and Time</Text>
                             </View>
                             <View style={{ flex: 0.3 }} />
                             <View style={styles.editableBoxStyle}>
                                 <Text style={{ alignSelf: 'center' }}>:</Text>
                                 <Text numberOfLines={1}
                                     style={{ paddingLeft: 5, alignSelf: 'center', color: mainGrey, fontSize: 14 }}>{date}</Text>
                                 {/* <DatePicker
                                     style={{
                                         width: 87,
 
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
 
                                 /> */}
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
                                     <Text style={{ color: mainGrey, fontSize: 14 }}>{registration}</Text>
                                 </View>
 
                             </View>
                         </View>
                         <View style={{ flex: 1, flexDirection: 'row', }}>
                             <View style={styles.staticBoxStyle}>
                                 <Text style={styles.textStyle} >Odometer</Text>
                             </View>
                             <View style={{ flex: 0.3 }} />
                             <View style={styles.editableBoxStyle}>
                                 <Text style={{ alignSelf: 'center' }}>:</Text>
                                 <TextInput
                                     underlineColorAndroid="transparent"
                                     style={{ paddingLeft: 5, alignSelf: 'center', color: darkGrey, marginBottom: -6 }}
                                     autoCapitalize='none'
                                     value={odometer}
                                     editable={false}
                                     onChangeText={txt => setodometer(txt)}
                                 />
 
                             </View>
                         </View>
                         <View style={{ flex: 1, flexDirection: 'row', }}>
                             <View style={styles.staticBoxStyle}>
                                 <Text style={styles.textStyle} >Driver's Name</Text>
                             </View>
                             <View style={{ flex: 0.3 }} />
                             <View style={styles.editableBoxStyle}>
                                 <Text style={{ alignSelf: 'center' }}>:</Text>
                                 <TextInput
                                     underlineColorAndroid="transparent"
                                     style={{ paddingLeft: 5, alignSelf: 'center', color: darkGrey, marginBottom: -6 }}
                                     autoCapitalize='none'
                                     value={drivername.toString()}
                                     editable={false}
 
                                     onChangeText={txt => setDriverName(txt)}
                                 />
 
                             </View>
                         </View>
                         <View style={{ flex: 1, flexDirection: 'row', }}>
                             <View style={styles.staticBoxStyle}>
                                 <Text style={styles.textStyle} >Driver's Signature</Text>
                             </View>
                             <View style={{ flex: 0.3 }} />
                             <View style={styles.editableBoxStyle}>
                                 <Text style={{ alignSelf: 'center' }}>:</Text>
                                 <TextInput
                                     underlineColorAndroid="transparent"
                                     style={{ paddingLeft: 5, alignSelf: 'center', color: darkGrey, marginBottom: -6 }}
                                     autoCapitalize='none'
                                     value={signature}
                                     editable={false}
 
                                     onChangeText={txt => setSignature(txt)}
                                 />
 
                             </View>
                         </View>
                         <View style={{ flex: 1, flexDirection: 'row', }}>
                             <View style={styles.staticBoxStyle}>
                                 <Text style={styles.textStyle} >Hour Meter Start</Text>
                             </View>
                             <View style={{ flex: 0.3 }} />
                             <View style={styles.editableBoxStyle}>
                                 <Text style={{ alignSelf: 'center' }}>:</Text>
                                 <TextInput
                                     underlineColorAndroid="transparent"
                                     style={{ paddingLeft: 5, alignSelf: 'center', color: darkGrey, marginBottom: -6 }}
                                     autoCapitalize='none'
                                     value={hour}
                                     editable={false}
 
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
 
                                         {/* <CheckBox checked={isCheck} state={setCheck} /> */}
                                         <CheckBox checked={isCheck} />
 
 
                                     </View>
 
                                     <View style={{ flex: 11, }}>
                                         <Text style={{ fontSize: 14, color: mainGrey }}>I am Fit for Work</Text>
                                     </View>
 
 
                                 </View>
                             </View>
 
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, paddingHorizontal: 10 }}>
 
                             <View style={{ height: 25 }}>
                                 <View style={{ flex: 1, flexDirection: 'row' }}>
                                     <View style={{ flex: 1, justifyContent: 'center' }}>
 
                                         <CheckBox checked={isCheck1} />
 
                                     </View>
 
                                     <View style={{ flex: 11, }}>
                                         <Text style={{ fontSize: 14, color: mainGrey }}>I have the appropriate valid driving Licence</Text>
                                     </View>
 
 
                                 </View>
                             </View>
 
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, paddingHorizontal: 10 }}>
 
                             <View style={{ height: 25 }}>
                                 <View style={{ flex: 1, flexDirection: 'row' }}>
                                     <View style={{ flex: 1, justifyContent: 'center' }}>
 
                                         <CheckBox checked={isCheck2} />
 
                                     </View>
 
                                     <View style={{ flex: 11, }}>
                                         <Text style={{ fontSize: 14, color: mainGrey }}>Appropriate PPE for operation of this Vehicle</Text>
                                     </View>
 
 
                                 </View>
                             </View>
 
                         </View>
 
 
                     </View>
                     <View style={{ flex: 0.5, backgroundColor: lightGrey, height: 40, marginTop: 20 }}>
                         <Text style={{ fontSize: 12 }}>Pre-Start Checklist-All fields are Mandatory ( No Obvious Defect) ( X-Fault Identified) & N/A not applicable</Text>
 
                     </View>
                     <View style={{ flex: 0.1 }} />
 
                     <View style={{paddingHorizontal:5, borderWidth: 0.5, borderColor: mainGrey, flex: 2, marginTop: 10, backgroundColor: lightGrey, height: 70, backgroundColor: mediumGrey }}>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{ fontSize: 12 }}>Category "A" Fault: Vehicle {" "}
                            <Text style={{ color: 'red' }}>MUST NOT be operated {" "}
                                <Text style={{ color: mainBlack }}>until fault is rectified</Text>
                            </Text>
                        </Text>
                        </View>
                        <View style={{flexDirection:'row'}}>
                        <Text style={{ fontSize: 12 }}>Category "B" Fault: Vehicle {" "}
                            <Text style={{ color: mainBlue }}>May be operated {" "}
                                <Text style={{ color: mainBlack }}> Corrective action is required</Text>
                            </Text>
                        </Text>
                        </View>

                    </View>
 
                     <View style={{ flex: 1, backgroundColor: lightGrey, flexDirection: 'column', marginTop: 30 }}>
 
 
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Engine Oil steel</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck3} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Warning System</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck4} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Steering</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck5} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Safety / Emerg Stops</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck6} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Hand Brake Alarm</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck7} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>PTO / Vac.Pump</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck8} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Horn</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck9} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Rev alarm/Camera</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck10} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Lights-Head</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck11} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Lights-Tail</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck12} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Light-beacons</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck13} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Hazards Light</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck14} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Rims & Wheel Nuts</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck15} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Coolant</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck16} />
                             </View>
                         </View>
 
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Wheels & Tyres</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck17} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Mirrors & Windscreen</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck18} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Structure & Bodywork</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck19} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Wipers</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck20} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Fuel Level Pumb</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck40} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Fuel Level Truck</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck41} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Seat/Seat Belt</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck42} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Park Barke/Trailer</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck43} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Foot Brake</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck44} />
                             </View>
                         </View>
                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                 <Text style={{ color: textBlack }}>Electrical</Text>
                             </View>
                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                 <CheckBoxEdit checked={isCheck45} />
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
                                         <CheckBox checked={isCheck21} />
                                     </View>
                                 </View>
                                 <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                                     <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                         <Text style={{ color: textBlack }}>Fittings</Text>
                                     </View>
                                     <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                         <CheckBox checked={isCheck22} />
                                     </View>
                                 </View>
                                 <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                                     <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                         <Text style={{ color: textBlack }}>First Aid Kit</Text>
                                     </View>
                                     <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                         <CheckBox checked={isCheck23} />
                                     </View>
                                 </View>
                                 <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                                     <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                         <Text style={{ color: textBlack }}>PPE</Text>
                                     </View>
                                     <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                         <CheckBox checked={isCheck24} />
                                     </View>
                                 </View>
                                 <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                                     <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                         <Text style={{ color: textBlack }}>Fire Extinguisher (Date Calibrated)</Text>
                                     </View>
                                     <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                         <Text numberOfLines={1}>: {fire_extinguisher_date}</Text>
                                     </View>
                                 </View>
                                 <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                                     <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                         <Text style={{ color: textBlack }}>Garden Hose</Text>
                                     </View>
                                     <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                         <CheckBox checked={isCheck26} />
                                     </View>
                                 </View>
                                 <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                                     <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                         <Text style={{ color: textBlack }}>Gattic Lifters</Text>
                                     </View>
                                     <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                         <CheckBox checked={isCheck27} />
                                     </View>
                                 </View>
                                 <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                                     <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                         <Text style={{ color: textBlack }}>Bucket / Rags</Text>
                                     </View>
                                     <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                         <CheckBox checked={isCheck28} />
                                     </View>
                                 </View>
                                 <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
                                     <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
                                         <Text style={{ color: textBlack }}>Spill kit</Text>
                                     </View>
                                     <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
                                         <CheckBox checked={isCheck29} />
                                     </View>
                                 </View>
 
 
                             </View>
 
                         </View>
                     </View>
                     <View style={{ flex: 2, height: 80, backgroundColor: '#F8F189' }}>
                         <Text style={{ paddingLeft: 10 }} >Any Faults to Report (of any Category) & any additional information</Text>
                         {reported_faults !== null ? (
                             <Text style={{ paddingLeft: 10 }}>
                                 {reported_faults.toString()}</Text>
                         ) : (
                                 <Text>
                                 </Text>
                             )}
 
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
                                         <CheckBox checked={isCheck30} state={setCheck30} />
 
                                     </View>
 
                                     <View style={{ flex: 11, }}>
                                         <Text numberOfLines={3}
                                             style={{ fontSize: 14, color: textBlack }}>
                                             I have conducted the above pre-start checklist and satisfied that the vehicle is safe and ready to operate</Text>
                                     </View>
 
 
                                 </View>
                             </View>
                             <View style={{ height: 50, backgroundColor: lightGrey, marginTop: 35, }}>
 
                                 <View style={{ height: 25 }}>
                                     <View style={{ flex: 1, flexDirection: 'row' }}>
                                         <View style={{ flex: 1, justifyContent: 'center', }}>
                                             <CheckBox checked={isCheck31} state={setCheck31} />
 
                                         </View>
 
                                         <View style={{ flex: 11, }}>
                                             <Text style={{ fontSize: 14, color: textBlack }}>I have reported all faults in the appropriate section and notified the authorized personnel.</Text>
                                         </View>
 
                                     </View>
                                 </View>
                             </View>
 
                         </View>
 
 
 
                     </View>
                     <View
                         style={{ paddingTop: 60, paddingBottom: 30, flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                         {/* <View style={{ width: 150, height: 40, backgroundColor: mainWhite, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
                             <Text style={{ color: mainWhite, }}>Submit</Text>
                         </View> */}
                     </View>
                     <ReviewScreen data={route.params.items} />
 
                 </View>
             </ScrollView>
         )
     }
 
 
 
     return (
 
         <RenderContacts />
 
     )
 
 }
 
const mapStateProps = (state) => {
    const { truck_preinspection_list  ,all_truck_list} = state.vehicle__truck
    return {all_truck_list}
}
const mapDispatchToProps = (dispatch) => {
    return {
        // select_client_data: (employee) => dispatch(select_client(employee)),
        // search_employee: (search_keyword) => dispatch(search_client_list(search_keyword)),

      }
}
export default connect(mapStateProps,mapDispatchToProps) (EditPreInspections)

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
    },
    editableBoxStyle: {
        flex: 1.5,
        backgroundColor: lightGrey,
        height: 30,
        flexDirection: 'row'

    }



});






