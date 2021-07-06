import React, { useState } from 'react'
import { View, Text, Image, TextInput, ActivityIndicator, TouchableOpacity,Alert } from 'react-native'
import { mainWhite, textGrey, mediumGrey, mainGrey, } from '../../../common/Colors'
import { ClientImage } from '../../../common/Images'
import { BASE_IMAGE_URL } from '../../../store/endpoint'
import moment from "moment"
let formatted_date = ""
import { edit_news, delete_notify, delete_news } from './common/actions'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'



const OhsDetails = ({ navigation, route, dispatch }) => {

    let desc = route.params.items.description
    let titl = ""
    if(route.params.items.title==="null"){
        titl=""
    }else{
        titl=route.params.items.title
    }

    const [description, setDescription] = useState(desc)
    const [title, setTitle] = useState(titl)

    const [loader, setLoader] = useState(false)

    if (route.params.items.dp) {
        var propic = { uri: BASE_IMAGE_URL + route.params.items.dp }
    } else {
        var propic = ClientImage
    }

    if (route.params.items.created_date_time) {
        let date_val = new Date(route.params.items.created_date_time)
        formatted_date = moment(date_val).format('YYYY-MM-DD')
    }

    let button_enable = false
    if (desc !== description || titl!==title) {
        button_enable = true
    } else {
        button_enable = false
    }



    const call_editapi = () => {
        setLoader(true)
        let postData = new FormData()
        postData.append('title', title)
        postData.append('description', description)
        if (route.params.items.file_attachment === null) {

        } else {
            postData.append('file_attachment', route.params.items.file_attachment)
        }

        const success = (res) => {

            setLoader(false)

        }

        const failed = (res) => {
            setLoader(false)

        }

        dispatch(edit_news(1, route.params.items.id, postData, success, failed))

    }


    const call_deleteapi = () => {
        Alert.alert(
            "Confirmation",
            "Are you sure to delete?",
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("kkk"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => call_api() }
            ],
            { cancelable: false }
        );
    }
    const call_api = () => {

        setLoader(true)

        const success = (res) => {
            navigation.pop()
            setLoader(false)

        }

        const failed = (res) => {
            setLoader(false)

        }


        dispatch(delete_news(1, route.params.items.id, success, failed))


    }
    return (
        <View style={{ flex: 1, backgroundColor: mainWhite }}>
            <View style={{ height: 10, backgroundColor: textGrey }}>

            </View>
            <View style={{
                backgroundColor: "#e9f8fc", marginLeft: 10, marginRight: 10,
                marginTop: 10, flex: 0.5, flexDirection: "column", height: 100,
            }}>
                <View style={{
                    backgroundColor: "#e9f8fc",
                    flexDirection: 'row', height: 80
                }}>
                    <View style={{ flex: 1, backgroundColor: "#e9f8fc", marginTop: 10, marginBottom: 10, marginLeft: 5 }}>
                        <View style={{ flex: 1, marginLeft: 10 }}>
                            <Image style={{ marginLeft: 2, height: 50, width: 50, borderRadius: 25, marginTop: 10 }} source={propic} />
                        </View>
                    </View>
                    <View style={{ borderRadius: 30, marginTop: 3, marginBottom: 2, flex: 4, flexDirection: 'column', backgroundColor: mediumGrey }}>
                        <View style={{ flex: 1.3, flexDirection: 'row' }}>
                            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "#e9f8fc" }}>
                                <View style={{ flexDirection: 'column', marginTop: 15 }}>
                                   
                                         <TextInput
                                         underlineColorAndroid="transparent"
                                         style={{ color: mainGrey, fontSize: 14,paddingLeft: 10,  }}
                                         autoCapitalize='none'
                                         multiline={true}
                                         value={title}
                                         // editable={false}
                                         placeholder="title"

                                         onChangeText={txt => setTitle(txt)}
                                     />
                                   
                                    <Text numberOfLines={1}
                                        style={{ paddingLeft: 10, color: mainGrey, textAlign: 'justify', fontSize: 14 }}>{route.params.items.created_by}</Text>
                                </View>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "#e9f8fc", borderRadius: 30, }}>
                                <View style={{ marginLeft: 50, marginRight: 10, flexDirection: 'column', marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                                    <Text style={{ color: mainGrey, textAlign: 'justify', fontSize: 12 }}>{formatted_date}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <TextInput
                    underlineColorAndroid="transparent"
                    style={{ color: mainGrey, fontSize: 14, }}
                    autoCapitalize='none'
                    multiline={true}
                    value={description}
                    // editable={false}
                    numberOfLines={3}
                    onChangeText={txt => setDescription(txt)}
                />
            </View>


            <View style={{ justifyContent: 'center', alignItems: "center", flex: 0.4, flexDirection: 'row', marginLeft: 10, marginRight: 10, marginBottom: 20 }}>

                {button_enable === true ? (
                    <TouchableOpacity onPress={() => call_editapi()}
                        style={{ marginLeft: 20, justifyContent: 'center', alignItems: 'center', width: 100, height: 35, borderWidth: 0.3, borderColor: mainGrey, borderRadius: 40 }}>
                        {loader ? (
                            <ActivityIndicator size="small" color={mainGrey} ></ActivityIndicator>
                        ) : (
                                <Text>Edit</Text>
                            )}
                    </TouchableOpacity>
                ) : (
                        <View
                            style={{ opacity: 0.6, marginLeft: 20, justifyContent: 'center', alignItems: 'center', width: 100, height: 35, borderWidth: 0.3, borderColor: mainGrey, borderRadius: 40 }}>

                            <Text>Edit</Text>

                        </View>
                    )}
                <TouchableOpacity onPress={() => call_deleteapi()}
                    style={{ marginLeft: 20, justifyContent: 'center', alignItems: 'center', width: 100, height: 35, borderWidth: 0.3, borderColor: mainGrey, borderRadius: 40 }}>
                    <Text>Delete</Text>
                </TouchableOpacity>

            </View>

            <View style={{ flex: 0.3 }}>

            </View>
        </View>
    )

}

const mapStateToProps = (state) => {
    const { news_list, isLoading } = state.ohs
    return { news_list, isLoading }

}



export default connect(mapStateToProps)(OhsDetails)








