
import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, ActivityIndicator, Dimensions, TextInput, ScrollView, Alert } from 'react-native'
import { mainWhite, textBlue, mainBlue, mainGrey, textlightgrey, lightGreen, textBlack, lightGreyBackground, mediumGrey, mainBlack } from '../../../../common/Colors'
import { TeamImage } from '../../../../common/Images'
import Dropdown from './Innerscreen/Dropdown'
import { edit_employee } from '../action'
import { BASE_IMAGE_URL } from '../../../../store/endpoint'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { connect } from 'react-redux'
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker'
import Modal, { ModalContent } from 'react-native-modals';
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';

const EditTeam = ({ route, navigation, dispatch, team }) => {
    let width = Dimensions.get('window').width / 2
    const { selected_employee } = team
    let DATA = [1, 5]
    const RenderContacts = () => {
        let data = selected_employee
        let designation_data = ""
        let firstname_data = ""
        let lastname_data = ""
        let contact_no = ""
        let dob1 = ""
        let joindate = ""
        let user = ""
        let emaildata = ""
        let id = ""
        let imagedata = ""
        let expiry_date = ""
        let alert_date = ""
        let address_data = ""
        let work_address = ""
        let emer_contact_name = ""
        let emer_contact_no = ""
        let term_date = ""
        let emp_status = ""
        let pass = ""



        if (selected_employee) {
            console.log("data" + JSON.stringify(selected_employee))
            designation_data = selected_employee.user_type
            firstname_data = selected_employee.name
            contact_no = selected_employee.contact_number
            dob1 = selected_employee.date_of_birth
            joindate = selected_employee.date_joined
            user = selected_employee.username
            emaildata = selected_employee.personal_email
            id = selected_employee.employee_id.toString()
            imagedata = selected_employee.dp_thumbnail
            if (selected_employee.expiry_date !== "None") {
                expiry_date = selected_employee.expiry_date

            } else {

            }
            if (selected_employee.alert_before !== "None") {
                alert_date = selected_employee.alert_before


            } else {

            }
            address_data = selected_employee.address
            work_address = selected_employee.email
            if (selected_employee.emergency_contact_name === "null") {
                emer_contact_name = ''

            } else {
                emer_contact_name = selected_employee.emergency_contact_name
            }
            if (selected_employee.emergency_contact === "null") {
                emer_contact_no = ''
            } else {
                emer_contact_no = selected_employee.emergency_contact
            }
            term_date = selected_employee.termination_date
            emp_status = selected_employee.employement_status


        }
        const validateEmail = (email) => {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };
        const [indexData, setIndexData] = useState(team.designation_list)
        const [individual_team, setIndividualTeam] = useState("")
        const [designation, setDesignation] = useState(designation_data)
        const [firstname, setFirstName] = useState(firstname_data)
        const [lastname, setLastName] = useState("")
        const [email, setemail] = useState(emaildata)
        const [email1, setemail1] = useState(emaildata)

        const [empid, setEmpid] = useState(id)

        const [contactno, setContactno] = useState(contact_no)
        const [username, setUsername] = useState(user)
        const [password, setPassword] = useState(pass)
        const [image, setImage] = useState("")
        const [imagenew, setImagenew] = useState(imagedata)

        const [dob, setDob] = useState(dob1)
        const [visibleModal, setModal] = useState(false)
        const [licencealert, setLiscenseAlert] = useState("")
        const [imageuri, setImageUri] = useState("")
        const [bio, setBio] = useState("")
        const [coverimage, setCimage] = useState("")
        const [profno, setProfno] = useState("")
        const [datejoin, setDateJoin] = useState(joindate)
        const [expirydate, setDateexpiry] = useState(expiry_date)
        const [alertdate, setAlertexpiry] = useState(alert_date)

        const [WorkEmailID, setWorkEmailID] = useState(work_address)
        const [Address, setAddress] = useState(address_data)
        const [terminationDate, setTerminationDate] = useState(term_date)
        const [EmContactName, setEmContactName] = useState(emer_contact_name)
        const [EmContactNo, setEmContactNo] = useState(emer_contact_no)
        const [EmpStatus, setEmpStatus] = useState(emp_status)
        const [msg, setMsg] = useState('')

        var date1 = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        let date2=year + '-' + month + '-' + date1
  

        const [docname, setDocname] = useState("")
        const [docuri, setDocuri] = useState("")
        const [loader, setLoader] = useState(false)
        let dropdownData = []
        if (team.designation_list) {
            team.designation_list.map((item) => {
                const { user_type } = item
                return (
                    dropdownData.push(user_type)
                )
            })
        }
        let dropdownData1 = ["full_time", "part_time", "casual"]
        const selectData = (index) => {
            console.log('Selected index : ' + team.designation_list[index].user_type)
            setIndexData(team.designation_list[index].user_type)
            setDesignation(team.designation_list[index].user_type)
        }
        const selectDataA = (index) => {
            setEmpStatus(dropdownData1[index])
        }



        let submit_btn_status = false
        console.log("jhh"+firstname + firstname_data + email + emaildata  + dob1 + dob +
        designation + designation_data + contactno + contact_no + username + user
        + joindate + datejoin +
        work_address + WorkEmailID 
         )

        if (image ||  firstname !== firstname_data || email !== emaildata  || dob1 !== dob ||
            designation !== designation_data || contactno !== contact_no || username !== user
            || joindate !== datejoin || 
            work_address !== WorkEmailID || Address !== address_data || terminationDate !== term_date 
            || EmContactName !== emer_contact_name || EmContactNo !== emer_contact_no || EmpStatus !== emp_status 
        ) {

            submit_btn_status = true
            if(firstname == '' || email == '' || Address == '' || WorkEmailID==''||EmContactNo==''
        || EmContactName==''|| contactno==''|| username==''){
                submit_btn_status = false
            }
        } else {

            submit_btn_status = false
        }
         


        let button_opacity = 0.6
        let button_disable = true
        let DATA = [1, 5]
        if (docname !== "" && expirydate !== "" && licencealert !== ""
        ) {
            button_opacity = 1
            button_disable = false
        } else {
            button_opacity = 0.6
            button_disable = true
        }
        const uploadFolder = async () => {
            try {
                const results = await DocumentPicker.pickMultiple({
                    type: [DocumentPicker.types.pdf],
                });
                for (const res of results) {
                    setDocname(res.name)
                    setDocuri(res)
                }
            } catch (err) {
                if (DocumentPicker.isCancel(err)) {
                    // User cancelled the picker, exit any dialogs or menus and move on
                } else {
                    throw err;
                }
            }
        }

        const submit_btn = () => {
            console.log(email)
            console.log(WorkEmailID)
            if(isNaN(EmContactNo)){
                setEmContactNo('')
            }else if(isNaN(contactno)){
                setContactno('')
            }else
            if (!validateEmail(email)) {

                setMsg('Please enter valid email id')
            }else
            if (!validateEmail(username)) {

                setMsg('Please enter valid email id')
            }
            else if (!validateEmail(WorkEmailID)) {
                setMsg('Please enter valid email id')
            } else if (!validateEmail(email)) {
                setMsg('Please enter valid email id')
            } else {
                setMsg('')
                setLoader(true)
                let form_body = new FormData()
                form_body.append('employee_id', empid)
                form_body.append('name', firstname)
                form_body.append('user_type', designation)
                form_body.append('contact_number', contactno)
                form_body.append('personal_email', email)
                form_body.append('date_of_birth', dob)
                form_body.append('date_joined', datejoin)
                form_body.append('instagram_link', "")
                form_body.append('linkedin_link', "")
                form_body.append('facebook_link', "")

                form_body.append('email', email)

                if (expiry_date && alert_date) {
                    if (expiry_date !== "Invalid date" || alert_date !== "Invalid date") {
                        form_body.append('expiry_date', expirydate)
                        form_body.append('alert_before', alertdate)
                        form_body.append('cover_image', coverimage)
                    }
                }

                form_body.append('email', WorkEmailID)
                form_body.append('termination_date', terminationDate)
                form_body.append('emergency_contact_name', EmContactName)
                form_body.append('emergency_contact', EmContactNo)
                form_body.append('address', Address)
                form_body.append('employment_status', EmpStatus)
                if (image) {
                    form_body.append('dp', {
                        uri: image,
                        type: 'image/jpg' || 'image/png' || 'image/jpeg',
                        name: "image.jpg" || "image.png"
                    })
                } else {

                }
            //  form_body.append('username', username)

                form_body.append('bio', bio)
                
                const success = (response) => {
                    setLoader(false)
                    Toast.showWithGravity('Updated Successfully', Toast.SHORT, Toast.BOTTOM);

                }

                const failed = (response) => {
                    console.log("lkhiji"+JSON.stringify(response))

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
                            { text: 'OK', onPress: () => console.log('OK Pressed') },
                        ]
                    );
                    // Toast.showWithGravity('Failed', Toast.SHORT, Toast.BOTTOM);

                }

                dispatch(edit_employee(form_body, selected_employee.employee_id, success, failed))
            }
        }

        if (data) {
            if (data.dp) {
                var profPic = { uri: data.dp };
                console.log(profPic)
            } else {


            }
        }

        const call_modal = () => {
            setModal(true)
        }
        const RenderItems = ({ item }) => {

            return (
                <TouchableOpacity onPress={() => call_modal()}
                    style={{
                        justifyContent: 'center', alignItems: 'center',
                        height: 32, flexDirection: 'row', width: 100, margin: 8, borderRadius: 50, borderWidth: 1, borderColor: mainGrey
                    }} >

                    <View style={{ flex: 0.4 }} />
                    <Text numberOfLines={1}
                        style={{ alignSelf: 'center', width: 60 }}>Driving License</Text>
                </TouchableOpacity>
            )
        }

        const ProfilePictureAdd = () => {  //IMAGE UPLOADING
            const options = {
                title: 'SelectAvatar',
                storageOptions: {
                    skipBackup: true,
                    path: 'images',
                },
            };
            ImagePicker.showImagePicker(options, (response) => {

                if (response.didCancel) {
                } else if (response.error) {

                } else {
                    const source = { uri: response.uri };
                    setImage(response.uri)
                    setImageUri(response)
                }
            })
        };


        if (image) {
            var profPic = { uri: image };

        } else if (imagenew) {
            var profPic = { uri: imagenew };


        }
        else {
            var profPic = TeamImage;



        }
        return (
            <SafeAreaView style={{ flex: 1, }}>

                <ScrollView style={{ flex: 1, backgroundColor: mainWhite }}>
                    <View style={{ flex: 1, backgroundColor: mainWhite, }}>
                        <View style={{ justifyContent: 'center', alignItems: "center", borderRadius: 5, borderWidth: 0.25, borderColor: mainGrey, marginLeft: 10, marginRight: 10, flex: 1.9, paddingHorizontal: 20, backgroundColor: mediumGrey, flexDirection: 'row', marginTop: '7%' }}>


                            <View style={{ flex: 1.2, backgroundColor: mediumGrey, marginTop: 10, justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: "center" }}
                                    onPress={() => ProfilePictureAdd()}>
                                    <Image style={{ height: 80, width: 80, borderRadius: 40, marginTop: 15 }}
                                        source={profPic} />

                                    <TouchableOpacity onPress={() => ProfilePictureAdd()}
                                        style={{ marginTop: -20, marginLeft: 60, backgroundColor: textlightgrey, height: 25, width: 25, borderRadius: 12, justifyContent: 'center', alignItems: 'center' }}>
                                        <Icon name="camera-alt" color={mainBlack} size={14} />
                                    </TouchableOpacity>
                                </TouchableOpacity>


                            </View>
                            <View style={{
                                marginTop: 20,
                                flex: 2, marginLeft: 10, marginRight: 10, marginBottom: 10, flexDirection: 'column'
                            }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ paddingTop: 15, color: lightGreen, fontSize: 14, color: textBlue }}>Position Title :</Text>

                                    <View style={{ paddingTop: 15, marginLeft: 10, width: 120, }}>
                                        <Dropdown
                                            dropdown_data={dropdownData}
                                            selectData={selectData}
                                            data={designation}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row' }}>

                                    <View style={{
                                        width: 150,
                                        marginRight: 10,
                                        height: 40,
                                        borderBottomWidth: 1,
                                        borderColor: mainGrey
                                    }}>
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            style={{ color: textBlack, fontSize: 14, width: 150, }}
                                            autoCapitalize='none'
                                            value={firstname}
                                            placeholder="Name"
                                            focusable={true}
                                            onChangeText={txt => setFirstName(txt)}
                                        />
                                    </View>


                                </View>
                            </View>
                            <View style={{
                                flex: 1, backgroundColor: mainWhite, marginTop: 10
                                // height: 30, marginTop: 20, borderWidth: 0.5, borderRadius: 20, borderColor: textBlue,
                                // alignItems: 'center', justifyContent: 'center', alignItems: 'center'
                            }}>
                                {/* <Text style={{ alignSelf: 'center', fontSize: 12 }}>Send a Message</Text> */}
                            </View>
                        </View>
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 2, paddingHorizontal: 20, }}>

                            {/* <View style={{ flex: 1, flexDirection: 'row', marginTop: 15 }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Emp Id</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: mainWhite,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: textBlack, height: 40, fontSize: 14, width: 200, paddingLeft: 10 }}
                                        autoCapitalize='none'
                                        value={empid}
                                        keyboardType={"number-pad"}
                                        maxLength={10}
                                        placeholderTextColor={textlightgrey}
                                        placeholder={"Emp id"}
                                        keyboardType={"number-pad"}
                                        onChangeText={txt => setEmpid(txt)}
                                    />
                                </View>
                            </View> */}
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Address</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: mainWhite,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: textBlack, height: 40, fontSize: 14, width: 200, paddingLeft: 10 }}
                                        autoCapitalize='none'
                                        value={Address}
                                        placeholderTextColor={textlightgrey}
                                        numberOfLines={1}
                                        placeholder={"Address"}
                                        onChangeText={txt => setAddress(txt)}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Joining Date</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: mainWhite,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <DatePicker
                                        style={{
                                            width: 90,

                                        }}
                                        date={datejoin}
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
                                                textColor: "red"

                                            },
                                            dateText: {
                                                color: textBlack,
                                                fontSize: 14,

                                            }
                                        }}

                                        onDateChange={(date) => { setDateJoin(date) }}

                                    />
                                </View>
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row', }}>

                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Email Address</Text>
                                </View>
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: textBlack, height: 40, fontSize: 14, paddingLeft: 10, width: 180 }}
                                        autoCapitalize='none'
                                        value={email}
                                        numberOfLines={1}
                                        placeholderTextColor={textlightgrey}
                                        placeholder={"Email Address"}
                                        onChangeText={txt => setemail(txt)}
                                    />
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Employment Status</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: mainWhite,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <Dropdown

                                        dropdown_data={dropdownData1}
                                        selectData={selectDataA}
                                        data={EmpStatus}
                                    />
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Termination Date</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: mainWhite,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <DatePicker
                                        style={{
                                            width: 90,

                                        }}
                                        date={terminationDate}
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
                                                textColor: "red"

                                            },
                                            dateText: {
                                                color: textBlack,
                                                fontSize: 14,

                                            }
                                        }}

                                        onDateChange={(date) => { setTerminationDate(date) }}

                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Date of birth</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: mainWhite,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <DatePicker
                                        style={{
                                            width: 90,

                                        }}
                                        date={dob}
                                        mode="date"
                                        placeholder="yyyy-mm-dd"
                                        format="YYYY-MM-DD"
                                        showIcon={false}
                                        minDate="2000-01-01"
                                        textColor="#FFFFFF"
                                        maxDate={date2}
                                        confirmBtnText="Confirm"
                                        cancelBtnText="Cancel"
                                        customStyles={{

                                            dateInput: {
                                                borderWidth: 0,
                                                fontSize: 12,
                                                textColor: "red"

                                            },
                                            dateText: {
                                                color: textBlack,
                                                fontSize: 14,

                                            }
                                        }}

                                        onDateChange={(date) => { setDob(date) }}

                                    />
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Contact Number</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: mainWhite,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: textBlack, height: 40, fontSize: 14, width: 200, paddingLeft: 10 }}
                                        autoCapitalize='none'
                                        value={contactno}
                                        contextMenuHidden={true}

                                        placeholderTextColor={textlightgrey}

                                        placeholder={"Number"}
                                        keyboardType={"number-pad"}
                                        onChangeText={txt => setContactno(txt)}
                                    />
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Work Email Address</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: mainWhite,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <TextInput
                                        numberOfLine={1}
                                        underlineColorAndroid="transparent"
                                        style={{ color: textBlack, height: 40, fontSize: 14, paddingLeft: 10, width: 200 }}
                                        autoCapitalize='none'
                                        value={WorkEmailID}
                                        placeholderTextColor={textlightgrey}

                                        placeholder={"Email Address"}
                                        onChangeText={txt => setWorkEmailID(txt)}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Emergency Contact</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: mainWhite,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: textBlack, height: 40, fontSize: 14, width: 200, paddingLeft: 10 }}
                                        autoCapitalize='none'
                                        value={EmContactName}
                                        placeholderTextColor={textlightgrey}

                                        placeholder={"Name"}
                                        onChangeText={txt => setEmContactName(txt)}
                                    />
                                </View>
                            </View>


                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Emergency Contact No</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: mainWhite,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: textBlack, height: 40, fontSize: 14, width: 200, paddingLeft: 10 }}
                                        autoCapitalize='none'
                                        value={EmContactNo}
                                        placeholderTextColor={textlightgrey}
                                        contextMenuHidden={true}

                                        placeholder={"Number"}
                                        keyboardType={"number-pad"}
                                        onChangeText={txt => setEmContactNo(txt)}
                                    />
                                </View>
                            </View>
                            {/* <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Username</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: mainWhite,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: textBlack, height: 40, fontSize: 14, width: 200, paddingLeft: 10 }}
                                        autoCapitalize='none'
                                        value={username}
                                        placeholderTextColor={textlightgrey}

                                        placeholder={"Username"}
                                        onChangeText={txt => setUsername(txt)}
                                    />
                                </View>
                            </View> */}


                        </View>
                        {/* {expiry_date && alert_date ? (
                            <View style={{ flex: 0.5, marginBottom: 20 }}>
                                <View style={{ height: 40, backgroundColor: lightGreyBackground }}>
                                    <Text style={{ fontSize: 14, fontWeight: '900', paddingTop: 10, paddingLeft: 10, paddingRight: 5, color: textBlack }}>ID Proofs
                        </Text>
                                </View>

                                <View style={{ flexDirection: 'column', marginTop: '5%', marginLeft: 20, }}>

                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ alignSelf: 'center', width: 130, fontSize: 14, marginLeft: 5 }}>ID Proof Expiry</Text>
                                        <Text style={{ alignSelf: 'center' }}>:</Text>
                                        <View style={{
                                            width: 150,
                                            height: 40,
                                            mainGrey,
                                        }}>
                                            <DatePicker
                                                style={{
                                                    width: 90,

                                                }} */}
                                                {/* date={expirydate}
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
                                                        textColor: "red"

                                                    },
                                                    dateText: {
                                                        color: textBlack,
                                                        fontSize: 14,

                                                    }
                                                }}

                                                onDateChange={(date) => { setDateexpiry(date) }}

                                            />
                                        </View> */}

                                        {/* <Text numberOfLines={1}
                                    style={{ marginRight:10,width:80,  fontSize: 16, alignSelf: 'center', marginLeft: 10 }}>{docname}</Text> */}
                                    {/* </View>
                                    <View style={{ flexDirection: 'row', }}>
                                        <Text style={{ alignSelf: 'center', width: 130, fontSize: 14, marginLeft: 5 }}>ID Proof Alert</Text>
                                        <Text style={{ alignSelf: 'center' }}>:</Text>

                                        <View style={{
                                            width: 150,
                                            height: 40,
                                            mainGrey,
                                        }}>
                                            <DatePicker
                                                style={{
                                                    width: 90, */}
{/* 
                                                }}
                                                date={alertdate}
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
                                                        textColor: "red"

                                                    },
                                                    dateText: {
                                                        color: textBlack,
                                                        fontSize: 14,

                                                    }
                                                }}

                                                onDateChange={(date) => { setAlertexpiry(date) }}

                                            /> */}
                                        {/* </View> */}

                                        {/* <Text numberOfLines={1}
                                    style={{ marginRight:10,width:80,  fontSize: 16, alignSelf: 'center', marginLeft: 10 }}>{docname}</Text> */}
                                    {/* </View> */}


                                {/* </View>
                            </View>
                        ) : (
                                null
                            )} */}
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 3.5, }}>


                            <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20, marginTop: 20 }}>
                                <Text style={{ color: 'red', marginBottom: 10 }}>{msg}</Text>
                                {submit_btn_status === false ? (
                                    <View
                                        style={{ opacity: 0.6, justifyContent: "center", alignItems: "center", width: 170, height: 40, backgroundColor: lightGreen }}>

                                        <Text style={{ alignSelf: "center", color: mainWhite }}>EDIT</Text>



                                    </View>
                                ) : (

                                        <TouchableOpacity onPress={() => submit_btn()}
                                            style={{ justifyContent: "center", alignItems: "center", width: 170, height: 40, backgroundColor: lightGreen }}>
                                            {loader ? (
                                                <ActivityIndicator size="small" color={mainWhite}></ActivityIndicator>
                                            ) : (
                                                    <Text style={{ alignSelf: "center", color: mainWhite }}>EDIT</Text>

                                                )}

                                        </TouchableOpacity>
                                    )}

                            </View>
                        </View>
                        <Modal
                            visible={visibleModal}
                            onTouchOutside={() => {
                                setModal(false)
                            }}

                        >
                            <ModalContent style={{}}>
                                <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                                    <View style={{ justifyContent: 'center', alignItems: 'center', }}>

                                        <Text style={{ fontSize: 16, marginTop: '5%' }}></Text>
                                        <View style={{ flexDirection: 'column', marginLeft: 10, }}>
                                            <View style={{ flexDirection: 'row', marginRight: 20, marginBottom: '8%' }}>
                                                <TouchableOpacity onPress={() => uploadFolder()}
                                                    style={{ justifyContent: 'center', alignItems: 'center', width: 130, height: 40, borderRadius: 5, borderWidth: 1, borderColor: mainGrey }}>
                                                    <Text style={{ fontSize: 16, }}>Select Folder</Text>


                                                </TouchableOpacity>
                                                <Text style={{ width: 150, fontSize: 16, alignSelf: 'center', marginLeft: 10 }}>{docname}</Text>
                                            </View>



                                        </View>
                                        <TouchableOpacity disabled={button_disable}
                                            onPress={() => setModal(false)}
                                            style={{ opacity: button_opacity, marginBottom: '5%', justifyContent: 'center', alignItems: 'center', borderRadius: 20, width: 100, height: 40, backgroundColor: '#0ea0cc' }}>


                                            <Text style={{ color: '#fff' }}>ok</Text>

                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </ModalContent>
                        </Modal>
                    </View>

                </ScrollView>

            </SafeAreaView>
        )
    }



    return (

        <View style={{ flex: 1 }}>
            <View style={{ backgroundColor: mainWhite, height: 11 }}>
            </View>
            <RenderContacts />
        </View>

    )

}

const mapStateToProps = (state) => {
    const { team } = state
    return { team }
}

export default connect(mapStateToProps)(EditTeam)


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
        color: textBlack,
        fontSize: 14,
        marginTop: 10,
        fontWeight: "900"
    },
    textStyleeditable: {
        paddingTop: 10,
        paddingLeft: 10,
        color: textBlack,
        fontSize: 14

    },
    staticBoxStyle: {
        flex: 0.95,
        height: 40,
        marginRight: 10,
        alignSelf: 'center',

    },
    editableBoxStyle: {
        flex: 1,
        backgroundColor: mainWhite,
        marginRight: 10,
        height: 40,
        flexDirection: 'row',
        alignSelf: 'center'

    }

});



