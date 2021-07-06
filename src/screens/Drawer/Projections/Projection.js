import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Dimensions, RefreshControl, TextInput, ActivityIndicator, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { mainWhite, darkGrey, mediumGrey, textBlue, mainBlue, mainGrey, textGrey, lightGrey, textDark } from '../../../common/Colors'
import { ClientImage } from '../../../common/Images'
import { create_news, fetch_news_list, fetch_member_name, read_news } from './common/actions'
import Modal from 'react-native-modal'
import DocumentPicker from 'react-native-document-picker';
import { connect } from 'react-redux'
import { team_list } from '../../../screens/Drawer/Team/action'
import Icon from 'react-native-vector-icons/dist/FontAwesome5'
import ModalDropdown from 'react-native-modal-dropdown-v2'
import { fetch_notify_list, select_data, create_notify, delete_notify, fetch_member_list, read_notify } from '../../Drawer/Notification/common/action'
import Notifications from './Notifications'
let memberarr = []
let memid = []
import { BASE_IMAGE_URL,OHS_AND_S, FILES_FOLDERS_SEARCH,OHS_AND_S_FILE_DELETE, OHS_AND_S_FOLDER_CREATE, OHS_AND_S_FOLDERS,ACCOUNTS_FILES_FOLDER_GET
    ,INTRANET_FOLDER_EDIT ,OHS_AND_S_FILE_ADD,INTRANET_FILES_RENAME,OHS_AND_S_FOLDER_DELETE} from '../../../store/endpoint'
import MainFolder from '../Intranet/components/MainFolder'
import NoDataContent from '../../../common/NoDataContent'
const Projection = ({ fetch_news, fetch_data, notification_list, fetch_news_data, read_new_data, navigation, create_news_fx, news_list, memberarray, isLoading, team_list_fx, team_list, fetch_member }) => {


    console.log("news_list" + JSON.stringify(news_list))
    let dummyData = ['News', 'Notification']
    const [selected, setSelected] = useState(dummyData[0])


    const [visible, setVisible] = useState(false)
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [file, setFile] = useState("")
    const [loader, setLoader] = useState(false)
    const [name, setname] = useState('')
    const [loadData, setLoadData] = useState(false)
    useEffect(() => {
        team_list_fx()
        return () => team_list_fx.remove
    }, [team_list_fx]);


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
    if (title && description) {
        button_enable = true
    } else {
        button_enable = false
    }


    const onNextNavigate = (item) => {
        // read_new_data(1, item.id)
        navigation.navigate("enviro-detail", { items: item })
    }
    const onOkeyButton = () => {
        setLoader(true)
        let postData = new FormData()
        postData.append('title', title)
        postData.append('description', description)
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

            setTitle('')
            setDescription('')
            setVisible(false)
            setname('')
            fetch_news_list(1)
            fetch_member()
            memid = []




        }

        const failed = (res) => {
            setLoader(false)

            setVisible(false)

            setTitle('')
            setDescription('')

        }

        console.log("formdata" + JSON.stringify(postData))
        create_news_fx(postData, success, failed)


    }

    const onCancelButton = () => {

        memid = []
        fetch_member()
        setDescription('')
        setTitle('')

        setVisible(false)
    }

    const onSelect = (index) => {


        memid.push(team_list[index].id);
        if (memberarray === undefined) {
            fetch_member(team_list[index].name + ',')

        } else {
            fetch_member(memberarray.concat(team_list[index].name + ','))

        }

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

    const call_apicompleted = () => {
        fetch_news_data(1)
    }
    const onOkeyButton1 = () => {
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

            // fetch_notify_list(1)



        }

        const failed = (res) => {
            setVisible(false)
            setLoader(false)

            setTitle('')
            setDescription('')

        }


        fetch_news(postData, success, failed)


    }

    if (isLoading)
        return (
            <View style={{ flex: 1, backgroundColor: mainWhite, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ height: 10, backgroundColor: textGrey }}>

                </View>
                <ActivityIndicator size="large" color={mainBlue}></ActivityIndicator>
            </View>
        )


    return (
        <ScrollView style={{ flex: 1, backgroundColor: lightGrey }}
            refreshControl={
                <RefreshControl refreshing={loadData} onRefresh={call_apicompleted} />
            }>
            <View style={{ flex: 1, backgroundColor: lightGrey, paddingHorizontal: 10 }}>



                <View style={{ height: 13, backgroundColor: textGrey }}>

                </View>

                <View style={{ marginTop: 20, flexDirection: 'row', backgroundColor: mainWhite, borderRadius: 20, height: 40, borderWidth: 0.3, borderColor: darkGrey }}>
                    {
                        dummyData.map((item, key) => {

                            if (item === selected) {

                                return (


                                    <View style={{ marginTop: 1, marginBottom: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: mainBlue, flex: 4.5, }}>
                                        <Text style={{ fontSize: 13, color: mainWhite, }}>{item}</Text>
                                    </View>

                                )
                            } else {
                                return (
                                    <TouchableOpacity onPress={() => setSelected(item)} style={{ marginTop: 2, marginBottom: 4, borderRadius: 20, justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite, flex: 4.5, }}>
                                        <Text style={{ fontSize: 13, color: mainGrey, }}>{item}</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })
                    }
                </View>

                {selected === "News" ? (
                    <View>
                        <View style={{ flexDirection: 'row', marginTop: 15 }}>
                            <View style={{ flex: 1, }}>

                            </View>

                            <TouchableOpacity onPress={() => setVisible(true)}
                                style={{
                                    flex: 0.4,
                                    backgroundColor: 'orange',
                                    marginLeft: 30,
                                    marginTop: 10,
                                    marginBottom: 10,
                                    alignItems: 'center', justifyContent: 'center', alignItems: 'center',
                                    flexDirection: 'row', borderRadius: 20, height: 40, borderWidth: 0.5, backgroundColor: mainWhite, borderColor: mainBlue
                                }}>

                                <Text style={{ color: mainBlue, textAlign: 'center' }} >Add New +</Text>
                            </TouchableOpacity>
                        </View>

                        {news_list.length > 0 ? (
                            <FlatList style={{}}
                                key={'#'}
                                data={news_list}
                                renderItem={({ item: rowData }) => {
                                    if (rowData.dp) {
                                        var propic = { uri: BASE_IMAGE_URL + rowData.dp }
                                    } else {
                                        var propic = ClientImage
                                    }
                                    console.log(rowData.title)
                                    if (rowData.title === "null") {
                                        var info = ""
                                    } else {
                                        var info = rowData.title;
                                    }
                                    return (

                                        <TouchableOpacity
                                            //  onLongPress={() => call_deleteapi(rowData)}
                                            onPress={() => onNextNavigate(rowData)}>
                                            <View style={{
                                                flexDirection: 'row', height: 90, backgroundColor: "#e9f8fc",
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
                                                                <Text style={{ paddingLeft: 10, paddingTop: 5, color: mainGrey, textAlign: 'justify', fontSize: 14 }}>{info}</Text>

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
                                <View style={{ marginTop: '50%', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                               <NoDataContent/>
                                </View>
                            )}

<MainFolder navigation={navigation}
                         APIURL={OHS_AND_S} title={'OHS & S'} FILEEDIT={INTRANET_FILES_RENAME}
                    FOLDEREDIT={INTRANET_FOLDER_EDIT} FOLDERADD={OHS_AND_S_FILE_ADD} FOLDERCREATE={OHS_AND_S_FOLDER_CREATE} 
                    FOLDERDELETE={OHS_AND_S_FOLDER_DELETE} FILEDELETE={OHS_AND_S_FILE_DELETE}
                    SELETPATH={"ohs"} 
                    />
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
                       
                    </View>
                ) : (
                        <Notifications navigation={navigation} />
                    )}
            </View>
        </ScrollView>


    )

}
const mapStateToProps = (state) => {
    const { news_list, isLoading, memberarray } = state.ohs
    const { team_list } = state.team
    const { notification_list, } = state.notifications

    return { news_list, isLoading, team_list, memberarray, notification_list }

}

const mapDispatchToProps = (dispatch) => {
    return {
        create_news_fx: (data, success, failed) => dispatch(create_news(data, success, failed)),
        team_list_fx: () => dispatch(team_list()),
        fetch_member: (data) => dispatch(fetch_member_name(data)),
        read_new_data: (pageno, id) => dispatch(read_news(pageno, id)),
        fetch_news_data: (page) => dispatch(fetch_news_list(page)),
        fetch_data: (data) => dispatch(select_data(data)),

        fetch_news: (data, success, failed) => dispatch(create_notify(data, success, failed)),


    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projection)






