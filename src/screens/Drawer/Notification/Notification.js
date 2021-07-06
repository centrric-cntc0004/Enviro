import React, { useState } from 'react'
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator,RefreshControl, TextInput } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { mainWhite, textBlue, textGrey, mediumGrey, darkGrey, mainGrey, mainBlue, lightGrey } from '../../../common/Colors'
import { ClientImage } from '../../../common/Images'
import { connect } from 'react-redux'
import { BASE_IMAGE_URL } from '../../../store/endpoint'
import Modal from 'react-native-modal'
import { fetch_notify_list, create_notify, delete_notify, fetch_member_list, read_notify } from './common/action'
import DocumentPicker from 'react-native-document-picker';
import { team_list } from '../../../screens/Drawer/Team/action'
import Icon from 'react-native-vector-icons/dist/FontAwesome5'

let memberarr = []
let memid = []
import ModalDropdown from 'react-native-modal-dropdown-v2'


const Notification = ({ navigation, notification_list, isLoading, dispatch, team_list, memberarray }) => {



    const [visible, setVisible] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState("")
    const [name, setname] = useState('')
    const[loadData,setLoadData]=useState(false)

    const [loader, setLoader] = useState(false)

    if (team_list) {
        memberarr = []
        team_list.map((item) => {
            const { name } = item
            return (
                memberarr.push(name)
            )
        })

    }
    let button_enable = false
    if (title && description && memid.length!==0 && file!=="") {
        button_enable = true
    } else {
        button_enable = false
    }
    const deleteapi = (item) => {
        const success = (res) => {

            fetch_notify_list(1)

        }

        const failed = (res) => {


        }


        dispatch(delete_notify(1, item.id, success, failed))


    }

    const pick_document = async () => {
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.pdf],
            });
            console.log(
                res.uri,
                res.type, // mime type
                res.name,
                res.size
            );
            setFile(res)
            setname(res.name)
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    const onSelect = (index) => {

        memid.push(team_list[index].id);
        if (memberarray === undefined) {
            dispatch(fetch_member_list(team_list[index].name + ','))

        } else {
            dispatch(fetch_member_list(memberarray.concat(team_list[index].name + ',')))

        }

    }

    const onNextNavigate = (item) => {
        // dispatch(read_notify(1, item.id))
        navigation.navigate("enviro-notification", { items: item })
    }
    const call_apicompleted=()=>{
        setLoadData(true)
        dispatch(fetch_notify_list(1))
        setLoadData(false)

    }

    const onOkeyButton = () => {
        setLoader(true)
        let postData = new FormData()
        postData.append('title', title)
        postData.append('description', description)
        // postData.append('members', "")
        // if()
        if (memid.length === 0) {

        } else {
            for (let j = 0; j < memid.length; j++) {
                postData.append('members', memid[j])
            }
        }

        if (file) {
            postData.append('file_attachment', file)

        } else {

        }


        const success = (res) => {
            setLoader(false)
            dispatch(fetch_member_list())

            setTitle('')
            setDescription('')
            setVisible(false)
            setname('')

            fetch_notify_list(1)



        }

        const failed = (res) => {
            setVisible(false)
            setLoader(false)

            setTitle('')
            setDescription('')

        }


        dispatch(create_notify(postData, success, failed))


    }

    const onCancelButton = () => {

        memid = []
        dispatch(fetch_member_list())
        setDescription('')
        setTitle('')

        setVisible(false)
    }
    if (isLoading) {
        return (
            <View style={{ flex: 1, backgroundColor: mainWhite, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: 10, backgroundColor: textGrey }}>

                </View>
                <ActivityIndicator size="large" color={mainBlue}></ActivityIndicator>
            </View>
        )

    } else {

        return (
            <ScrollView style={{ flex: 1, backgroundColor: mainWhite }}
            refreshControl={
                <RefreshControl refreshing={loadData} onRefresh={call_apicompleted} />
            }>
                <View style={{ flex: 1, backgroundColor: mainWhite }}>
                    <View style={{ height: 10, backgroundColor: textGrey }}>

                    </View>
                    <View style={{ flexDirection: 'row' ,marginTop:15}}>
                        <View style={{ flex: 1, }}>

                        </View>
                        <TouchableOpacity onPress={() => setVisible(true)}
                            style={{
                                flex: 0.4,
                                backgroundColor: 'orange',
                                marginLeft: 30,
                                marginTop: 10,
                                marginRight: 20,
                                marginBottom: 10,
                                alignItems: 'center', justifyContent: 'center', alignItems: 'center',
                                flexDirection: 'row', borderRadius: 20, height: 40, borderWidth: 0.5, backgroundColor: mainWhite, borderColor: mainBlue
                            }}>

                            <Text style={{ color: mainBlue, textAlign: 'center' }} >Add New +</Text>
                        </TouchableOpacity>
                    </View>


                    {/* <Text style={{ color: mainGrey, paddingLeft: 20, paddingTop: 10 }}>View</Text> */}
                    {notification_list.length > 0 ? (
                        <FlatList

                            data={notification_list}
                            renderItem={({ item: rowData }) => {
                                if (rowData.dp) {
                                    var propic = { uri:  rowData.dp }
                                } else {
                                    var propic = ClientImage
                                }
                                return (
                                    <TouchableOpacity
                                        // onLongPress={() => deleteapi(rowData)}
                                        onPress={() => onNextNavigate(rowData)}>
                                        <View style={{
                                            flexDirection: 'row', height: 90, backgroundColor: "#e9f8fc", marginLeft: 10, marginRight: 10,
                                            marginTop: 10, borderWidth: 0.3, borderColor: darkGrey, borderRadius: 10,
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
                                                            <Text style={{ paddingLeft: 10, paddingTop: 5, color: mainGrey, fontSize: 14 }}>{rowData.title}</Text>
                                                            <Text numberOfLines={1}
                                                                style={{ paddingLeft: 10, color: mainGrey, textAlign: 'justify', fontSize: 14 }}>{rowData.created_by}</Text>
                                                        </View>
                                                    </View>
                                                    <View style={{ flex: 1, flexDirection: 'column', backgroundColor: "#e9f8fc", borderRadius: 30, }}>
                                                        <View style={{ marginLeft: 50, marginRight: 10, flexDirection: 'column', marginTop: 20, justifyContent: 'center', alignItems: 'center', }}>
                                                            <View style={{ marginTop: 5, justifyContent: 'center', alignItems: 'center', width: 75, height: 30, borderWidth: 1, borderColor: textBlue, borderRadius: 20 }}>
                                                                <Text style={{ color: textBlue, textAlign: 'justify', fontSize: 14 }}>View</Text>
                                                            </View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>

                                )
                            }}
                        />
                    ) : (
                            <View style={{ marginTop: 250, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 16, color: mainGrey, alignSelf: 'center' }}> No Data Found </Text>
                            </View>
                        )}

                </View>
                <Modal isVisible={visible}>
                    <View style={{ backgroundColor: lightGrey, padding: 10, borderRadius: 10, }}>
                        <View style={{ backgroundColor: mainWhite, borderRadius: 10, padding: 5, }}>




                            <View style={{ marginTop: 10, paddingHorizontal: 10, marginBottom: 10 }}>
                                <View style={{ height: 35, borderRadius: 5, backgroundColor: mainWhite, justifyContent: 'center', borderWidth: 0.3, borderColor: mainGrey }}>
                                    <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15 }}>

                                        <TextInput
                                            style={{ padding: 0, fontSize: 14, color: mainGrey, }}
                                            placeholder="Title"
                                            maxLength={16}
                                            value={title}
                                            onSubmitEditing={() => {

                                            }}
                                            onChangeText={txt => {
                                                setTitle(txt)

                                            }}
                                        />
                                    </View>
                                </View>
                            </View>
                            <View style={{ marginTop: 10, paddingHorizontal: 10, marginBottom: 10 }}>
                                <View style={{ height: 100, borderRadius: 5, backgroundColor: mainWhite, justifyContent: 'center', borderWidth: 0.3, borderColor: mainGrey }}>
                                    <View style={{ flex: 1, paddingHorizontal: 15 }}>

                                        <TextInput
                                            style={{ padding: 0, fontSize: 14, color: mainGrey, }}
                                            placeholder="Description"
                                            numberOfLines={5}
                                            multiline={true}
                                            value={description}
                                            onSubmitEditing={() => {

                                            }}
                                            onChangeText={txt => {
                                                setDescription(txt)

                                            }}
                                        />
                                    </View>
                                </View>
                            </View>

                            <View style={{ marginTop: 10, paddingHorizontal: 10, marginBottom: 10 }}>

                                <View style={{ height: 35, borderRadius: 20, justifyContent: 'center', borderWidth: 0.3, borderColor: mainGrey }}>



                                    <ModalDropdown
                                        options={memberarr}
                                        defaultIndex={0}
                                        textStyle={{ color: mainGrey, fontSize: 14, }}
                                        dropdownStyle={{ width: 200, height: 200 }}
                                        dropdownTextStyle={{ color: mainGrey, fontSize: 14, paddingLeft: 10 }}
                                        dropdownTextHighlightStyle={{ color: mainGrey, fontSize: 14, paddingLeft: 10 }}
                                        onSelect={(index) => onSelect(index)}>

                                        <View style={{ alignItems: 'center', flexDirection: 'row', }}>
                                            <View style={{ flex: 5 }}>
                                                {memberarray === undefined ? (
                                                    <Text
                                                        style={{ opacity: 0.6, color: mainGrey, fontSize: 14, paddingLeft: 20 }} >Add Member</Text>
                                                ) : (
                                                        <Text numberOfLines={1}
                                                            style={{ padding: 0, fontSize: 14, color: mainGrey, paddingLeft: 20 }} >{memberarray}</Text>

                                                    )}
                                            </View>

                                            <View style={{ flex: 0.5 }}>
                                                <Icon name="chevron-down" size={16} color={mainGrey} />
                                            </View>
                                        </View>
                                    </ModalDropdown>
                                    {/* ) : (

                                        <TouchableOpacity onPress={() => setMemVisible(true)}
                                            style={{ justifyContent: 'center', alignItems: 'center', flex: 1, paddingHorizontal: 15 }}>

                                            <Text style={{ paddingHorizontal: 10, color: mainGrey }}>Add Members +</Text>
                                        </TouchableOpacity>
                                    )} */}
                                </View>
                            </View>

                            <TouchableOpacity onPress={() => pick_document()}
                                style={{ paddingHorizontal: 10, marginBottom: 10 }}>

                                <View style={{ height: 35, borderRadius: 20, justifyContent: 'center', borderWidth: 0.3, borderColor: mainGrey }}>

                                    {name ? (
                                        <Text numberOfLines={1}
                                            style={{ paddingHorizontal: 20, padding: 0, fontSize: 14, color: mainGrey, }}>{name}</Text>

                                    ) : (

                                            <Text style={{ paddingHorizontal: 20, opacity: 0.6, padding: 0, fontSize: 14, color: mainGrey, }}>Add File +</Text>
                                        )}
                                </View>
                            </TouchableOpacity>

                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 15 }}>
                            <TouchableOpacity onPress={() => onCancelButton()}>
                                <Text style={{ fontSize: 17, paddingRight: 15 }}>Cancel</Text>
                            </TouchableOpacity>
                            {button_enable === true ? (
                                <TouchableOpacity onPress={() => onOkeyButton()}>
                                    {loader ? (
                                        <ActivityIndicator size="small" color={mainGrey}></ActivityIndicator>
                                    ) : (
                                            <Text style={{ fontSize: 17, paddingRight: 15 }}>Ok</Text>
                                        )}
                                </TouchableOpacity>
                            ) : (
                                    <View >

                                        <Text style={{ opacity: 0.6, fontSize: 17, paddingRight: 15 }}>Ok</Text>

                                    </View>
                                )}
                        </View>
                    </View>
                </Modal>

            </ScrollView>
        )
    }
}
const mapStateToProps = (state) => {
    const { notification_list, isLoading, memberarray } = state.notifications
    const { team_list } = state.team

    return { notification_list, isLoading, team_list, memberarray }

}



export default connect(mapStateToProps)(Notification)



