
import React, { useState } from 'react'
import { StyleSheet, View, Text, Image, SafeAreaView, TouchableOpacity, Dimensions,Alert, TextInput, ScrollView } from 'react-native'
import { lightGrey, mainWhite, textBlue, mainBlue, textGrey, mainGrey, lightGreen, textlightgrey, textBlack, lightGreyBackground, mediumGrey } from '../../../../common/Colors'
import { TeamImage } from '../../../../common/Images'
import { add_employee, team_list } from '../action'
import { connect } from 'react-redux'
import Dropdown from './Innerscreen/Dropdown'
import { BASE_IMAGE_URL } from '../../../../store/endpoint'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ImagePicker from 'react-native-image-picker';
import DatePicker from 'react-native-datepicker'
import Modal, { ModalContent } from 'react-native-modals';
import DocumentPicker from 'react-native-document-picker';
import { ActivityIndicator } from 'react-native'
import Toast from 'react-native-simple-toast';
import Icon1 from 'react-native-vector-icons/FontAwesome5'



const AddTeam = ({ route, navigation, dispatch, team }) => {
    let width = Dimensions.get('window').width / 2

    const RenderContacts = () => {

        const [indexData, setIndexData] = useState(team.designation_list)
        const [indexData1, setIndexData1] = useState(team.designation_list[0].user_type)
        const [designation, setDesignation] = useState("")
        const [empid, setEmpid] = useState("")
        const [firstname, setFirstName] = useState("")
        const [lastname, setLastName] = useState("")
        const [contactno, setContactno] = useState("")
        const [email, setEmail] = useState("")
        const [username, setUsername] = useState("")
        const [password, setPassword] = useState("")
        const [image, setImage] = useState("")
        const [imageuri, setImageUri] = useState("")
        const [bio, setBio] = useState("")
        const [coverimage, setCimage] = useState("")
        const [dob, setDob] = useState("")
        const [visibleModal, setModal] = useState(false)
        const [individual_team, setIndividualTeam] = useState("")
        const [datejoin, setDateJoin] = useState("")
        const [expirydate, setDateexpiry] = useState("")
        const [docname, setDocname] = useState("")
        const [docuri, setDocuri] = useState()
        const [loader, setLoader] = useState(false)

        const [WorkEmailID, setWorkEmailID] = useState("")
        const [Address, setAddress] = useState("")
        const [terminationDate, setTerminationDate] = useState("")
        const [EmContactName, setEmContactName] = useState("")
        const [EmContactNo, setEmContactNo] = useState("")
        const [msg, setMsg] = useState('')
        const [personal, setpersonal] = useState('')


        let dropdownData1 = ["full_time", "part_time", "casual"]
        const [EmpStatus, setEmpStatus] = useState(dropdownData1[0])

        var date1 = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        let date2=year + '-' + month + '-' + date1
  
        let dropdownData = []
        if (team.designation_list) {
            team.designation_list.map((item) => {
                const { user_type } = item
                return (
                    dropdownData.push(user_type)
                )
            })
        }
        const selectDataA = (index) => {
            setEmpStatus(dropdownData1[index])
        }

        const selectData = (index) => {
            console.log('Selected index : ' + team.designation_list[index].user_type)
            setIndexData1(team.designation_list[index].user_type)
        }


        const [licencealert, setLiscenseAlert] = useState("")
        let button_opacity = 0.6
        let button_disable = true
        let DATA = [1, 5]
        console.log("hhhhhh" + empid + image + firstname + contactno + docname + email +
            username + password + dob + datejoin +
            expirydate + docuri + licencealert + WorkEmailID +
            Address + terminationDate + EmContactName +
            EmContactNo + EmpStatus)
        if (empid !== "" && firstname !== "" && contactno !== "" && email !== "" && password !== "" && dob !== "" && datejoin !== ""

            && Address !== "" && EmContactName !== "" &&
            EmContactNo !== "" && EmpStatus !== "") {

            button_opacity = 1
            button_disable = false
        } else {
            button_opacity = 0.6
            button_disable = true
        }
        console.log(button_disable)
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

        const validateEmail = (email) => {
            var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(email);
        };
        const submit_btn = () => {
            if(isNaN(EmContactNo)){
                setEmContactNo('')
            }else if(isNaN(contactno)){
                setContactno('')
            }else
           
            if(password.length<=7){
                setMsg('Password should be greater than 7')

            
        }else

            if (!validateEmail(email)) {
                setEmail('')
                setMsg('Please enter valid email id')
            }if (!validateEmail(personal)) {
                setpersonal('')
                setMsg('Please enter valid email id')}
            else {
                setMsg('')

                setLoader(true)

                let image_name = "image.png" || "image.jpg"
                let form_body = new FormData()
                form_body.append('employee_id', empid)
                form_body.append('name', firstname)
                form_body.append('user_type', indexData1)
                form_body.append('instagram_link', "")
                form_body.append('linkedin_link', "")
                form_body.append('facebook_link', "")

                form_body.append('contact_number', contactno)
                form_body.append('email', email)
                form_body.append('personal_email', email)

                form_body.append('date_of_birth', dob)
                form_body.append('date_joined', datejoin)
                form_body.append('emergency_contact_name', EmContactName)
                form_body.append('emergency_contact', EmContactNo)



                  if(docuri!==undefined){
                    form_body.append('driving_license', docuri)

                  }
                  


                form_body.append('expiry_date', expirydate)
                form_body.append('alert_before', licencealert)
                if(image){
                    form_body.append('dp', {
                        uri: image,
                        type: 'image/jpg' || 'image/png' || 'image/jpeg',
                        name: "image.jpg" || "image.png"
                    })
                    form_body.append('cover_image', {
                        uri: image,
                        type: 'image/jpg' || 'image/png' || 'image/jpeg',
                        name: "image.jpg" || "image.png"
                    })
                }
                
                
                form_body.append('bio', bio)
                form_body.append('username', email)
                form_body.append('password', password)
                form_body.append('termination_date', terminationDate)
                form_body.append('address', Address)
                form_body.append('emergency_contact_name', EmContactName)
                form_body.append('emergency_contact', EmContactNo)
                form_body.append('employment_status', EmpStatus)
                form_body.append('personal_email', personal)

                console.log("form_body" + JSON.stringify(form_body))
                const success = (response) => {
                    setLoader(false)
                    dispatch(team_list())
                    Toast.showWithGravity('Added Successfully', Toast.SHORT, Toast.BOTTOM);

                    navigation.pop()
                }

                const failed = (response) => {
                    console.log("response" + JSON.stringify(response))
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
                    setLoader(false)

                }

                dispatch(add_employee(form_body, success, failed))

            }
        }

        if (individual_team) {
            if (individual_team.dp) {
                var profPic = { uri: BASE_IMAGE_URL + individual_team.dp };
                console.log(profPic)
            } else {
                var profPic = TeamImage;

            }
        }

        const call_modal = () => {
            setModal(true)
        }
        const RenderItems = ({ item }) => {

            return (
                <TouchableOpacity onPress={() => call_modal()}
                    style={{
                        justifyContent: 'center', alignItems: 'center', height: 32, flexDirection: 'row', width: 100, margin: 8, borderRadius: 50, borderWidth: 1, borderColor: mainGrey
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
                width: 1000,
                height: 500,
                quality: 0.5,
                duration: 10,
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
                    let extension = response.type
                    if (extension === 'image/jpeg' || extension === 'image/png') {
                        // var image_blob = URL.createObjectURL(image_file)
                        setImage(response.uri)
                        setImageUri(response)
                    } else {
                        alert('File should be an Image. Only jpg and png files are accepted')
                    }


                }
            })
        };

        if (image) {
            var profPic = { uri: image };
        } else {
        }

        return (
            <SafeAreaView style={{ flex: 1, }}>

                <ScrollView style={{ flex: 1, }}>
                    <View style={{ flex: 1, backgroundColor: lightGrey, }}>
                        <View style={{ justifyContent: 'center', alignItems: "center", borderRadius: 5, borderWidth: 0.25, borderColor: mainGrey, marginLeft: 10, marginRight: 10, flex: 1.9, paddingHorizontal: 20, backgroundColor: mediumGrey, flexDirection: 'row', marginTop: '7%' }}>


                            <View style={{ flex: 1.2, backgroundColor: mediumGrey, marginTop: 30, justifyContent: 'center', alignItems: 'center' }}>
                                {image ? (
                                    <Image style={{ height: 80, width: 80, borderRadius: 40, marginTop: 20 }} source={profPic} />

                                ) : (
                                        <TouchableOpacity onPress={() => ProfilePictureAdd()}
                                            style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center', height: 80, width: 80, borderRadius: 40, backgroundColor: mainGrey, flexDirection: 'column' }}  >
                                            <Icon name='person' color={mainWhite} size={25} />
                                            <Text style={{ color: mainWhite, fontSize: 12 }}>Add Image</Text>

                                        </TouchableOpacity>
                                    )}

                            </View>
                            <View style={{
                                marginTop: 20,
                                flex: 2, marginLeft: 10, marginRight: 10, flexDirection: 'column'
                            }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ paddingTop: 15, color: lightGreen, fontSize: 14, color: textBlue }}>Position Title :</Text>

                                    <View style={{ paddingTop: 15, marginLeft: 10, width: 100, }}>
                                        <Dropdown
                                            dropdown_data={dropdownData}
                                            selectData={selectData}
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
                                            style={{ color: textBlack, fontSize: 14, width: 100, }}
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
                                flex: 1, backgroundColor: lightGrey, marginTop: 10

                            }}>
                                {/* <Text style={{ alignSelf: 'center', fontSize: 12 }}>Send a Message</Text> */}
                            </View>
                        </View>
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 2, paddingHorizontal: 20, }}>

                            <View style={{ flex: 1, flexDirection: 'row', marginTop: 15 }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Emp Id</Text>
                                    <Icon1 style={{ alignSelf: 'center', marginLeft: 5, marginBottom: 10 }} size={8} color="red" name="star-of-life"></Icon1>

                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: lightGrey,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: textBlack, height: 40, fontSize: 14, marginLeft: 3, width: 200 }}
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
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Address</Text>
                                    <Icon1 style={{ alignSelf: 'center', marginLeft: 5, marginBottom: 10 }} size={8} color="red" name="star-of-life"></Icon1>

                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: lightGrey,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: textBlack, height: 40, fontSize: 14, marginLeft: 3, width: 200 }}
                                        autoCapitalize='none'
                                        value={Address}

                                        placeholderTextColor={textlightgrey}

                                        placeholder={"Address"}
                                        onChangeText={txt => setAddress(txt)}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 2, flexDirection: 'row', }}>

                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Date of Birth</Text>
                                    <Icon1 style={{ alignSelf: 'center', marginLeft: 5, marginBottom: 10 }} size={8} color="red" name="star-of-life"></Icon1>

                                </View>
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <DatePicker
                                        style={{
                                            width: 87,

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
                                    <Text style={styles.textStyle} >Joining Date</Text>
                                    <Icon1 style={{ alignSelf: 'center', marginLeft: 5, marginBottom: 10 }} size={8} color="red" name="star-of-life"></Icon1>

                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: lightGrey,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <DatePicker
                                        style={{
                                            width: 76,
                                            marginLeft: 5
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

                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Email Address</Text>
                                    <Icon1 style={{ alignSelf: 'center', marginLeft: 5, marginBottom: 10 }} size={8} color="red" name="star-of-life"></Icon1>

                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: lightGrey,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: textBlack, height: 40, fontSize: 14, marginLeft: 3, width: 200 }}
                                        autoCapitalize='none'
                                        value={email}
                                        placeholder={"Email Address"}
                                        placeholderTextColor={textlightgrey}
                                        onChangeText={txt => setEmail(txt)}
                                    />
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Contact Number</Text>
                                    <Icon1 style={{ alignSelf: 'center', marginLeft: 5, marginBottom: 10 }} size={8} color="red" name="star-of-life"></Icon1>

                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: lightGrey,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: textBlack, height: 40, fontSize: 14, marginLeft: 3, width: 200 }}
                                        autoCapitalize='none'
                                        value={contactno}
                                        placeholder={"Number"}
                                        keyboardType={"number-pad"}
                                        placeholderTextColor={textlightgrey}
                                        onChangeText={txt => setContactno(txt)}
                                    />
                                </View>
                            </View>
                            {/* <View style={{ flex: 2, flexDirection: 'row', }}>

                                <View style={styles.staticBoxStyle}>
                                    <Text numberOfLines={1}
                                        style={styles.textStyle} >Termination Date</Text>
                                </View>
                                <View style={styles.editableBoxStyle}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <DatePicker
                                        style={{
                                            width: 87,

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
                            </View> */}

                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Employment Status</Text>
                                    <Icon1 style={{ alignSelf: 'center', marginLeft: 5, marginBottom: 10 }} size={8} color="red" name="star-of-life"></Icon1>

                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: lightGrey,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <Dropdown
                                        dropdown_data={dropdownData1}
                                        selectData={selectDataA}
                                    />
                                </View>
                            </View>

                            {/* <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text numberOfLines={1}
                                        style={styles.textStyle} >Work Email Address</Text>
                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: lightGrey,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: textBlack, height: 40, fontSize: 14, marginLeft: 3, width: 200 }}
                                        autoCapitalize='none'
                                        value={WorkEmailID}
                                        placeholder={"Email Address"}
                                        placeholderTextColor={textlightgrey}
                                        onChangeText={txt => setWorkEmailID(txt)}
                                    />
                                </View>
                            </View> */}
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text style={styles.textStyle} >Emergency Contact</Text>
                                    <Icon1 style={{ alignSelf: 'center', marginLeft: 5, marginBottom: 10 }} size={8} color="red" name="star-of-life"></Icon1>

                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: lightGrey,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: textBlack, height: 40, fontSize: 14, marginLeft: 3, width: 200 }}
                                        autoCapitalize='none'
                                        value={EmContactName}
                                        placeholder={"Name"}
                                        placeholderTextColor={textlightgrey}
                                        onChangeText={txt => setEmContactName(txt)}
                                    />
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row',  }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text numberOfLines={1}
                                        style={styles.textStyle} >Emergency Contact No</Text>
                                    <Icon1 style={{ alignSelf: 'center', marginLeft: 5, marginBottom: 10 }} size={8} color="red" name="star-of-life"></Icon1>

                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: lightGrey,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: textBlack, height: 40, fontSize: 14, marginLeft: 3, width: 200 }}
                                        autoCapitalize='none'
                                        value={EmContactNo}
                                        placeholder={"Number"}
                                        keyboardType={"number-pad"}
                                        placeholderTextColor={textlightgrey}
                                        onChangeText={txt =>{ 
                                            setEmContactNo(txt)
                                            if(isNaN(EmContactNo))
    {
      // If the Given Value is Not Number Then It Will Return True and This Part Will Execute.
    //   Alert.alert("Value is Not Number");
      setEmContactNo("")
    }
    else
    {
      // If the Given Value is Number Then It Will Return False and This Part Will Execute.
      setEmContactNo(txt)
    //   Alert.alert("Value is Number");
    }
                                            }}
                                    />
                                </View>
                            </View>

                            <View style={{ flex: 1, flexDirection: 'row', marginBottom: 10 }}>
                                <View style={styles.staticBoxStyle}>
                                    <Text numberOfLines={1}
                                        style={styles.textStyle} >Personal Email</Text>

                                </View>
                                <View style={{
                                    flex: 1,
                                    backgroundColor: lightGrey,
                                    marginRight: 10,
                                    height: 40,
                                    flexDirection: 'row',
                                    alignSelf: 'center'
                                }}>
                                    <Text style={{ alignSelf: "center" }}>:</Text>
                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: textBlack, height: 40, fontSize: 14, marginLeft: 3, width: 200 }}
                                        autoCapitalize='none'
                                        value={personal}
                                        placeholder={"Email"}
                                        placeholderTextColor={textlightgrey}
                                        onChangeText={txt => setpersonal(txt)}
                                    />
                                </View>
                            </View>
                        </View>
                        
                        <View style={{ flex: 0.5, marginBottom: 20 }}>
                            <View style={{ height: 40, backgroundColor: lightGreyBackground }}>
                                <Text style={{ fontSize: 14, fontWeight: '900', paddingTop: 10, paddingLeft: 10, paddingRight: 5, color: textBlack }}>ID Proofs
                        </Text>
                            </View>
                            <View style={{ flexDirection: 'column', marginTop: '5%', marginLeft: 20, }}>
                                <View style={{ flexDirection: 'row', }}>
                                    <Text style={{ alignSelf: 'center', width: 135, fontSize: 14, marginLeft: 5 }}>License File</Text>

                                    <TouchableOpacity onPress={() => uploadFolder()}
                                        style={{ justifyContent: 'center', alignItems: 'center', width: 100, height: 30, borderRadius: 5, borderWidth: 1, borderColor: mainGrey }}>
                                        <Text style={{ fontSize: 14, }}>Select File</Text>


                                    </TouchableOpacity>
                                    <Text numberOfLines={1}
                                        style={{ marginRight: 10, width: 80, color: textBlack, fontSize: 16, alignSelf: 'center', marginLeft: 10 }}>{docname}</Text>
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: '2%', marginTop: 10 }}>
                                    <Text style={{ alignSelf: 'center', width: 135, fontSize: 14, marginLeft: 5 }}>License Expiry</Text>
                                    <DatePicker
                                        style={{
                                            width: 87,

                                        }}
                                        date={expirydate}
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
                                </View>
                                <View style={{ flexDirection: 'row', marginBottom: '2%', }}>
                                    <Text style={{ alignSelf: 'center', width: 135, fontSize: 14, marginLeft: 5 }}>License Alert</Text>
                                    <DatePicker
                                        style={{
                                            width: 87,

                                        }}
                                        date={licencealert}
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

                                        onDateChange={(date) => { setLiscenseAlert(date) }}

                                    />
                                </View>

                            </View>

                        </View>
                        <View style={{ flex: 0.2 }} />
                        <View style={{ flex: 3.5, }}>

                            <View style={{ backgroundColor: textGrey, flexDirection: "column", marginTop: 10, marginLeft: 10, marginRight: 10 }}>
                                <Text style={{ marginTop: 20, marginLeft: 20 }}>Credentials for Enviro</Text>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ color: lightGreen, marginTop: 20, marginLeft: 20, fontSize: 14 }}>UserName</Text>
                                    <Icon1 style={{ alignSelf: 'center', marginLeft: 5, }} size={8} color="red" name="star-of-life"></Icon1>

                                    <View style={{
                                        width: 150,
                                        marginRight: 10,
                                        height: 40,
                                        marginLeft: 20,
                                        marginTop: 10,
                                        borderBottomWidth: 1,
                                        borderColor: mainGrey
                                    }}>
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            style={{ color: mainGrey, fontSize: 14, }}
                                            autoCapitalize='none'
                                            value={email}
                                            editable={false}
                                        // onChangeText={txt => setUsername(txt)}
                                        />
                                    </View>
                                </View>
                                <View style={{ flexDirection: "row" }}>
                                    <Text style={{ color: lightGreen, marginTop: 20, marginLeft: 20, fontSize: 14 }}>Password</Text>
                                    <Icon1 style={{ alignSelf: 'center', marginLeft: 5, marginBottom: 25 }} size={8} color="red" name="star-of-life"></Icon1>

                                    <View style={{
                                        width: 150,
                                        marginRight: 10,
                                        height: 40,
                                        marginLeft: 20,
                                        marginTop: 10,
                                        borderBottomWidth: 1,
                                        borderColor: mainGrey,
                                        marginBottom: 30,
                                    }}>
                                        <TextInput
                                            underlineColorAndroid="transparent"
                                            style={{ color: mainGrey, fontSize: 14, }}
                                            autoCapitalize='none'
                                            value={password}
                                            onChangeText={txt => setPassword(txt)}
                                        />
                                    </View>
                                </View>
                                <View style={{ flex: 0.5 }} />
                            </View>
                            <View style={{ justifyContent: "center", alignItems: "center", marginBottom: 20, marginTop: 20 }}>
                                <Text style={{ color: "red", marginBottom: 10 }}>{msg}</Text>
                                <TouchableOpacity onPress={() => submit_btn()} disabled={button_disable}
                                    style={{ opacity: button_opacity, justifyContent: "center", alignItems: "center", width: 170, height: 40, backgroundColor: lightGreen }}>
                                    {loader ? (
                                        <ActivityIndicator size="small" color={mainWhite}></ActivityIndicator>
                                    ) : (
                                            <Text style={{ alignSelf: "center", color: mainWhite }}>CREATE </Text>

                                        )}

                                </TouchableOpacity>


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

                                            <View style={{ flexDirection: 'row', marginBottom: '2%' }}>
                                                <Text style={{ width: 135, fontSize: 16, marginLeft: 5 }}>License Expiry</Text>
                                                <DatePicker
                                                    style={{
                                                        width: 87,

                                                    }}
                                                    date={expirydate}
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
                                                            fontSize: 16,
                                                            marginBottom: 20

                                                        }
                                                    }}

                                                    onDateChange={(date) => { setDateexpiry(date) }}

                                                />
                                            </View>
                                            <View style={{ flexDirection: 'row', marginBottom: '10%' }}>
                                                <Text style={{ width: 135, fontSize: 14, marginLeft: 5 }}>License Alert</Text>
                                                <DatePicker
                                                    style={{
                                                        width: 87,

                                                    }}
                                                    date={licencealert}
                                                    mode="date"
                                                    placeholder="yyyy-mm-dd"
                                                    placeholderTextColor={mainGrey}
                                                    format="YYYY-MM-DD"
                                                    showIcon={false}
                                                    minDate="2000-01-01"
                                                    textColor={mainGrey}
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
                                                            fontSize: 16,
                                                            marginBottom: 20

                                                        }
                                                    }}

                                                    onDateChange={(date) => { setLiscenseAlert(date) }}

                                                />
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
            <View style={{ backgroundColor: textGrey, height: 11 }}>
            </View>
            <RenderContacts />
        </View>

    )

}

const mapStateToProps = (state) => {
    const { team } = state
    return { team }
}

export default connect(mapStateToProps)(AddTeam)


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
        flex: 1,
        height: 40,
        marginRight: 10,
        alignSelf: 'center',
        flexDirection: 'row'

    },
    editableBoxStyle: {
        flex: 1,
        backgroundColor: lightGrey,
        marginRight: 10,
        height: 40,
        flexDirection: 'row',
        alignSelf: 'center'

    }



});



