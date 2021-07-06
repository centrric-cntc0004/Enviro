
import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Linking, ScrollView, TextInput, Alert } from 'react-native'
import { lightGrey, mediumGrey, mainBlack, textBlack, mainGrey, textGrey, mainWhite, darkGrey, mainBlue } from '../../../../common/Colors'
import { BASE_IMAGE_URL } from '../../../../store/endpoint'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import { fetch_folders_inner_files, fetch_ohs_folders_inner_files, add_file } from '../components/common/action'
import FolderModal from './FolderModal'
import FileModal from './FileModal'
import DocumentPicker from 'react-native-document-picker';
import Toast from 'react-native-simple-toast';
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon3 from 'react-native-vector-icons/Entypo'
import { ActivityIndicator } from 'react-native'
import Modal from 'react-native-modal'
import { FILES_FOLDERS_SEARCH, SITE_FILESANDFOLDERS_SEARCH } from '../../../../store/endpoint'

import NoDataContent from '../../../../common/NoDataContent'




import Api from '../../../../store/api'
function IntranetNewFolders({ APIURL, title, FOLDEREDIT = null, FOLDERADD = null, FOLDERCREATE = null, FOLDERDELETE = null, FILEDELETE = null, FILEEDIT = null, CALLBACKFUNCMODAL = null,
    SELECTID = null, intranet_enviro, id, FILEADD, SELETPATH, name }) {
    let folder = ""
    const { folders_sub_files } = intranet_enviro
    const [foldersData, setFoldersData] = useState([])
    const [filesData, setFilesData] = useState([])



    const [navigator, setNavigator] = useState([])

    const [folderModal, setFolderModal] = useState(false)
    const [folderName, setFolderName] = useState('')
    const [zFolderId, setFolderId] = useState('')
    const [renameEntity, setRenameEntity] = useState('')
    const [modalType, setModalType] = useState(true) //true for create false for edit
    //const [uploadedFilesData, setUploadedFilesData] = useState([])
    const [folderSelect, setFolderSelect] = useState(null)
    const [fileSelect, setFileSelect] = useState(null)
    const [tooltipSel, setTooltipSel] = useState(null)
    const [folderType, setFolderType] = useState('general')
    const [ParentFolderId, setPFldrId] = useState(1)
    const [initLoader, setInitLoader] = useState(true)
    const [prevFolder, setPrevFolder] = useState({ id: '', name: '' })
    const [delFolders, setDelFolders] = useState([])
    const [delFiles, setDelFiles] = useState([])

    useEffect(() => {
        const fetch_initail_folderz = () => {
            let api_url = `${APIURL}${id}/`
            console.log("api_url"+api_url)
            Api('get', api_url).then(response => {
                console.log('FILES-FOLDERS', JSON.stringify(response))
                const { files, folders, type } = response.folders[0]
                setFoldersData(folders)
                setFolderType(type ? type : 'general')
                setFilesData(files)
                setInitLoader(false)
                setNavigator([])
            })
        }
        fetch_initail_folderz()
    }, [APIURL])

    const cropFileName = (str) => {
        let lastIdx = str ? str.length : null
        if (lastIdx)
            return lastIdx > 25 ? `${str.substr(0, 10)}...${str.substr(str.length - 3, str.length)}` : str
        else
            return 'Untitled'
    }


    const fetch_initail_folder = () => {
        let api_url = `${APIURL}${id}/`
        console.log(api_url)
        Api('get', api_url).then(response => {
            const { files, folders, type } = response.folders[0]
            setFoldersData(folders)
            setFolderType(type ? type : 'general')
            setFilesData(files)
            setNavigator([])
            setInitLoader(false)
            console.log("init" + JSON.stringify(response))

        })
    }


    const fetch_folder_data = (folder_id, folder_name) => {
        let api_url = `${APIURL}${folder_id}/`
        setPFldrId(folder_id)

        setPrevFolder({ id: folder_id, name: folder_name })
        Api('get', api_url).then(response => {
            console.log('SINGLEFOLDER', JSON.stringify(response))
            const { files, folders, type } = response.folders[0]
            setFoldersData(folders)
            setFolderType(type ? type : 'general')
            setFilesData(files)
            setInitLoader(false)
            let navData = {
                id: folder_id,
                name: folder_name,
                type: type
            }

            let checkItemAlredyPResent = navigator.find(itm => itm.id === folder_id)
            if (checkItemAlredyPResent) {
                let checkItem = navigator.indexOf(checkItemAlredyPResent)
                let itemArr = []
                let i;
                for (i = 0; i <= checkItem; i++) {
                    itemArr.push(navigator[i]);
                }
                itemArr[checkItem] = navData
                setNavigator(itemArr)
            } else {
                setNavigator(item => [...item, navData])
            }


        })
    }

    const setModal = () => {
        setFolderModal(true)
        setModalType(true)
        setFolderName('')
        console.log("kjhkjkjkjklljl" + folderModal)
    }
    const multiple_delete = () => {

        let prev_folder_id = ''
        let prev_folder_name = ''

        if (delFiles && delFiles.length !== 0) {
            if (navigator.length > 1) {

                prev_folder_id = navigator[navigator.length - 1].id
                prev_folder_name = navigator[navigator.length - 1].name
            }
            let data = new FormData()
            for (let i = 0; i < delFiles.length; ++i)
                data.append('id', delFiles[i])
            const success = () => {
                setDelFiles([])

                if (navigator.length === 1) {
                    fetch_folder_data(navigator[0].id, navigator[0].name)
                }
                else if (navigator.length > 1) {
                    fetch_folder_data(prev_folder_id, prev_folder_name)
                } else {
                    fetch_initail_folder()
                }

                if (CALLBACKFUNCMODAL !== null)
                    CALLBACKFUNCMODAL(true)

            }

            const failed = () => {

                if (CALLBACKFUNCMODAL !== null)
                    CALLBACKFUNCMODAL(true)

            }



        }
        if (delFolders && delFolders.length !== 0) {
            if (navigator.length > 0) {

                prev_folder_id = navigator[navigator.length - 1].id
                prev_folder_name = navigator[navigator.length - 1].name
            }

            let dataF = new FormData()
            for (let i = 0; i < delFolders.length; ++i)
                dataF.append('id', delFolders[i])

            const success = () => {
                setDelFolders([])


                if (navigator.length > 0) {
                    fetch_folder_data(prev_folder_id, prev_folder_name)
                }
                else
                    fetch_initail_folder()

                if (CALLBACKFUNCMODAL !== null)
                    CALLBACKFUNCMODAL(true)

            }

            const failed = () => {
                // Swal.fire({
                //     icon: 'error',
                //     title: 'Oops...',
                //     text: 'Something went wrong!'
                // })
                if (CALLBACKFUNCMODAL !== null)
                    CALLBACKFUNCMODAL(true)

            }


        }
    }

    const uploadFolder = async () => {
        try {
            const results = await DocumentPicker.pickMultiple({
                type: [DocumentPicker.types.pdf],
            });
            for (const res of results) {
                // setDocname(res.name)
                // setDocuri(res)
                // setLoaderC(true)
                console.log("srsret" + res.name)
                file_upload([res])

            }
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                // User cancelled the picker, exit any dialogs or menus and move on
            } else {
                throw err;
            }
        }
    }

    const search_files = (keyword, type) => {
        let data = new FormData()
        data.append('key', keyword)
        data.append('folder_id', navigator && navigator.length === 0 ? id : ParentFolderId)
        data.append('search_type', type)
        console.log('serchType', type)
        if (type === 'team-individual-private') {
            // let splitPath = APIURL.split('folder/')
            data.append('employee', SELECTID)
        } else if (SELETPATH === 'site') {
            // let splitPath = APIURL.split('folder/')
            data.append('site', SELECTID)
        }else if (SELETPATH === 'vehicle_truck') {
            // let splitPath = APIURL.split('folder/')
            data.append('vehicle_id', SELECTID)
        }else if (SELETPATH === 'vehicle_car') {
            // let splitPath = APIURL.split('folder/')
            data.append('vehicle_id', SELECTID)
        }else if (SELETPATH === 'vehicle_forklift') {
            // let splitPath = APIURL.split('folder/')
            data.append('vehicle_id', SELECTID)
        }

        console.log("datada" + JSON.stringify(data))
        let searchType = navigator && navigator.length > 0 ? "file" : "folder"
        if (keyword !== "") {
            let fileUrl = SELETPATH === 'site' ? SITE_FILESANDFOLDERS_SEARCH : FILES_FOLDERS_SEARCH
            // if (SELETPATH === "intranet") {
            // Api('post-form', `${fileUrl}${"file"}/`, data).then(response => {
            //     console.log("response+"+JSON.stringify(response))
            //     if (navigator && navigator.length === 0){
            //         if(response.folders){
            //             const { files, folders, type } = response.folders[0]

            //             setFoldersData(folders)
            //             setFolderType(type ? type : 'general')
            //             setFilesData(files)

            //         }

            //     }
            //     else {
            //         const { files, folders, type } = response.folders[0]
            //         setFoldersData(folders)
            //         setFolderType(type ? type : 'general')
            //         setFilesData(files)

            //     }
            // }

            // )
            // } 
            // else {
            Api('post-form', `${fileUrl}${"file"}/`, data).then(response => {
                console.log(`${fileUrl}${searchType}/`)
                if (navigator && navigator.length === 0) {
                    const { files, folders, type } = response.folders[0]
                    setFoldersData(folders)
                    setFolderType(type ? type : 'general')
                    setFilesData(files)
                }
                else {
                    const { files, folders, type } = response.folders[0]
                    setFoldersData(folders)
                    setFolderType(type ? type : 'general')
                    setFilesData(files)

                }
            }

            )
            // }
        }


    }

    const createFolderApi = () => {

        let data = new FormData()
        let folder_id
        let folder_name_data
        if (navigator.length > 0) {
            folder_id = navigator[navigator.length - 1].id
            folder_name_data = navigator[navigator.length - 1].name
        } else {
            folder_id = id
        }

        data.append('name', folderName)
        data.append('parent_folder', folder_id)
        if (SELETPATH === 'team') {
            // let splitPath = APIURL.split('folder/')
            data.append('employee', SELECTID)
        }
        else if (SELETPATH === 'site') {
            // let splitPath = APIURL.split('folder/')
            data.append('site', SELECTID)
        }else if (SELETPATH === 'vehicle_truck') {
            // let splitPath = APIURL.split('folder/')
            data.append('vehicle_id', SELECTID)
            data.append('vehicle_type', "truck")
        }else if (SELETPATH === 'vehicle_car') {
            // let splitPath = APIURL.split('folder/')
            data.append('vehicle_id', SELECTID)
            data.append('vehicle_type', "car")
        }else if (SELETPATH === 'vehicle_forklift') {
            // let splitPath = APIURL.split('folder/')
            data.append('vehicle_id', SELECTID)
            data.append('vehicle_type', "forklift")
        }

        console.log("skjd"+JSON.stringify(data))
        const success = () => {
            setFolderName('')
            setFolderModal(false)
            if (navigator.length > 0) {
                fetch_folder_data(folder_id, folder_name_data)
            } else {
                fetch_initail_folder()
            }

        }

        const failed = () => {
            if (CALLBACKFUNCMODAL !== null)
                CALLBACKFUNCMODAL(true)
            setFolderName('')
            setFolderModal(false)



        }
        console.log(FOLDERCREATE)
        Api('post-form', FOLDERCREATE, data, success, failed)
    }


    const updateFolderApiLatest = (folderId, entity) => {

        console.log("kjashdkjhkj" + folderId)
        console.log("kjashdkjhkj" + entity)

        let api_url = ''
        if (entity === 'Folder')
            api_url = `${FOLDEREDIT}${folderId}/`
        else
            api_url = `${FILEEDIT}${folderId}/`
        console.log(api_url, entity, folderName)

        let data = new FormData()
        data.append('name', folderName)
        data.append('folder', folderId)


        const success = (res) => {
            console.log("rrrrrrrrrrr" + JSON.stringify(res))
            if (res.status === 200) {
                setFolderName('')
                setFolderModal(false)
                setFolderId('')
                setRenameEntity('')
                if (navigator.length > 0) {
                    let prev_folder_id = navigator[navigator.length - 1].id
                    let prev_folder_name = navigator[navigator.length - 1].name
                    fetch_folder_data(prev_folder_id, prev_folder_name)
                } else {
                    fetch_initail_folder()
                }

            }

        }

        Api('put2', api_url, data, success)
    }


    const deleteFolderApiLatest = (folderId) => {
        console.log(navigator);
        if (navigator.length > 0) {

            let prev_folder_id = navigator[navigator.length - 1].id
            let prev_folder_name = navigator[navigator.length - 1].name



            const success = () => {

                fetch_folder_data(prev_folder_id, prev_folder_name)
                if (CALLBACKFUNCMODAL !== null)
                    CALLBACKFUNCMODAL(true)

            }

            const failed = () => {

                if (CALLBACKFUNCMODAL !== null)
                    CALLBACKFUNCMODAL(true)

            }





            let api_url = `${FOLDERDELETE}${folderId}/`
            Api('delete', api_url, '', success, failed)

            // })
        } else {


            const success = () => {

                fetch_initail_folder()
            }

            const failed = () => {

            }




            let api_url = `${FOLDERDELETE}${folderId}/`
            Api('delete', api_url, '', success, failed)


        }
    }


    const file_upload = (data) => {


        const success = (res) => {

            console.log("resss" + JSON.stringify(res))
            if (navigator.length > 0) {
                let folder_id_tst = navigator[navigator.length - 1].id
                let folder_name_tst = navigator[navigator.length - 1].name
                fetch_folder_data(folder_id_tst, folder_name_tst)
            } else {
                fetch_initail_folder()
            }


        }

        const failed = (res) => {
            console.log('upload failed', res)


        }
        console.log('uploading blah')
        let data_val = new FormData()
        let i;
        let folder_id
        if (navigator.length > 0) {
            folder_id = navigator[navigator.length - 1].id
        } else {
            folder_id = id
        }
        for (i = 0; i < data.length; i++) {
            let file = data[i];
            let file_name = data[i].name
            data_val.append("name", file_name)
            data_val.append('file', file)
            console.log(file, file_name)
        }



        console.log(folder_id)
        data_val.append('folder', folder_id)
        console.log("FILEADD" + FILEADD)
        if (SELETPATH === 'team') {
            // let splitPath = APIURL.split('folder/')
            data_val.append('employee', SELECTID)
        } else if (SELETPATH === 'site') {
            // let splitPath = APIURL.split('folder/')
            data_val.append('site', SELECTID)
        }
        Api('post-form', FILEADD, data_val, success, failed)
    }

    const deleteSingleFile = (folderId, fileID) => {



        Alert.alert(
            'Delete',
            'Are you Sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => callapi(folderId, fileID) },
            ]
        );



    }
    const callapi = (foid, fiid) => {
        let prev_folder_id = ''
        let prev_folder_name = ''

        if (navigator.length > 1) {

            prev_folder_id = navigator[navigator.length - 1].id
            prev_folder_name = navigator[navigator.length - 1].name
        }

        const success = () => {

            if (navigator.length === 1) {
                fetch_folder_data(navigator[0].id, navigator[0].name)
            }
            else if (navigator.length > 1) {
                fetch_folder_data(prev_folder_id, prev_folder_name)
            } else {
                fetch_initail_folder()
            }

        }

        const failed = () => {

        }

        let api_url = `${FILEDELETE}${fiid}/${foid}/`
        Api('delete', api_url, '', success, failed)
    }

    const callEdit = (unit) => {
        setRenameEntity('Folder')
        setModalType(false)
        setFolderName(unit.name)
        setFolderId(unit.id)
        setFolderModal(true)
    }
    const callDelete = (unit) => {
        if (CALLBACKFUNCMODAL !== null) {
            CALLBACKFUNCMODAL(false)
        }
        Alert.alert(
            'Delete',
            'Are you Sure?',
            [
                {
                    text: 'Cancel',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                { text: 'OK', onPress: () => deleteFolderApiLatest(unit.id) },
            ]
        );


    }


    const editFile = (unit) => {
        setRenameEntity('File')
        setModalType(false)
        setFolderName(unit.name)
        setFolderId(unit.id)
        setFolderModal(true)

    }


    const call_image = (link) => {
        Linking.openURL(link)
    }

    return (

        <ScrollView >



            {
                !initLoader ? (
                    <View style={{ paddingHorizontal: 10, marginTop: 10 }}>


                        <View style={{ marginTop: 10 }}>
                            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                                <View style={{ height: 45, flexDirection: 'row', alignItems: 'center' }}>


                                    <TouchableOpacity style={{ flexDirection: 'row' }}
                                        onPress={() => fetch_initail_folder()}>
                                        <Text style={{ paddingLeft: 10, fontSize: 14 }}>{name}</Text>
                                    </TouchableOpacity>
                                    <Text style={{ paddingLeft: 10, fontSize: 16 }}>{">"}</Text>

                                </View>

                                {
                                    navigator.map((item, key) => {
                                        const { id, name } = item
                                        return (
                                            <View style={{ height: 45, flexDirection: 'row', alignItems: 'center' }}>


                                                <TouchableOpacity style={{ flexDirection: 'row' }}
                                                    onPress={() => fetch_folder_data(id, name)}>
                                                    <Text style={{ paddingLeft: 10, fontSize: 14 }}>{name}</Text>
                                                </TouchableOpacity>
                                                <Text style={{ paddingLeft: 10, fontSize: 16 }}>{">"}</Text>

                                            </View>



                                        )
                                    })
                                }
                            </ScrollView>


                            <View style={{ marginTop: 10, flexDirection: 'row', flex: 1, height: 50, paddingHorizontal: 10 }}>
                                <View style={{ flex: 1.2, }}>
                                    {navigator && navigator.length > 0 ? (
                                        <View style={styles.topBox1}>
                                            <TextInput
                                                style={{ paddingLeft: 20, fontSize: 14, color: '#000', height: 40 }}
                                                placeholder='Search'
                                                autoCorrect={false}
                                                placeholderTextColor={mainGrey}
                                                onChangeText={(txt) => {

                                                    if (txt === '') {
                                                        console.log('CALLED', txt)
                                                        fetch_folder_data(prevFolder.id, prevFolder.name)
                                                    } else
                                                        search_files(txt, folderType)
                                                }}
                                            // setKeyword(txt)
                                            // search_folder(txt, folderType)

                                            />
                                        </View>
                                    ) : (
                                            <View style={styles.topBox1}>
                                                <TextInput
                                                    style={{ width: 200, paddingLeft: 20, fontSize: 14, color: '#000', height: 40 }}
                                                    placeholder='Search'
                                                    autoCorrect={false}
                                                    placeholderTextColor={mainGrey}
                                                    onChangeText={(txt) => {

                                                        if (txt === '') {
                                                            console.log('CALLED', txt)
                                                            fetch_initail_folder();

                                                        } else
                                                            search_files(txt, folderType)
                                                    }}
                                                // setKeyword(txt)
                                                // search_folder(txt, folderType)

                                                />
                                            </View>
                                        )}
                                </View>
                                <View style={{ flex: 0.5, }}>
                                    <TouchableOpacity onPress={() => setModal()}
                                        style={styles.topBox}>
                                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}>
                                            <Text style={{ color: mainBlack, fontSize: 14 }} >Folder +</Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>
                                <View style={{ flex: 0.5, }}>
                                    <TouchableOpacity onPress={() => uploadFolder()}
                                        style={styles.topBox}>
                                        <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', }}>
                                            <Text style={{ color: mainBlack, fontSize: 14 }} >Files +</Text>
                                        </View>

                                    </TouchableOpacity>
                                </View>
                            </View>

















                            {folders_sub_files.map((item, key) => {
                                return (
                                    <View key={key}>

                                        { foldersData.length !== 0 ? (
                                            <View>
                                                { foldersData.map((unit, key2) => {
                                                    return (

                                                        <TouchableOpacity
                                                            onPress={() => fetch_folder_data(unit.id, unit.name)}>
                                                            <View style={{

                                                                flexDirection: 'row', height: 50, backgroundColor: textGrey,
                                                                borderRadius: 10, marginTop: 10, borderWidth: 0.25, borderColor: mainGrey,
                                                            }}>

                                                                <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                        <Icon style={{ paddingLeft: 10 }}
                                                                            name={"folder"} size={25} color={mainGrey} />
                                                                        <Text numberOfLines={1}
                                                                            style={{ paddingLeft: 20, color: textBlack, paddingRight: 10, width: '70%' }}>{unit.name}</Text>
                                                                        {unit.type!=='team-individual'?(
                                                                        <TouchableOpacity onPress={() => callEdit(unit)}>
                                                                            <Icon3 style={{ marginLeft: '5%' }}
                                                                                name={"edit"} size={16} color={mainGrey} />
                                                                        </TouchableOpacity>
                                                                        ):(null)}
                                                                         {unit.type!=='team-individual'?(
                                                                        <TouchableOpacity onPress={() => callDelete(unit)}>
                                                                            <Icon2 style={{}}
                                                                                name={"delete-forever"} size={20} color={mainGrey} />
                                                                        </TouchableOpacity>
                                                                         ):(null)}
                                                                    </View>

                                                                </View>
                                                            </View>
                                                        </TouchableOpacity>
                                                    )
                                                })}
                                            </View>
                                        ) : (
                                                <View style={{ height: 150, justifyContent: 'center', alignItems: 'center', }}>
                                                    <NoDataContent />

                                                </View>
                                            )}
                                    </View>
                                );
                            })}

                        </View>



                        <Text style={{ color: mainGrey, fontSize: 16, paddingLeft: 10, paddingTop: 20, fontWeight: 'bold' }}>Files</Text>

                        <View style={{}}>
                            {folders_sub_files.map((item, key) => {
                                console.log("jjjjj"+JSON.stringify(item))
                                return (
                                    <View key={key}>

                                        {filesData.length !== 0 ? (
                                            <View>
                                                { filesData.map((unit, key2) => {
                                                    return (

                                                        <TouchableOpacity
                                                            onPress={() => call_image(unit.url)}>
                                                            <View style={{

                                                                flexDirection: 'row', height: 50, backgroundColor: textGrey,
                                                                borderRadius: 10, marginTop: 10, borderWidth: 0.25, borderColor: mainGrey,
                                                            }}>

                                                                {/* <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 10, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                                <Icon1 style={{ paddingLeft: 10 }}
                                                                                    name="file-document-outline" size={25} color={mainGrey} />
                                                                                <Text numberOfLines={1}
                                                                                    style={{ paddingLeft: 20, color: textBlack, paddingRight: 30, marginTop: 3 }}>{unit.name}</Text>
                                                                            </View>
                                                                        </View> */}

                                                                <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                        <Icon1 style={{ paddingLeft: 10 }}
                                                                            name="file-document-outline" size={25} color={mainGrey} />
                                                                        <Text numberOfLines={1}
                                                                            style={{ paddingLeft: 20, color: textBlack, paddingRight: 10, width: '70%' }}>{unit.name}</Text>
                                                                        <TouchableOpacity onPress={() => editFile(unit)}>
                                                                            <Icon3 style={{ marginLeft: '5%' }}
                                                                                name={"edit"} size={16} color={mainGrey} />
                                                                        </TouchableOpacity>
                                                                        <TouchableOpacity onPress={() => deleteSingleFile(folder = navigator.length === 0 ? id : ParentFolderId, unit.id)}>
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
                                                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                                                    <NoDataContent />
                                                </View>
                                            )}
                                    </View>
                                );
                            })}

                        </View>



                    </View>



                ) : (
                        <View style={{ justifyContent: 'center', alignItems: "center" }}>
                            <ActivityIndicator color={mainBlue} size="large"></ActivityIndicator>
                        </View>
                    )
            }
            <FolderModal1
                modalStatus={folderModal}
                modalAction={setFolderModal}
                newFolder={modalType}
                folderName={folderName}
                folderNameAction={setFolderName}
                createAction={createFolderApi}
                updateAction={updateFolderApiLatest}
                folderId={zFolderId}
                entity={renameEntity}
            />

        </ScrollView >
    )
}
const mapStateProps = (state) => {
    const { intranet_enviro } = state

    return { intranet_enviro }
}



export default connect(mapStateProps)(IntranetNewFolders)

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
        marginLeft: 5,
        backgroundColor: mainWhite
    },
    topBox1: {
        flex: 3.5,
        height: 35,
        flexDirection: 'row',

        borderWidth: 0.3,
        borderColor: mainGrey,
        borderRadius: 20,
        flexDirection: 'row',
        marginBottom: 10,
        marginLeft: 5,
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

const FolderModal1 = ({
    modalStatus,
    modalAction,
    newFolder,
    folderName,
    folderNameAction,
    createAction,
    updateAction,
    folderId,
    entity
}) => {

    const handleClose = () => {
        modalAction(false)
    };
    return (

        <Modal isVisible={modalStatus}>
            <View style={{ backgroundColor: lightGrey, padding: 10, borderRadius: 10, }}>
                <View style={{ backgroundColor: mainWhite, borderRadius: 10, padding: 5, marginTop: '5%' }}>

                    <Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: 'bold' }}>New Folder</Text>


                    <View style={{ marginTop: '5%', paddingHorizontal: 10, marginBottom: 10 }}>
                        <View style={{ height: 35, borderRadius: 5, backgroundColor: mainWhite, justifyContent: 'center', borderWidth: 0.3, borderColor: mainGrey }}>
                            <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 15 }}>

                                <TextInput
                                    style={{ padding: 0, fontSize: 14, color: mainGrey, }}
                                    placeholder="Untitled Folder"
                                    placeholderTextColor={mainGrey}
                                    value={folderName}
                                    onSubmitEditing={() => {

                                    }}
                                    onChangeText={txt => {
                                        folderNameAction(txt)

                                    }}
                                />
                            </View>
                        </View>
                    </View>




                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginTop: 15 }}>
                    <TouchableOpacity onPress={() => modalAction(false)}>
                        <Text style={{ fontSize: 17, paddingRight: 15 }}>Cancel</Text>
                    </TouchableOpacity>
                    {/* {button_enable === true ? ( */}
                    <TouchableOpacity >
                        {/* {loaderC ? (
                            <ActivityIndicator size="small" color={mainGrey}></ActivityIndicator>
                        ) : ( */}

                        {
                            newFolder ?
                                <TouchableOpacity onPress={() => createAction()}>
                                    <Text style={{ fontSize: 17, paddingRight: 15 }}>Create</Text>
                                </TouchableOpacity>
                                :

                                <TouchableOpacity onPress={() => updateAction(folderId, entity)}>
                                    <Text style={{ fontSize: 17, paddingRight: 15 }}>Rename</Text>
                                </TouchableOpacity>
                        }

                        {/* )} */}
                    </TouchableOpacity>
                    {/* ) : (
                        <View >

                            <Text style={{ opacity: 0.6, fontSize: 17, paddingRight: 15 }}>Create</Text>

                        </View>
                    )} */}
                </View>
            </View>
        </Modal>



    )
}
