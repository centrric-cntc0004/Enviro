
// import React, { useState } from 'react'
// import { StyleSheet, View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native'
// import { mainWhite, darkGrey, mainGrey, lightGrey, mainBlue, mediumGrey, mainBlack, textBlack, textRed } from '../../Colors'
// import { StoreConsumer } from '../../../Store/Store'
// import ModalDropdown from 'react-native-modal-dropdown';
// import Icon from 'react-native-vector-icons/dist/FontAwesome5'
// import ReviewScreen from './ReviewScreen'
// let indexposition = 0
// import CheckBox from './CheckBox'
// import Icon1 from 'react-native-vector-icons/Ionicons'
// import DatePicker from 'react-native-datepicker'
// import VehicleSelection from './VehicleSelection'



// const PreInspectionCheck = ({ navigation, vehicledata }) => {

//     const RenderContacts = ({ values }) => {
//         let box_item = ['I am Fit for Work', 'I have the appropriate valid driving Licence', 'Appropriate PPE for operation of this Vehicle']
//         let item = ['I have conducted the above pre-start checklist and satisfied that the vehicle is safe and ready to operate', 'I have reported all faults in the appropriate section and notified the authorized personnel.']

//         const [isCheck, setCheck] = useState(false)
//         const [isCheck1, setCheck1] = useState(false)
//         const [isCheck2, setCheck2] = useState(false)
//         const [isCheck3, setCheck3] = useState(false)
//         const [isCheck4, setCheck4] = useState(false)
//         const [isCheck5, setCheck5] = useState(false)
//         const [isCheck6, setCheck6] = useState(false)
//         const [isCheck7, setCheck7] = useState(false)
//         const [isCheck8, setCheck8] = useState(false)

//         const [isCheck9, setCheck9] = useState(false)
//         const [isCheck10, setCheck10] = useState(false)
//         const [isCheck11, setCheck11] = useState(false)
//         const [isCheck12, setCheck12] = useState(false)
//         const [isCheck13, setCheck13] = useState(false)
//         const [isCheck14, setCheck14] = useState(false)
//         const [isCheck15, setCheck15] = useState(false)
//         const [isCheck16, setCheck16] = useState(false)
//         const [isCheck17, setCheck17] = useState(false)
//         const [isCheck18, setCheck18] = useState(false)
//         const [isCheck19, setCheck19] = useState(false)
//         const [isCheck20, setCheck20] = useState(false)
//         const [isCheck21, setCheck21] = useState(false)
//         const [isCheck22, setCheck22] = useState(false)
//         const [isCheck23, setCheck23] = useState(false)
//         const [isCheck24, setCheck24] = useState(false)
//         const [isCheck25, setCheck25] = useState(false)
//         const [isCheck26, setCheck26] = useState(false)
//         const [isCheck27, setCheck27] = useState(false)
//         const [isCheck28, setCheck28] = useState(false)
//         const [isCheck29, setCheck29] = useState(false)
//         const [isCheck30, setCheck30] = useState(false)
//         const [isCheck31, setCheck31] = useState(false)
//         const [isCheck32, setCheck32] = useState(false)





//         const [initItem, setItem] = useState('')
//         const [date, setDate] = useState('')
//         const [drivername, setDriverName] = useState('')
//         const [odometer, setodometer] = useState('')
//         const [signature, setSignature] = useState('')
//         const [hour, setHour] = useState('')




//         let dropdownData = []
//         if (vehicledata) {
//             vehicledata.map((item) => {
//                 const { registration } = item
//                 return (
//                     dropdownData.push(registration)
//                 )
//             })
//         }
//         const [selectedData, setSelectedData] = useState(dropdownData[0])
//         const [indexData, setIndexData] = useState(vehicledata[0].id)

//         const onSelect = (index) => {
//             indexposition = index
//             console.log("index" + index)
//             console.log("indexpositiom" + index)



//             setIndexData(index)
//             setSelectedData(dropdown[index])
//             console.log("indexdata" + indexData)

//         }

//         const checkClicked = (item) => {
//             setCheck(!isCheck)
//             console.log(isCheck)
//             setItem(item)
//         }


//         const selectData = (index) => {
//             console.log('Selected index : ' + index)
//             setIndexData(vehicledata[index].id)
//         }




//         return (
//             <ScrollView showsVerticalScrollIndicator={false}
//                 style={{ flex: 1, }}>
//                 <View style={{ flex: 1, backgroundColor: lightGrey, marginTop: '1%', paddingBottom: 60 }}>
//                     <View style={{ flex: 2, backgroundColor: lightGrey, height: 200 }}>
//                         <TouchableOpacity >
//                             <Text>List</Text>
//                         </TouchableOpacity>
//                         <View style={{ flex: 1, flexDirection: 'row', }}>
//                             <View style={styles.staticBoxStyle}>
//                                 <Text style={styles.textStyle} >Date and Time</Text>
//                             </View>
//                             <View style={{ flex: 0.3 }} />
//                             <View style={styles.editableBoxStyle}>
//                                 <Text style={{ alignSelf: 'center' }}>:</Text>
//                                 {/* <Text style={{ paddingLeft: 5, alignSelf: 'center', color: darkGrey }}>30-09-2020</Text> */}
//                                 <DatePicker
//                                     style={{
//                                         width: 87,

//                                     }}
//                                     date={date}
//                                     mode="date"
//                                     placeholder="YYYY-MM-DD"
//                                     format="YYYY-MM-DD"
//                                     showIcon={false}
//                                     minDate="2000-01-01"
//                                     textColor="#FFFFFF"
//                                     maxDate="2030-12-31"
//                                     confirmBtnText="Confirm"
//                                     cancelBtnText="Cancel"
//                                     customStyles={{

//                                         dateInput: {
//                                             borderWidth: 0,
//                                             fontSize: 12,
//                                             textColor: "red"

//                                         },
//                                         dateText: {
//                                             color: mainGrey,
//                                             fontSize: 14,

//                                         }
//                                     }}

//                                     onDateChange={(date) => { setDate(date) }}

//                                 />
//                             </View>
//                         </View>
//                         <View style={{ flex: 1, flexDirection: 'row', }}>
//                             <View style={styles.staticBoxStyle}>
//                                 <Text style={styles.textStyle} >Vehicle Registration</Text>
//                             </View>
//                             <View style={{ flex: 0.3 }} />
//                             <View style={styles.editableBoxStyle}>
//                                 <Text style={{ alignSelf: 'center' }}>:</Text>
//                                 <View style={{ marginLeft: 5, flex: 4, justifyContent: 'center', }}>
//                                     <VehicleSelection
//                                         dropdown_data={dropdownData}
//                                         selectData={selectData}
//                                     />

//                                 </View>

//                             </View>
//                         </View>
//                         <View style={{ flex: 1, flexDirection: 'row', }}>
//                             <View style={styles.staticBoxStyle}>
//                                 <Text style={styles.textStyle} >Odometer</Text>
//                             </View>
//                             <View style={{ flex: 0.3 }} />
//                             <View style={styles.editableBoxStyle}>
//                                 <Text style={{ alignSelf: 'center' }}>:</Text>
//                                 <TextInput
//                                     underlineColorAndroid="transparent"
//                                     style={{ paddingLeft: 5, alignSelf: 'center', color: darkGrey, marginBottom: -6 }}
//                                     autoCapitalize='none'
//                                     value={odometer}
//                                     onChangeText={txt => setodometer(txt)}
//                                 />

//                             </View>
//                         </View>
//                         <View style={{ flex: 1, flexDirection: 'row', }}>
//                             <View style={styles.staticBoxStyle}>
//                                 <Text style={styles.textStyle} >Driver's Name</Text>
//                             </View>
//                             <View style={{ flex: 0.3 }} />
//                             <View style={styles.editableBoxStyle}>
//                                 <Text style={{ alignSelf: 'center' }}>:</Text>
//                                 <TextInput
//                                     underlineColorAndroid="transparent"
//                                     style={{ paddingLeft: 5, alignSelf: 'center', color: darkGrey, marginBottom: -6 }}
//                                     autoCapitalize='none'
//                                     value={drivername}
//                                     onChangeText={txt => setDriverName(txt)}
//                                 />

//                             </View>
//                         </View>
//                         <View style={{ flex: 1, flexDirection: 'row', }}>
//                             <View style={styles.staticBoxStyle}>
//                                 <Text style={styles.textStyle} >Driver's Signature</Text>
//                             </View>
//                             <View style={{ flex: 0.3 }} />
//                             <View style={styles.editableBoxStyle}>
//                                 <Text style={{ alignSelf: 'center' }}>:</Text>
//                                 <TextInput
//                                     underlineColorAndroid="transparent"
//                                     style={{ paddingLeft: 5, alignSelf: 'center', color: darkGrey, marginBottom: -6 }}
//                                     autoCapitalize='none'
//                                     value={signature}
//                                     onChangeText={txt => setSignature(txt)}
//                                 />

//                             </View>
//                         </View>
//                         <View style={{ flex: 1, flexDirection: 'row', }}>
//                             <View style={styles.staticBoxStyle}>
//                                 <Text style={styles.textStyle} >Hour Meter Start</Text>
//                             </View>
//                             <View style={{ flex: 0.3 }} />
//                             <View style={styles.editableBoxStyle}>
//                                 <Text style={{ alignSelf: 'center' }}>:</Text>
//                                 <TextInput
//                                     underlineColorAndroid="transparent"
//                                     style={{ paddingLeft: 5, alignSelf: 'center', color: darkGrey, marginBottom: -6 }}
//                                     autoCapitalize='none'
//                                     value={hour}
//                                     onChangeText={txt => setHour(txt)}
//                                 />

//                             </View>
//                         </View>
//                     </View>
//                     <View style={{ flex: 2, backgroundColor: lightGrey, marginTop: 20, flexDirection: 'column' }}>

//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, paddingHorizontal: 10 }}>

//                             <View style={{ height: 25 }}>
//                                 <View style={{ flex: 1, flexDirection: 'row' }}>
//                                     <View style={{ flex: 1, justifyContent: 'center' }}>

//                                         <CheckBox checked={isCheck} state={setCheck} />

//                                     </View>

//                                     <View style={{ flex: 11, }}>
//                                         <Text style={{ fontSize: 14, color: mainGrey }}>I am Fit for Work</Text>
//                                     </View>


//                                 </View>
//                             </View>

//                         </View>
//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, paddingHorizontal: 10 }}>

//                             <View style={{ height: 25 }}>
//                                 <View style={{ flex: 1, flexDirection: 'row' }}>
//                                     <View style={{ flex: 1, justifyContent: 'center' }}>

//                                         <CheckBox checked={isCheck1} state={setCheck1} />

//                                     </View>

//                                     <View style={{ flex: 11, }}>
//                                         <Text style={{ fontSize: 14, color: mainGrey }}>I have the appropriate valid driving Licence</Text>
//                                     </View>


//                                 </View>
//                             </View>

//                         </View>
//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, paddingHorizontal: 10 }}>

//                             <View style={{ height: 25 }}>
//                                 <View style={{ flex: 1, flexDirection: 'row' }}>
//                                     <View style={{ flex: 1, justifyContent: 'center' }}>

//                                         <CheckBox checked={isCheck2} state={setCheck2} />

//                                     </View>

//                                     <View style={{ flex: 11, }}>
//                                         <Text style={{ fontSize: 14, color: mainGrey }}>Appropriate PPE for operation of this Vehicle</Text>
//                                     </View>


//                                 </View>
//                             </View>

//                         </View>


//                     </View>
//                     <View style={{ flex: 0.5, backgroundColor: lightGrey, height: 40, marginTop: 20 }}>
//                         <Text style={{ fontSize: 12 }}>Pre-Start Checklist-All fields are Mandatory ( No Obvious Defect) ( X-Fault Identified) & N/A not applicable</Text>

//                     </View>
//                     <View style={{ flex: 0.1 }} />

//                     <View style={{ borderWidth: 0.5, borderColor: mainGrey, flex: 2, marginTop: 10, backgroundColor: lightGrey, height: 50, backgroundColor: mediumGrey }}>
//                         <Text style={{ fontSize: 12 }}>Cat“A“ Fault: {" "}
//                             <Text style={{ color: 'red' }}>MUST NOT be operated {" "}
//                                 <Text style={{ color: mainBlack }}>until fault is rectified Cat “B” Fault: May be operated.Corrective action is required</Text>
//                             </Text>
//                         </Text>
//                     </View>

//                     <View style={{ flex: 1, backgroundColor: lightGrey, flexDirection: 'column', marginTop: 30 }}>


//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                 <Text style={{ color: textBlack }}>Engine Oil steel</Text>
//                             </View>
//                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                 <CheckBox checked={isCheck3} state={setCheck3} />
//                             </View>
//                         </View>
//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                 <Text style={{ color: textBlack }}>Warning System</Text>
//                             </View>
//                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                 <CheckBox checked={isCheck4} state={setCheck4} />
//                             </View>
//                         </View>
//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                 <Text style={{ color: textBlack }}>Steering</Text>
//                             </View>
//                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                 <CheckBox checked={isCheck5} state={setCheck5} />
//                             </View>
//                         </View>
//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                 <Text style={{ color: textBlack }}>Safety / Emerg Stops</Text>
//                             </View>
//                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                 <CheckBox checked={isCheck6} state={setCheck6} />
//                             </View>
//                         </View>
//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                 <Text style={{ color: textBlack }}>Hand Brake Alarm</Text>
//                             </View>
//                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                 <CheckBox checked={isCheck7} state={setCheck7} />
//                             </View>
//                         </View>
//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                 <Text style={{ color: textBlack }}>PTO / Vac.Pump</Text>
//                             </View>
//                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                 <CheckBox checked={isCheck8} state={setCheck8} />
//                             </View>
//                         </View>
//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                 <Text style={{ color: textBlack }}>Horn</Text>
//                             </View>
//                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                 <CheckBox checked={isCheck9} state={setCheck9} />
//                             </View>
//                         </View>
//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                 <Text style={{ color: textBlack }}>Rev alarm/Camera</Text>
//                             </View>
//                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                 <CheckBox checked={isCheck10} state={setCheck10} />
//                             </View>
//                         </View>
//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                 <Text style={{ color: textBlack }}>Lights-Head</Text>
//                             </View>
//                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                 <CheckBox checked={isCheck11} state={setCheck11} />
//                             </View>
//                         </View>
//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                 <Text style={{ color: textBlack }}>Lights-Tail</Text>
//                             </View>
//                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                 <CheckBox checked={isCheck12} state={setCheck12} />
//                             </View>
//                         </View>
//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                 <Text style={{ color: textBlack }}>Light-beacons</Text>
//                             </View>
//                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                 <CheckBox checked={isCheck13} state={setCheck13} />
//                             </View>
//                         </View>
//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                 <Text style={{ color: textBlack }}>Hazards Light</Text>
//                             </View>
//                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                 <CheckBox checked={isCheck14} state={setCheck14} />
//                             </View>
//                         </View>
//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                 <Text style={{ color: textBlack }}>Rims & Wheel Nuts</Text>
//                             </View>
//                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                 <CheckBox checked={isCheck15} state={setCheck15} />
//                             </View>
//                         </View>
//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                 <Text style={{ color: textBlack }}>Coolant</Text>
//                             </View>
//                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                 <CheckBox checked={isCheck16} state={setCheck16} />
//                             </View>
//                         </View>

//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                 <Text style={{ color: textBlack }}>Wheels & Tyres</Text>
//                             </View>
//                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                 <CheckBox checked={isCheck17} state={setCheck17} />
//                             </View>
//                         </View>
//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                 <Text style={{ color: textBlack }}>Mirrors & Windscreen</Text>
//                             </View>
//                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                 <CheckBox checked={isCheck18} state={setCheck18} />
//                             </View>
//                         </View>
//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                 <Text style={{ color: textBlack }}>Structure & Bodywork</Text>
//                             </View>
//                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                 <CheckBox checked={isCheck19} state={setCheck19} />
//                             </View>
//                         </View>
//                         <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                             <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                 <Text style={{ color: textBlack }}>Wipers</Text>
//                             </View>
//                             <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                 <CheckBox checked={isCheck20} state={setCheck20} />
//                             </View>
//                         </View>




//                     </View>
//                     <View style={{ flex: 2, backgroundColor: lightGrey, marginTop: 10 }}>
//                         <Text style={{ color: mainGrey }}>Accessories & Fittings</Text>
//                         <View style={{ flex: 2, backgroundColor: lightGrey, flexDirection: 'row' }}>

//                             <View style={{ flex: 1, backgroundColor: lightGrey, flexDirection: 'column' }}>



//                                 <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                                     <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                         <Text style={{ color: textBlack }}>Hoses</Text>
//                                     </View>
//                                     <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                         <CheckBox checked={isCheck21} state={setCheck21} />
//                                     </View>
//                                 </View>
//                                 <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                                     <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                         <Text style={{ color: textBlack }}>Fittings</Text>
//                                     </View>
//                                     <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                         <CheckBox checked={isCheck22} state={setCheck22} />
//                                     </View>
//                                 </View>
//                                 <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                                     <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                         <Text style={{ color: textBlack }}>First Aid Kit</Text>
//                                     </View>
//                                     <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                         <CheckBox checked={isCheck23} state={setCheck23} />
//                                     </View>
//                                 </View>
//                                 <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                                     <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                         <Text style={{ color: textBlack }}>PPE</Text>
//                                     </View>
//                                     <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                         <CheckBox checked={isCheck24} state={setCheck24} />
//                                     </View>
//                                 </View>
//                                 <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                                     <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                         <Text style={{ color: textBlack }}>Fire Extinguisher (Date Calibrated)</Text>
//                                     </View>
//                                     <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                         <CheckBox checked={isCheck25} state={setCheck25} />
//                                     </View>
//                                 </View>
//                                 <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                                     <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                         <Text style={{ color: textBlack }}>Garden Hose</Text>
//                                     </View>
//                                     <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                         <CheckBox checked={isCheck26} state={setCheck26} />
//                                     </View>
//                                 </View>
//                                 <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                                     <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                         <Text style={{ color: textBlack }}>Gattic Lifters</Text>
//                                     </View>
//                                     <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                         <CheckBox checked={isCheck27} state={setCheck27} />
//                                     </View>
//                                 </View>
//                                 <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                                     <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                         <Text style={{ color: textBlack }}>Bucket / Rags</Text>
//                                     </View>
//                                     <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                         <CheckBox checked={isCheck28} state={setCheck28} />
//                                     </View>
//                                 </View>
//                                 <View style={{ height: 30, backgroundColor: lightGrey, marginTop: 5, flexDirection: 'row' }}>
//                                     <View style={{ flex: 1.2, backgroundColor: lightGrey }}>
//                                         <Text style={{ color: textBlack }}>Spill kit</Text>
//                                     </View>
//                                     <View style={{ flex: 0.5, backgroundColor: lightGrey }}>
//                                         <CheckBox checked={isCheck29} state={setCheck29} />
//                                     </View>
//                                 </View>


//                             </View>

//                         </View>
//                     </View>
//                     <View style={{ flex: 2, height: 60, backgroundColor: '#F8F189' }}>
//                         <Text style={{ paddingLeft: 10 }} >Any Faults to Report (of any Category) & any additional information</Text>

//                     </View>
//                     <View style={{ flex: 2, height: 70, flexDirection: 'row', marginTop: 20 }}>
//                         <Text >Action Taken By</Text>
//                         <View style={{ flex: 1 }} />
//                         <Text >Authorized By</Text>


//                     </View>
//                     <View style={{ flex: 2, backgroundColor: lightGrey, marginTop: 20, flexDirection: 'column' }}>

//                         <View style={{ height: 50, backgroundColor: lightGrey, marginTop: 15, }}>

//                             <View style={{ height: 25 }}>
//                                 <View style={{ flex: 1, flexDirection: 'row' }}>
//                                     <View style={{ flex: 1, justifyContent: 'center', }}>
//                                         <CheckBox checked={isCheck30} state={setCheck30} />

//                                     </View>

//                                     <View style={{ flex: 11, }}>
//                                         <Text style={{ fontSize: 14, color: textBlack }}>I have conducted the above pre-start checklist and satisfied that the vehicle is safe and ready to operate</Text>
//                                     </View>


//                                 </View>
//                             </View>
//                             <View style={{ height: 50, backgroundColor: lightGrey, marginTop: 15, }}>

//                             <View style={{ height: 25 }}>
//                                 <View style={{ flex: 1, flexDirection: 'row' }}>
//                                     <View style={{ flex: 1, justifyContent: 'center', }}>
//                                         <CheckBox checked={isCheck31} state={setCheck31} />

//                                     </View>

//                                     <View style={{ flex: 11, }}>
//                                         <Text style={{ fontSize: 14, color: textBlack }}>I have reported all faults in the appropriate section and notified the authorized personnel.</Text>
//                                     </View>

// </View>
//                                 </View>
//                             </View>

//                         </View>



//                     </View>
//                     <View style={{ paddingTop: 60, paddingBottom: 60, flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
//                         <View style={{ width: 150, height: 40, backgroundColor: mainBlue, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }}>
//                             <Text style={{ color: mainWhite, }}>Submit</Text>
//                         </View>
//                     </View>
//                     <ReviewScreen />

//                 </View>
//             </ScrollView>
//         )
//     }



//     return (
//         <StoreConsumer>
//             {values => {
//                 return (
//                     <RenderContacts values={values} />
//                 )
//             }}
//         </StoreConsumer>
//     )

// }

// export default PreInspectionCheck
// const styles = StyleSheet.create({
//     topBox: {
//         flex: 2,
//         height: 40,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         backgroundColor: mainWhite,
//         borderWidth: 1,
//         borderColor: mainBlue,
//         borderRadius: 20,
//         flexDirection: 'row',
//     },
//     textStyle: {
//         paddingTop: 10,
//         paddingLeft: 10,
//         color: darkGrey,
//         fontSize: 14
//     },
//     staticBoxStyle: {
//         flex: 1.5,
//         backgroundColor: lightGrey,
//         height: 30,
//         marginRight: 10,
//     },
//     editableBoxStyle: {
//         flex: 1.5,
//         backgroundColor: lightGrey,
//         height: 30,
//         flexDirection: 'row'

//     }



// });






