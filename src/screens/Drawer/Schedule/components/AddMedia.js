import React, { useState, createRef, } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity,PermissionsAndroid, TextInput, Dimensions, Alert, TouchableHighlight } from 'react-native'
import { mainWhite, mainGrey, mediumGrey, darkGrey, textDark, textGrey } from '../../../../common/Colors'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import SignatureCapture from 'react-native-signature-capture';
import { ScrollView } from 'react-native-gesture-handler';
let width = Dimensions.get('window').width / 6
import Modal1, { ModalContent } from 'react-native-modals';
import { connect } from 'react-redux'
import { __edit_comment, __create_comment, delete_comment, add_signature, select_client, select_comment } from './common/action'
import moment from "moment"
import Toast from 'react-native-simple-toast';
const RNFS = require('react-native-fs');

const AddMedia = ({ navigation, route, schedule_enviro, dispatch }) => {
    const { selected_client, comment_list, comment_data, type,  } = schedule_enviro
    const [commentData, setCommentData] = useState('')
    const [cdata, setCData] = useState("")
    const [visibleModal, setVisible] = useState(false)
    const [visibleModal1, setVisible1] = useState(false)
    const [visibleModal2, setVisible2] = useState(false)
    const [resultData, setData] = useState('')




    const call_edit_apis = () => {
        setVisible1(true)
        let form_body = new FormData()
        form_body.append("schedule_id", selected_client.id)
        form_body.append('comment', cdata)


        const success = (response) => {
            setVisible(false)
            setVisible1(false)


        }
        const failure = (response) => {
            setVisible1(false)


        }

        dispatch(__edit_comment(commentData, form_body, success, failure, selected_client.start_date, type))

    }

    const sign = createRef();
    const [note, setNote] = useState("")
    const [comment, setComment] = useState("")
    const [loader, setLoader] = useState(false)




    const add_commentapi = () => {
        setLoader(true)
        let form_body = new FormData()
        form_body.append("schedule_id", selected_client.id)
        form_body.append('comment', comment)


        const success = (response) => {

            setLoader(false)
            setComment("")
            var s = {
                "id": 35,
                "comment": comment,
                "created_by": "jithin",
                "editable": true
            }

            dispatch(select_comment(comment_data.concat(s)))

        }
        const failure = (response) => {
            setLoader(false)

        }

        dispatch(__create_comment(form_body, success, failure, selected_client.start_date, type))


    }

    const call_deleteapi = (item) => {
        Alert.alert(
            "Confirmation",
            "Do you want to delete it ?",
            [
                {
                    text: "No",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "Yes", onPress: () => call_apidel(item) }
            ],
            { cancelable: false }
        );
    }
    const call_apidel = (item) => {
        var array = comment_data; // make a separate copy of the array
        var index = array.indexOf(item)
        if (index !== -1) {
            array.splice(index, 1);
            // arr = array
            dispatch(select_comment(array))


        }
        const success = (response) => {
            var array = comment_data;
            var index = array.indexOf(item)
            if (index !== -1) {
                array.splice(index, 1);
            //   let  arr = array
                dispatch(select_comment(array))


            }

        }
        const failure = (response) => {
            var array = comment_data; // make a separate copy of the array
            var index = array.indexOf(item)
            if (index !== -1) {
                array.splice(index, 1);
                // arr = array
                dispatch(select_comment(array))
                // image_details(array)

            }
        }

        dispatch(delete_comment(item.id, success, failure, selected_client.start_date, type))
    }




    const saveSign = () => {

        let a = sign.current.saveImage();

    }
    const reset = () => {
        let a = sign.current.resetImage();
    }
    const grantPermission=async()=>{
   
        const granted = await PermissionsAndroid.requestMultiple([
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE])
          
               
    
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    
    
                       
                    }else{
                      grantPermission()
                    }
                
            
          }
    const _onSaveEvent = async(result1) => {

        if (Platform.OS === 'android') {
            try {
                const granted = await PermissionsAndroid.requestMultiple([
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
               PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE])
               .then((result) => {
                if (result['android.permission.WRITE_EXTERNAL_STORAGE']=== 'granted') {
                    store_signature(result1)
                }else{
                    Toast.showWithGravity('Permission not granted', Toast.SHORT, Toast.BOTTOM);
                }
            })

               
            } catch (error) {
            }
        } else {
            store_signature(result1)

        //     Contacts.getAll((err, contacts) => {
        //         if (err === 'denied') {
        //         } else {

        //             let contacts_array = []
        //             let single = []
        //             let i = 0
        //             let z = 0

        //             if (contacts.length > 0) {
        //                 for (i = 0; i < contacts.length; i++) {
        //                     if (contacts[i]) {
        //                         const { familyName, givenName, phoneNumbers } = contacts[i]
        //                         if (familyName || givenName && phoneNumbers.length > 0) {
        //                             for (z = 0; z < phoneNumbers.length; z++) {
        //                                 const { number } = phoneNumbers[z]
        //                                 var tempo_phone = number.toString()
        //                                 tempo_phone = tempo_phone.split(" ").join("")
        //                                 tempo_phone = tempo_phone.substring(tempo_phone.length - 10)
        //                                 let check_exist = single.find(user => user.phone === tempo_phone)

        //                                 if (check_exist) {
        //                                 } else {
        //                                     let data = {
        //                                         phone: tempo_phone,
        //                                         contact_name: givenName + ' ' + familyName
        //                                     }
        //                                     single.push(data)
        //                                 }
        //                                 if (phoneNumbers.length === z + 1) {
        //                                     contacts_array.concat(single)
        //                                 }

        //                             }
        //                         }
        //                         if (contacts.length === i + 1) {
        //                             let dataoriginal = { "contacts": single }
        //                             call_api(dataoriginal)
        //                         }
        //                     }
        //                 }
        //             }
        //         }
        //     })
     }

















        // if (Platform.OS === 'android') {
        //     try {
        // const granted = await PermissionsAndroid.requestMultiple([
        //     PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        //     PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE])
          
               
    
        //     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        //             console.log("Granted")
          
                       
        //             }else{
        //                 console.log("Not Granted")

        //               grantPermission()
        //             }
    
            
             

        // try {
        //     const granted = await PermissionsAndroid.requestMultiple([
        //       PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        //       PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        //     ]);
        //   } catch (err) {
        //     console.warn(err);
        //   }
        //   const readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
        //   const writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
        //   if (!readGranted || !writeGranted) {
        //     console.log('Read and write permissions have not been granted');
        //     // grantPermission()
        //     return;
        //   }
        //   var path = `${RNFS.ExternalStorageDirectoryPath}/Enviro`;
        //   console.log('Success' + path);
      
        //   RNFS.mkdir(path);
        //   path += '/sign.png';
      
      
        //   RNFS.writeFile(path, result.encoded, 'base64')
        //     .then((success) => {
        //       console.log("Sucess" + path)
        //     })
        //     .catch((err) => {
        //       console.log(err.message);
        //     });
        // setVisible2(true)
        // console.log("result" + JSON.stringify(result))

        // setData(result)
        // let form_body = new FormData()
        // form_body.append('id', selected_client.id)
        // form_body.append('image', {
        //     uri: "file://" + "/storage/emulated/0/Enviro/sign.png",
        //     type: 'image/png',
        //     name: "image.png"
        // })
        // const success = (response) => {

        //     setVisible2(false)
        //     Toast.showWithGravity('Signature Added Successfully', Toast.SHORT, Toast.BOTTOM);



        // }
        // const failure = (response) => {
        //     setVisible2(false)

        // }

        //  dispatch(add_signature(form_body, success, failure, selected_client.start_date, type))

    };


    const store_signature=(result)=>{
           var path = `${RNFS.DocumentDirectoryPath}/Enviro`;
          console.log('Success' + path);
      
          RNFS.mkdir(path);
          path += '/sign.png';
      
      
          RNFS.writeFile(path, result.encoded, 'base64')
            .then((success) => {
              console.log("Sucess" + path)
            })
            .catch((err) => {
              console.log(err.message);
            });
        setVisible2(true)
        console.log("result" + JSON.stringify(result))

        setData(result)
        let form_body = new FormData()
        form_body.append('id', selected_client.id)
        form_body.append('image', {
            uri: "file://" + path,
            type: 'image/png',
            name: "image.png"
        })
        const success = (response) => {

            setVisible2(false)
            Toast.showWithGravity('Signature Added Successfully', Toast.SHORT, Toast.BOTTOM);



        }
        const failure = (response) => {
            setVisible2(false)

        }

         dispatch(add_signature(form_body, success, failure, selected_client.start_date, type))

    }

    const call_edit = (data) => {
        setCommentData(data.id)
        setCData(data.comment)
        setVisible(true)
    }

    const _onDragEvent = () => {
        // This callback will be called when the user enters signature
        console.log("dragged");
    }

    return (
        <ScrollView style={{ flex: 1 }}>
            <View style={{ flex: 0.3, }}>
                <View style={{ flex: 0.3, paddingHorizontal: 10, marginTop: '5%' }}>
                    <View style={{ borderWidth: 0.2, borderColor: mainGrey, flexDirection: "column", flex: 0.9, backgroundColor: "#CBFFDA", marginTop: 10, marginBottom: 10 }}>
                        <Text style={{ color: mainGrey, fontWeight: "900", paddingLeft: 10, marginTop: 25 }}>Notes :</Text>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{ color: mainGrey, fontSize: 14, }}
                            autoCapitalize='none'
                            multiline={true}
                            value={note}
                            numberOfLines={3}
                            onChangeText={txt => setNote(txt)}
                        />
                    </View>
                </View>
                {selected_client.image !== null ? (
                            null
                        ) : (
                <View style={{ flex: 0.5, paddingHorizontal: 10, marginBottom: 20, }}>
                   
                    <View style={{ borderWidth: 0.5, borderColor: mainGrey, flex: 0.9, backgroundColor: mainWhite, marginTop: 10, marginBottom: 10 }}>
                        <View style={{ backgroundColor: mediumGrey, height: 40 }}>
                            <Text style={{ color: textDark, fontWeight: "900", paddingLeft: 10, marginTop: 10 }}>Please provide your signature :</Text>
                            <View>
                            </View>
                        </View>
                        
                                <View style={{ flexDirection: "column" }}>

                                    <SignatureCapture
                                        style={{
                                            flex: 1, height: 180,
                                            borderColor: '#000033',
                                            borderWidth: 1,
                                        }}
                                        ref={sign}
                                        onSaveEvent={_onSaveEvent}
                                        onDragEvent={_onDragEvent}
                                        // saveImageFileInExtStorage={true}
                                        showNativeButtons={false}
                                        showTitleLabel={false}

                                        minStrokeWidth={8}
                                        maxStrokeWidth={4}
                                        viewMode={"portrait"} />
                                        

                                    <View style={{ marginBottom: 10, flexDirection: 'row', marginLeft: '30%', backgroundColor: mainWhite }}>
                                        <TouchableOpacity onPress={() => reset()}
                                            style={{ width: 100, height: 40, backgroundColor: textGrey, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text style={{ textAlign: 'center' }}>Reset</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity onPress={() => saveSign()}
                                            style={{ marginLeft: 10, width: 100, height: 40, backgroundColor: textGrey, justifyContent: 'center', alignItems: 'center' }}>
                                            {visibleModal2 ? (
                                                <ActivityIndicator size="small" color={mainGrey}></ActivityIndicator>
                                            ) : (
                                                    <Text style={{ textAlign: 'center' }}>Save</Text>
                                                )}
                                        </TouchableOpacity>

                                    </View>

                                </View>

                           
                    </View>

                </View>
                 )}
                <View style={{ flex: 0.6, paddingHorizontal: 10,  }}>
                    <Text>Comments</Text>
                    <View style={{marginTop:10, flexDirection: 'row', paddingHorizontal: 10, borderRadius: 20, backgroundColor: "#E0E0E0", height: 45 }}>
                        <TextInput
                            underlineColorAndroid="transparent"
                            style={{ color: mainGrey, fontSize: 14, width: "90%",alignItems:'center' }}
                            autoCapitalize='none'
                            multiline={true}
                            value={comment}
                            numberOfLines={3}
                            placeholder="Add a Comment"
                            onChangeText={txt => setComment(txt)}
                        />
                        {loader ? (
                            <ActivityIndicator size="small" color={mainWhite}></ActivityIndicator>
                        ) : (
                                <TouchableOpacity onPress={() => add_commentapi()}>
                                    <Icon color={mainGrey}
                                        style={{ fontWeight: 'bold', fontSize: 30, marginTop: 6 }} name="send" />
                                </TouchableOpacity>
                            )}
                    </View>
                    {comment_data !== null ? (
                        <View>
                            {
                                comment_data.map((item1, key) => {
                                    let date_val = new Date(item1.created_date_time)
                                    let formatted_date = moment(date_val).format('YYYY-MM-DD')
                                    return (
                                        <TouchableOpacity
                                            style={{
                                                flexDirection: 'column', borderRadius: 20, height: 80,
                                                flex: 1, backgroundColor: mainWhite, marginTop: 15, borderWidth: 0.2, borderColor: darkGrey
                                            }}>
                                            <View style={{ marginBottom: 10, flexDirection: 'column', flex: 1, backgroundColor: mainWhite, marginTop: 10, marginLeft: 5, marginRight: 5, }}>
                                                <View style={{ flexDirection: 'row' }}>
                                                    {/* <Text style={{ paddingLeft: 20, fontSize: 16, alignSelf: 'center', width: "60%" }}>{item1.created_by}</Text> */}

                                                </View>
                                                <View style={{ backgroundColor: mainWhite, flex: 4, marginRight: 10, flexDirection: 'column', }}>
                                                    <Text numberOfLines={3}
                                                    style={{ color: mainGrey, fontSize: 14, marginTop: 10, paddingLeft: 20, }}>{item1.comment}</Text>
                                                </View>
                                                <View style={{ flexDirection: 'row' }}>
                                                    <View style={{ flex: 0.9 }} />
                                                    <View style={{ flexDirection: 'row' }}>
                                                        {/* <TouchableOpacity onPress={() => call_edit(item1)}
                                                            style={{ justifyContent: 'center', alignItems: 'center', width: 60, height: 25, backgroundColor: mainWhite, borderRadius: 20, borderWidth: 0.3, borderColor: mainGrey }}>
                                                            <Text style={{ textAlign: 'center' }}>Edit</Text>
                                                        </TouchableOpacity> */}
                                                        <TouchableOpacity onPress={() => call_deleteapi(item1)}
                                                            style={{ marginLeft: 10, justifyContent: 'center', alignItems: 'center', width: 60, height: 25, backgroundColor: mainWhite, borderRadius: 20, borderWidth: 0.3, borderColor: mainGrey }}>
                                                            <Text style={{ textAlign: 'center' }}>Delete</Text>
                                                        </TouchableOpacity>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                        </View>
                    ) : (
                            null
                        )}
                </View>
                <View style={{ flex: 0.8, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                    {/* <TouchableOpacity onPress={() => saveSign()}
                        style={{ borderRadius: 5, width: 170, height: 40, backgroundColor: darkkBlue, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: mainWhite }}>Submit</Text>
                    </TouchableOpacity> */}
                </View>
            </View>

            <Modal1
                visible={visibleModal}
                onTouchOutside={() => {
                    setVisible(false)
                }}
                onRequestClose={() => {
                    setVisible(false)
                }}
            >
                <ModalContent style={{ width: "100%" }}>
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center', }}>

                            <View style={{ flexDirection: 'column', marginLeft: 20, marginRight: 20 }}>
                                <TouchableOpacity onPress={() => this.ProfilePictureDelete(login_credentialschurch.id)}
                                    style={{ flexDirection: 'row', }}>

                                    <TextInput
                                        underlineColorAndroid="transparent"
                                        style={{ color: mainGrey, fontSize: 14, width: 250 }}
                                        autoCapitalize='none'
                                        multiline={true}
                                        value={cdata}
                                        numberOfLines={3}
                                        autoCorrect={true} autoFocus={true}
                                        placeholder="Add a Comment"
                                        onChangeText={txt => setCData(txt)}
                                    />
                                </TouchableOpacity>

                            </View>

                            <View style={{ flexDirection: 'row', marginTop: '10%' }}>
                                <TouchableOpacity onPress={() => setVisible(false)}
                                    style={{ borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: 100, height: 40, borderWidth: 0.3, borderColor: mainGrey }}>
                                    <Text>Cancel</Text>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => call_edit_apis()}
                                    style={{
                                        marginLeft: 20, borderRadius: 10, width: 100, justifyContent: 'center', alignItems: 'center',
                                        height: 40, borderWidth: 0.3, borderColor: mainGrey
                                    }}>
                                    {visibleModal1 ? (
                                        <ActivityIndicator size="small" color={mainGrey}></ActivityIndicator>
                                    ) : (
                                            <Text>Save</Text>
                                        )}
                                </TouchableOpacity>

                            </View>

                        </View>
                    </View>
                </ModalContent>
            </Modal1>



        </ScrollView>


    )
}


const mapStateProps = (state) => {
    const { schedule_enviro } = state

    return { schedule_enviro }
}







export default connect(mapStateProps)(AddMedia)

