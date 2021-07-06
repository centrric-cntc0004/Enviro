import React, { useState } from 'react'
import { View, Text, Image, TextInput, ScrollView, ActivityIndicator, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { ClientImage } from '../../../../common/Images'
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import { mainWhite, mainGrey, mainBlue, textBlack, lightGrey, mediumGrey, textBlue } from '../../../../common/Colors'
import ImagePicker from 'react-native-image-picker';
import {BASE_IMAGE_URL} from '../../../../store/endpoint'
import Toast from 'react-native-simple-toast';
import{edit_profile,fetch_profile}from './common/action'
import {signin}from '../../../login/action'

const EditProfile = ({ navigation, route, dispatch, profile_info, isLoading }) => {
    console.log("profile" + JSON.stringify(profile_info))
   const RenderContacts=()=>{
    let name_data = ""
    let user_data = ""
    let username_data = ""
    let phone_data = ""
    let email_data = ""
    let password_data = ""
    let image_dp = ""
    if (profile_info) {
        name_data = profile_info.name
        user_data = profile_info.user_type
        username_data = profile_info.username
        phone_data = profile_info.contact_number
        email_data = profile_info.email
        password_data = ""
        image_dp = profile_info.dp_thumbnail
    }
    const [name, setName] = useState(name_data)
    const [usertype, setUsertype] = useState(user_data)
    const [username, setUsername] = useState(username_data)
    const [phoneno, setPhoneno] = useState(phone_data)
    const [email, setEmail] = useState(email_data)
    const [password, setPassword] = useState(password_data)
    const [dp, setDp] = useState(image_dp)
    const [image, setImage] = useState("")
    const [imageuri, setImageUri] = useState("")
    const[btnLoader,setLoader]=useState(false)
    let button_enable=false
    if(name_data!=name || username_data!==username || email_data!==email || image || password!==""){
       
        button_enable=true
    }else{
        button_enable=false
    }




    if (isLoading)
        return (
            <ActivityIndicator color={mainBlue} size="large"></ActivityIndicator>
        )

        

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

        } else if (dp) {
            var profPic = { uri: dp };


        }
        else {
            var profPic = ClientImage;



        }


        const call_update_api=()=>{
            setLoader(true)
            const success = () => {
                setLoader(false)
                if(password_data!==password || username!==username_data){
                let data = {
                    username,
                    password,
                   
                }
               
                // let form_body = new FormData()
                // form_body.append("keys",fcmToken)
        
                if (username && password) {
                    dispatch(signin(data))
                }}
                dispatch(fetch_profile())
                
                Toast.showWithGravity('Updated Successfully', Toast.SHORT, Toast.BOTTOM);

            }
    
            const failed = () => {
                setLoader(false)
                Toast.showWithGravity('Failed! please try again', Toast.SHORT, Toast.BOTTOM);

    
            }
    
            let data = new FormData()
            
            
            
                data.append('username', username)
                data.append('name', name)
            
            if(password!=="") {
                 data.append('password', password)
            }
            
            
            if(image) {
                data.append('dp', {
                    uri: image,
                    type: 'image/jpg' || 'image/png' || 'image/jpeg',
                    name: "image.jpg" || "image.png"
                })
                
            }
    
            console.log("kjkjkhkjhkj"+JSON.stringify(data))
             dispatch(edit_profile(data, success, failed))
            // update_profile(data, success, failed)
        }

        if(profile_info===undefined)
        return(
            <View style={{marginTop:100}}>
            <ActivityIndicator size="large" color={mainBlue}></ActivityIndicator>
            </View>
        )

    return (
        <ScrollView style={{ backgroundColor: mediumGrey }}
            showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1, marginTop: '3%', paddingHorizontal: 20 }}>
                <View style={{ flex: 3, marginTop: 60, backgroundColor: mainWhite, }}>
                    <View style={{ flex: 0.7, alignItems: 'center' }}>
                        <Image style={{ height: 100, width: 100, borderRadius: 50, marginTop: -50 }}
                            source={profPic} />
                        <TouchableOpacity onPress={() => ProfilePictureAdd()}
                            style={{ marginTop: -30, marginLeft: 60, backgroundColor: mainGrey, height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                            <Icon name="camera" color={mainWhite} size={16} />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        justifyContent: 'center', alignItems: 'center', marginTop: 10,
                        flex: 5, paddingHorizontal: 30, flexDirection: 'column'
                    }}>
                        <Text style={{ fontSize: 16, color: textBlack, marginTop: 5 }}>{name_data}</Text>
                        <Text style={{ fontSize: 14, marginTop: 5, color: textBlack }}>{usertype}</Text>

                    </View>

                    <View style={{ flex: 5, paddingHorizontal: 20, marginTop: 30 }}>
                        <View style={{ height: 60, borderBottomWidth: 0.5, borderColor: mainGrey }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1.5 }}>
                                    <Text style={{ fontSize: 12, color: textBlue, }}>Name</Text>
                                </View>
                                <View style={{ flex: 4 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 5 }}>
                                            <TextInput style={{ fontSize: 14, color: mainGrey, }} placeholder="Name"
                                                value={name}
                                                onChangeText={txt => setName(txt)}
                                                editable={false}

                                            />
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            {/* <Icon name="pen" color={mainGrey} size={14} /> */}
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ height: 60, borderBottomWidth: 0.5, borderColor: mainGrey, marginTop: 20 }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1.5 }}>
                                    <Text style={{ fontSize: 12, color: textBlue, }}>Mobile Number</Text>
                                </View>
                                <View style={{ flex: 4 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>

                                        <View style={{ flex: 4 }}>
                                            <TextInput keyboardType='number-pad' style={{ fontSize: 14, color: mainGrey, }}
                                                placeholder="phone number"

                                                value={phoneno}
                                                editable={false}
                                                onChangeText={txt => setPhoneno(txt)}
                                            />
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={{ height: 60, borderBottomWidth: 0.5, borderColor: mainGrey, marginTop: 20 }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1.5 }}>
                                    <Text style={{ fontSize: 12, color: textBlue, }}>Email</Text>
                                </View>
                                <View style={{ flex: 5 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 5 }}>
                                            <TextInput
                                                style={{ color: mainGrey, fontSize: 14 }}
                                                placeholder="Email"
                                                value={email}
                                                editable={false}
                                                onChangeText={txt => setEmail(txt)}
                                            />
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ flex: 1, marginTop: 15 }}>
                                                {/* <Icon name="pen" color={mainGrey} size={14} /> */}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 60, borderBottomWidth: 0.5, borderColor: mainGrey, marginTop: 20 }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1.5 }}>
                                    <Text style={{ fontSize: 12, color: textBlue, }}>Username</Text>
                                </View>
                                <View style={{ flex: 4 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>

                                        <View style={{ flex: 4 }}>
                                            <TextInput style={{ color: mainGrey, fontSize: 14 }}
                                                placeholder="Username"
                                                value={username}
                                                onChangeText={txt => setUsername(txt)}
                                            />
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ flex: 1, marginTop: 15 }}>
                                                <Icon name="pen" color={mainGrey} size={14} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ height: 65, borderBottomWidth: 0.5, borderColor: mainGrey, marginTop: 20 }}>
                            <View style={{ flex: 1 }}>
                                <View style={{ flex: 1.5 }}>
                                    <Text style={{ fontSize: 12, color: textBlue, }}>Password</Text>
                                </View>
                                <View style={{ flex: 4 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>

                                        <View style={{ flex: 4 }}>
                                            <TextInput style={{ color: mainGrey, fontSize: 14 }}
                                                placeholder="password"
                                                value={password}
                                                secureTextEntry
                                                onChangeText={txt => setPassword(txt)}
                                            />
                                        </View>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <View style={{ flex: 1, marginTop: 15 }}>
                                                <Icon name="pen" color={mainGrey} size={14} />
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/* MAP BOX VIEW */}
                    </View>

                    <View style={{ flex: 1, alignItems: 'center', paddingBottom: 5, justifyContent: 'center', marginVertical: 15 }}>
                        {
                        button_enable ? ( 
                        <TouchableOpacity onPress={()=>call_update_api()}
                        style={{ height: 40, backgroundColor: mainBlue, borderRadius: 20, width: '40%', justifyContent: 'center', alignItems: 'center' }}>
                            {
                                    btnLoader ? ( 
                             <ActivityIndicator size="small" color={mainWhite} /> 
                             ) : ( 
                            <Text style={{ color: mainWhite, fontSize: 18 }}>Save</Text>
                             ) }
                        </TouchableOpacity>
                        ) : ( 
                        <View style={{ height: 40, opacity: 0.5, backgroundColor: mainBlue, borderRadius: 20, width: '40%', justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ color: mainWhite, fontSize: 18 }}>Save</Text>
                            </View>
                        )
                    }  
                    </View>
                </View>
            </View>
        </ScrollView>
    )

}

return (

    <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: mainWhite, height: 5 }}>
        </View>
        <RenderContacts />
    </View>

)
}
const mapStateToProps = (state) => {
    const { profile_info, isLoading } = state.profile_enviro
    return { profile_info, isLoading }

}



export default connect(mapStateToProps)(EditProfile)








