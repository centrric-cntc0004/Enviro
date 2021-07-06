

import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View, Text, TouchableOpacity, ActivityIndicator, Linking, RefreshControl, TextInput, Alert
} from 'react-native'
import { lightGreen, lightGrey, mainBlack, mainGrey, textBlack, mainBlue, mainWhite, textGrey, darkGrey, mediumGrey } from '../../../../common/Colors'
import { BASE_IMAGE_URL, FILES_FOLDERS_SEARCH, FILES_FOLDERS_SEARCHS, FILES_FILE_SEARCH, OHS_AND_S_FOLDERS } from '../../../../store/endpoint'
import Api from '../../../../store/api'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import { fetch_folders_inner_files, fetch_folders_files, add_folder, edit_folder, delete_folder, fetch_ohs_folders_files, fetch_ohs_folders_inner_files, search_folder_list } from '../components/common/action'
import { folder_details } from '../../Team/action'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Entypo'
import { NavigationContainer, useIsFocused } from '@react-navigation/native';
let a = 0
import Toast from 'react-native-simple-toast';
import FolderModal from './FolderModal'

const Intranets = ({ navigation, intranet_enviro, dispatch }) => {


    const { folders_files, isLoading, datafolder, dataFile } = intranet_enviro
    let dummyData = ['Folders', 'Files']
    const [selected, setSelected] = useState(dummyData[0])
    const [loadData, setLoadData] = useState(false)
    const [loadData1, setLoadData1] = useState(false)

    const [loaderC, setLoaderC] = useState(false)
    const [titleEdit, setTitleEdit] = useState("")
    const [idEdit, setIdEdit] = useState("")



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
        navigation.navigate("enviro-Folders", { name: item.name, id: item.id })
    }
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setLoader(true)
            fetch_initail_folderz()
            
            // The screen is focused
            // Call any action
        });

        return unsubscribe;


        // Return the function to unsubscribe from the event so it gets removed on unmount
        // const fetch_initail_folderz = () => {
        //     let api_url = `${OHS_AND_S_FOLDERS}${1}/`
        //     console.log(api_url)
        //     Api('get', api_url).then(response => {
        //         console.log('FILES-FOLDERS', response)
        //         const { files, folders, type } = response.folders[0]
        //         setData(folders)
        //         setFolderType(type ? type : 'general')
        //         setDataB(files)
        //     })
        // }
        // fetch_initail_folderz()

        // let loadingInterval = setInterval(() => {
        //     setLoader(false)
        //     clearInterval(loadingInterval)
        // }, 4500)
        // return () => {
        //     clearInterval(loadingInterval)
        // }
    }, [])
    const fetch_initail_folderz = () => {
        let api_url = `${OHS_AND_S_FOLDERS}${1}/`
        console.log(api_url)
        Api('get', api_url).then(response => {
            console.log('FILES-FOLDERS', response)
            const { files, folders, type } = response.folders[0]
            setData(folders)
            setFolderType(type ? type : 'general')
            setDataB(files)
            dispatch({ type: 'FOLDER_LIST', folderdata: folders })
            setLoader(false)

        })
    }
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

            Api('post-form1', FILES_FOLDERS_SEARCHS, data1).then(response => {
                console.log("responseffffffffffff" + JSON.stringify(response.status))
                if (response.status >= 400) {
                    // setData([])
                    dispatch({ type: 'FOLDER_LIST', folderdata: [] })

                } else if (response.status === 200) {
                    console.log("status" + JSON.stringify(response.data))

                    // setData(response.data)
                    dispatch({ type: 'FOLDER_LIST', folderdata: response.data })


                }
            })

        }




        // )

    }
    const onCancelButton = () => {
        setVisible(false)
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
            dispatch({ type: 'FOLDER_LIST', folderdata: folders })


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
        form_body.append('parent_folder', 1)
        const success = (response) => {
            setLoaderC(false)
            setVisible(false)
            setTitle('')
            dispatch(fetch_ohs_folders_files())

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
    if (loader)
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: lightGrey }}>
                <ActivityIndicator size="large" color={mainBlue} />
            </View>
        )

    // if (folders_files.length === 0)
    //     return (
    //         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: lightGrey }}>
    //             <Text style={{ fontSize: 14, color: mainGrey }}>No Data Found</Text>
    //         </View>
    //     )
    return (
        <ScrollView style={{ backgroundColor: lightGrey }}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={loadData} onRefresh={fetchfiles} />
            }>
            <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: lightGrey, marginBottom: 40 }}>
                <View style={{ height: 10, backgroundColor: lightGrey }}>

                </View>

                <Text style={{ paddingLeft: 10, paddingTop: 10, color: mainGrey, fontSize: 16, fontWeight: 'bold' }}>Folders</Text>
                <View style={{ marginTop: 1 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <View style={{ flex: 6.5 }} />
                        <TouchableOpacity onPress={() => setVisible(true)}
                            style={styles.topBox}>
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}>
                                <Text style={{ color: mainBlack, fontSize: 14 }} >Add Folder +</Text>
                            </View>

                        </TouchableOpacity>

                    </View>
                </View>
                <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', marginTop: '5%', paddingLeft: 25, borderRadius: 20, height: 42, borderWidth: 0.5, backgroundColor: mainWhite, borderColor: darkGrey }}>
                    <TextInput
                        style={{ fontSize: 14, color: '#000', width: '70%', height: 40 }}
                        placeholder='Search by Folder Name'
                        placeholderTextColor={mainGrey}
                        autoCorrect={false}
                        onChangeText={(txt) => {
                            // setKeyword(txt)
                            search_folder(txt, folderType)
                        }}
                    />
                    {/* <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '30%', height: 40, backgroundColor: lightGreen, borderRadius: 30 }}>
                        <Text style={{ color: mainWhite }}>Search</Text>
                    </TouchableOpacity> */}
                </View>
                <View style={{ flex: 1, backgroundColor: lightGrey, marginTop: '3%' }}>

                    {folders_files.map((item, key) => {
                        return (
                            <View key={key}>
                                {datafolder.length !== 0 ? (
                                    <View>
                                        { datafolder.map((unit, key2) => {
                                            return (
                                                <TouchableOpacity onPress={() => call_nextapi(unit)}>
                                                    <View style={{
                                                        flexDirection: 'row', height: 50, backgroundColor: textGrey,
                                                        marginTop: 10, borderWidth: 0.25, borderColor: mainGrey, borderRadius: 10
                                                    }}>

                                                        <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                <Icon style={{ paddingLeft: 10 }}
                                                                    name={"folder"} size={25} color={mainGrey} />
                                                                <Text numberOfLines={1}
                                                                    style={{ paddingLeft: 20, color: textBlack, paddingRight: 10, width: '70%' }}>{unit.name}</Text>
                                                                <TouchableOpacity onPress={() => callEdit(unit)}>
                                                                    <Icon1 style={{ marginLeft: '5%' }}
                                                                        name={"edit"} size={16} color={mainGrey} />
                                                                </TouchableOpacity>
                                                                <TouchableOpacity onPress={() => calldelete(unit.id)}>
                                                                    <Icon2 style={{}}
                                                                        name={"delete-forever"} size={20} color={mainGrey} />
                                                                </TouchableOpacity>
                                                            </View>

                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })}

                                    </View>
                                ) : (
                                        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text>No Folders Found</Text>
                                        </View>
                                    )}
                            </View>
                        );
                    })}

                </View>

                {/* <Text style={{ paddingLeft: 10, paddingTop: 20, color: mainGrey, fontSize: 16, fontWeight: 'bold' }}>Files</Text>
                <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', marginTop: '5%', paddingLeft: 25, borderRadius: 20, height: 42, borderWidth: 0.2, backgroundColor: mainWhite, borderColor: darkGrey }}>
                    <TextInput
                        style={{ fontSize: 14, color: '#000', width: '70%', height: 40 }}
                        placeholder='Search by Folder Name'
                        autoCorrect={false}
                        onChangeText={(txt) => {
                            // setKeyword(txt)
                            search_file(txt,folderType)
                        }}
                    /> */}
                {/* <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '30%', height: 40, backgroundColor: mediumGrey, borderRadius: 30 }}>
                        <Text style={{ color: textBlack }}>Search</Text>
                    </TouchableOpacity> */}
                {/* </View> */}

                {/* <View style={{ flex: 1, backgroundColor: lightGrey, marginTop: '3%' }}>

                    {folders_files.map((item, key) => {
                        return (
                            <View key={key}>
                                {dataB.length !== 0 ? (
                                    <View>
                                        { dataB.map((unit, key2) => {
                                            return (
                                                <TouchableOpacity onPress={() => call_image(unit.url)}>
                                                    <View style={{
                                                        flexDirection: 'row', height: 50, backgroundColor: textGrey,
                                                        marginTop: 10, borderWidth: 0.25, borderColor: mainGrey, borderRadius: 10
                                                    }}>

                                                        <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 10, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                <Icon1 style={{ paddingLeft: 10 }}
                                                                    name="file-document-outline" size={25} color={mainGrey} />
                                                                <Text numberOfLines={1}
                                                                    style={{ paddingLeft: 20, color: textBlack, paddingRight: 30, marginTop: 3 }}>{unit.name}</Text>
                                                            </View>

                                                        </View>
                                                    </View>
                                                </TouchableOpacity>
                                            )
                                        })}
                                    </View>
                                ) : (
                                        <View style={{ marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
                                            <Text>No Files Found</Text>
                                        </View>
                                    )}
                            </View>
                        );
                    })}

                </View> */}

            </View>
            <FolderModal
                modalStatus={isVisible}
                modalAction={setVisible}
                option={"add"}
                loader={loaderC}
                setLoader={setLoaderC}
            // onOkeyButton={onOkeyButton}

            // quoteRegisterationApi={quoteGenerate}

            />

            <Modal isVisible={isVisibleEdit}>
                <View style={{ backgroundColor: lightGrey, padding: 10, borderRadius: 10, }}>
                    <View style={{ backgroundColor: mainWhite, borderRadius: 10, padding: 5, marginTop: '5%' }}>

                        <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: 'bold' }}>Rename</Text>


                        <View style={{ marginTop: '5%', paddingHorizontal: 10, marginBottom: 10 }}>
                            <View style={{ height: 35, borderRadius: 5, backgroundColor: mainWhite, justifyContent: 'center', borderWidth: 0.3, borderColor: mainGrey }}>
                                <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15 }}>

                                    <TextInput
                                        style={{ padding: 0, fontSize: 14, color: mainGrey, }}
                                        placeholder="Untitled Folder"
                                        placeholderTextColor={mainGrey}
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




                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 15 }}>
                        <TouchableOpacity onPress={() => onCancelButtonRename()}>
                            <Text style={{ fontSize: 17, paddingRight: 15 }}>Cancel</Text>
                        </TouchableOpacity>
                        {button_enable_edit === true ? (
                            <TouchableOpacity onPress={() => onOkeyButton1()}>
                                {loaderC ? (
                                    <ActivityIndicator size="small" color={mainGrey}></ActivityIndicator>
                                ) : (
                                        <Text style={{ fontSize: 17, paddingRight: 15 }}>Rename</Text>
                                    )}
                            </TouchableOpacity>
                        ) : (
                                <View >

                                    <Text style={{ opacity: 0.6, fontSize: 17, paddingRight: 15 }}>Rename</Text>

                                </View>
                            )}
                    </View>
                </View>
            </Modal>
        </ScrollView>
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



export default connect(mapStateProps)(Intranets)



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
