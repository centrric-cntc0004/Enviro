

import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View, Text, TouchableOpacity, ActivityIndicator, Linking, RefreshControl, TextInput, Alert
} from 'react-native'
import { lightGreen, lightGrey, mainBlack, mainGrey, textBlack, mainBlue, mainWhite, textGrey, darkGrey, mediumGrey } from '../../../../common/Colors'
import { BASE_IMAGE_URL, FILES_FOLDERS_SEARCH, FILES_FILE_SEARCH, OHS_AND_S_FOLDERS } from '../../../../store/endpoint'
import Api from '../../../../store/api'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/Entypo'
import { fetch_folders_inner_files, fetch_folders_files, add_folder, edit_folder, delete_folder, fetch_ohs_folders_files, fetch_ohs_folders_inner_files, search_folder_list } from '../components/common/action'
import { folder_details } from '../../Team/action'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
let a = 0
import Toast from 'react-native-simple-toast';

function FileModal({

    modalStatus,
    modalAction,
    status,
    id,
    MailBCC,
    setMailBCC,
    MailCC,
    setMailCC,
    MailSubject,
    setMailSubject,
    MailBody,
    setMailBody,
    MainCCText,
    setMainCCText,
    MailBCCText,
    setMailBCCText,
    quoteRegisterationApi,
    loaderA, intranet_enviro, dispatch,
    loaderB }) {



    const { folders_files, isLoading, datafolder, dataFile } = intranet_enviro
    console.log("skjdfhkjshfkds" + JSON.stringify(dataFile))
    let dummyData = ['Folders', 'Files']
    const [selected, setSelected] = useState(dummyData[0])
    const [loadData, setLoadData] = useState(false)
    const [loaderC, setLoaderC] = useState(false)
    const [titleEdit, setTitleEdit] = useState("")
    const [idEdit, setIdEdit] = useState("")
    const [docname, setDocname] = useState("")
    const [docuri, setDocuri] = useState()



    const [folderType, setFolderType] = useState('general')



    const [data, setData] = useState(datafolder)
    const [dataB, setDataB] = useState(dataFile)
    const [loader, setLoader] = useState(true)
    const [isVisible, setVisible] = useState(false)
    const [isVisibleEdit, setVisibleEdit] = useState(false)

    const [title, setTitle] = useState("")

    let button_enable = false
    if (title) {
        button_enable = true
    } else {
        button_enable = false

    }


    // const { files, folders } = response.folders[0]
    //         setFoldersData(folders)
    //         setFilesData(files)
    const call_image = (link) => {
        Linking.openURL(link)
    }


    const call_nextapi = (item) => {
        dispatch(fetch_ohs_folders_inner_files(item.id))
        navigation.navigate("enviro-NewFolders", { name: item.name, id: item.id })
    }
    useEffect(() => {

        const fetch_initail_folderz = () => {
            let api_url = `${OHS_AND_S_FOLDERS}${1}/`
            console.log(api_url)
            Api('get', api_url).then(response => {
                console.log('FILES-FOLDERS', response)
                const { files, folders, type } = response.folders[0]
                setData(folders)
                setFolderType(type ? type : 'general')
                setDataB(files)
            })
        }
        fetch_initail_folderz()

        let loadingInterval = setInterval(() => {
            setLoader(false)
            clearInterval(loadingInterval)
        }, 4500)
        return () => {
            clearInterval(loadingInterval)
        }
    }, [OHS_AND_S_FOLDERS])
    const search_folder = (txt, foldertype) => {
        // dispatch(search_folder_list(txt))



        // Api('post-form', FILES_FOLDERS_SEARCH, data).then(response => {
        //     console.log("hjgjhghjgjh"+JSON.stringify(response))
        //     setData(response)
        // }

        if (txt == "") {
            fetch_initail_folder()
        } else {
            let data1 = new FormData()
            data1.append('key', txt)
            data1.append('folder_id', 1)
            data1.append('search_type', foldertype)

            Api('post-form1', FILES_FOLDERS_SEARCH, data1).then(response => {
                console.log("response" + JSON.stringify(response))
                if (response.status >= 400) {
                    setData([])
                } else if (response.status === 200) {
                    setData(response.data)

                }
            })

        }


        // )

    }
    const onCancelButton = () => {
        modalAction(false)
    }
    const onCancelButtonRename = () => {
        setVisibleEdit(false)
    }
    const fetch_initail_folder = () => {
        let api_url = `${OHS_AND_S_FOLDERS}${1}/`
        Api('get', api_url).then(response => {
            const { files, folders, type } = response.folders[0]
            setData(folders)
            setFolderType(type ? type : 'general')
            setDataB(files)

        })
    }

    const search_file = (txt, foldertype) => {
        // dispatch(search_folder_list(txt))



        // Api('post-form', FILES_FOLDERS_SEARCH, data).then(response => {
        //     console.log("hjgjhghjgjh"+JSON.stringify(response))
        //     setData(response)
        // }

        if (txt === "") {
            fetch_initail_folder()

        } else {
            let data1 = new FormData()
            data1.append('key', txt)
            data1.append('folder_id', 1)
            data1.append('search_type', foldertype)
            const success = (response) => {
            }

            const failed = (response) => {


            }

            console.log("ooo" + JSON.stringify(folders_files[0].files))

            Api('post-form1', FILES_FILE_SEARCH, data1, success, failed).then(response => {
                console.log("response" + JSON.stringify(response))
                if (response.status >= 400) {
                    setDataB([])
                } else if (response.status === 200) {
                    if (response.data) {
                        if (response.data.folders) {
                            if (response.data.folders[0].files) {
                                setDataB(response.data.folders[0].files)

                            }
                        }
                    }

                }
            })

        }


        // )
    }

    const fetchfiles = () => {
        setLoadData(true)
        dispatch(fetch_ohs_folders_files())
        setLoadData(false)

    }
    const calldelete = (id) => {
        Alert.alert(
            "Delete",
            "Are you sure?",
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => oncallDelete(id) },
            ]
        );


    }
    const oncallDelete = (id) => {

        const success = (response) => {
            setLoaderC(false)
            setVisible(false)

            dispatch(fetch_ohs_folders_files())
            Toast.showWithGravity('Deleted Successfully', Toast.SHORT, Toast.BOTTOM);

        }

        const failed = (response) => {
            setLoaderC(false)

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
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]
            );

        }

        dispatch(delete_folder(id, success, failed))


    }
    const onOkeyButton = () => {
        setLoaderC(true)
        let form_body = new FormData()
        form_body.append('name', title)
        if(status==="innerfolder"){
            form_body.append('parent_folder', id)

        }else{
            form_body.append('parent_folder', 1)

        }
        const success = (response) => {
            setLoaderC(false)
            modalAction(false)
            setTitle('')
            if(status==="innerfolder"){
                dispatch(fetch_ohs_folders_inner_files(id))

            }else{
                dispatch(fetch_ohs_folders_files())

            }

            Toast.showWithGravity('Added Successfully', Toast.SHORT, Toast.BOTTOM);

        }

        const failed = (response) => {
            setLoaderC(false)

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
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]
            );

        }

        dispatch(add_folder(form_body, success, failed))

    }
    const onOkeyButton1 = () => {
        setLoaderC(true)
        let form_body = new FormData()
        form_body.append('name', title)
        form_body.append('folder', idEdit)

        const success = (response) => {
            setLoaderC(false)
            setVisibleEdit(false)
            dispatch(fetch_ohs_folders_files())

            Toast.showWithGravity('Updated Successfully', Toast.SHORT, Toast.BOTTOM);

        }

        const failed = (response) => {
            setLoaderC(false)

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
                    { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]
            );

        }

        dispatch(edit_folder(idEdit, form_body, success, failed))

    }
    const callEdit = (unit) => {
        console.log("unit" + JSON.stringify(unit))
        setTitle(unit.name)
        setTitleEdit(unit.name)
        setIdEdit(unit.id)
        setVisibleEdit(true)

    }
    let button_enable_edit = false
    if (titleEdit !== title) {
        button_enable_edit = true
    } else {
        button_enable_edit = false

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
    if (loader)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: lightGrey }}>
                <ActivityIndicator size="large" color={mainBlue} />
            </View>
        )

    if (folders_files.length === 0)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: lightGrey }}>
                <Text style={{ fontSize: 14, color: mainGrey }}>No Data Found</Text>
            </View>
        )
    return (


        <Modal isVisible={modalStatus}>
            <View style={{ backgroundColor: lightGrey, padding: 10, borderRadius: 10, }}>
                <View style={{ backgroundColor: mainWhite, borderRadius: 10, padding: 5, marginTop: '5%' }}>

                    <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: 'bold' }}>New Folder</Text>


                    <View style={{ marginTop: '5%', paddingHorizontal: 10, marginBottom: 10 }}>
                        <View style={{ height: 35, borderRadius: 5, backgroundColor: mainWhite, justifyContent: 'center', borderWidth: 0.3, borderColor: mainGrey }}>
                            <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15 }}>
                              {title===""?(
                                   <TouchableOpacity onPress={() => uploadFolder()}
                                   style={{ justifyContent: 'center', alignItems: 'center', width: 100, height: 30, borderRadius: 5, borderWidth: 1, borderColor: mainGrey }}>
                                   <Text style={{ fontSize: 14, }}>Select File</Text>


                               </TouchableOpacity>
                              ):(
                                <TextInput
                                    style={{ padding: 0, fontSize: 14, color: mainGrey, }}
                                    placeholder="Untitled Folder"
                                    maxLength={16}
                                    value={title}
                                    onSubmitEditing={() => {

                                    }}
                                    onChangeText={txt => {
                                        setTitle(txt)

                                    }}
                                />
                                )}
                            </View>
                        </View>
                    </View>




                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 15 }}>
                    <TouchableOpacity onPress={() => onCancelButton()}>
                        <Text style={{ fontSize: 17, paddingRight: 15 }}>Cancel</Text>
                    </TouchableOpacity>
                    {button_enable === true ? (
                        <TouchableOpacity onPress={() => onOkeyButton()}>
                            {loaderC ? (
                                <ActivityIndicator size="small" color={mainGrey}></ActivityIndicator>
                            ) : (
                                    <Text style={{ fontSize: 17, paddingRight: 15 }}>Create</Text>
                                )}
                        </TouchableOpacity>
                    ) : (
                            <View >

                                <Text style={{ opacity: 0.6, fontSize: 17, paddingRight: 15 }}>Create</Text>

                            </View>
                        )}
                </View>
            </View>
        </Modal>
        //     <Modal isVisible={isVisibleEdit}>
        //         <View style={{ backgroundColor: lightGrey, padding: 10, borderRadius: 10, }}>
        //             <View style={{ backgroundColor: mainWhite, borderRadius: 10, padding: 5,marginTop:'5%' }}>

        //               <Text style={{paddingLeft:10, fontSize:16,fontWeight:'bold'}}>Rename</Text>


        //                 <View style={{ marginTop: '5%', paddingHorizontal: 10, marginBottom: 10 }}>
        //                     <View style={{ height: 35, borderRadius: 5, backgroundColor: mainWhite, justifyContent: 'center', borderWidth: 0.3, borderColor: mainGrey }}>
        //                         <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15 }}>

        //                             <TextInput
        //                                 style={{ padding: 0, fontSize: 14, color: mainGrey, }}
        //                                 placeholder="Untitled Folder"
        //                                 maxLength={16}
        //                                 value={title}
        //                                 onSubmitEditing={() => {

        //                                 }}
        //                                 onChangeText={txt => {
        //                                     setTitle(txt)

        //                                 }}
        //                             />
        //                         </View>
        //                     </View>
        //                 </View>




        //             </View>

        //             <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 15 }}>
        //                 <TouchableOpacity onPress={() => onCancelButtonRename()}>
        //                     <Text style={{ fontSize: 17, paddingRight: 15 }}>Cancel</Text>
        //                 </TouchableOpacity>
        //                 {button_enable_edit === true ? (
        //                         <TouchableOpacity onPress={() => onOkeyButton1()}>
        //                             {loaderC ? (
        //                                 <ActivityIndicator size="small" color={mainGrey}></ActivityIndicator>
        //                             ) : (
        //                                     <Text style={{ fontSize: 17, paddingRight: 15 }}>Rename</Text>
        //                                 )}
        //                         </TouchableOpacity>
        //                     ) : (
        //                 <View >

        //                     <Text style={{ opacity: 0.6, fontSize: 17, paddingRight: 15 }}>Rename</Text>

        //                 </View>
        //                  )} 
        //             </View>
        //         </View>
        //     </Modal>
        // </ScrollView>
    )




    // return (
    //     <ScrollView style={{ backgroundColor: lightGrey }}
    //         showsVerticalScrollIndicator={false}
    //         refreshControl={
    //             <RefreshControl refreshing={loadData} onRefresh={fetchfiles} />
    //         }>

    //         <RenderContacts />
    //     </ScrollView>

    // )

}

const mapStateProps = (state) => {
    const { intranet_enviro } = state

    return { intranet_enviro }
}



export default connect(mapStateProps)(FileModal)



const styles = StyleSheet.create({
    moreBoxes: {
        flex: 1,
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        backgroundColor: lightGrey,
        borderRadius: 20,
        shadowColor: mainBlack,
        borderWidth: 1,
        borderColor: mainBlue,
        flexDirection: 'row',
    },
    topBox: {
        flex: 3.5,
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        borderWidth: 0.25,
        borderColor: mainGrey,
        borderRadius: 20,
        flexDirection: 'row',
        marginBottom: 10,
        backgroundColor: mainWhite
    },
    textStyle: {
        paddingTop: 10,
        paddingLeft: 10,
        color: darkGrey
    },
    staticBoxStyle: {
        flex: 1.3,
        backgroundColor: mainWhite,
        height: 40,
        marginRight: 10,
        marginTop: 10,
        marginLeft: 10
    },
    editableBoxStyle: {
        flex: 1,
        backgroundColor: mainWhite,
        marginRight: 10,
        marginTop: 10,
        height: 40,
        flexDirection: 'row'
    }






});

