
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native'
import { lightGrey, mediumGrey, textBlack, mainGrey, textGrey, mainWhite, darkGrey, mainBlue } from '../../../common/Colors'
import { BASE_IMAGE_URL, INTRANET_FOLDERS_DELETE } from '../../../store/endpoint'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'

import {INTRANET_FOLDERS_EDIT,INTRANET_FILE_DELETE, OHS_AND_S,ACCOUNTS_FILES_FOLDER_GET,INTRANET_FILE_ADD,INTRANET_FILE_CREATE, OHS_AND_S_FILE_ADD, OHS_AND_S_FOLDER_DELETE, INTRANET_FOLDER_EDIT,INTRANET_FOLDERS_CREATE,
    ACCOUNTS_FOLDER_CREATE, OHS_AND_S_FILE_DELETE, INTRANET_FILES_RENAME,OHS_AND_S_FOLDERS,INTRANET_FOLDERS_FILES,INTRANET_FILE_EDIT
} from '../../../store/endpoint';
import IntranetNewFolders from '../../Drawer/Intranet/components/IntranetNewFolder'

const InnerFolder = ({ navigation, route, intranet_enviro, dispatch }) => {



    const { folders_sub_files } = intranet_enviro
    console.log("datdatfa"+JSON.stringify(folders_sub_files))
    const [name, setName] = useState("")
    const [name1, setName1] = useState("")
    const [section, setSection] = useState(1)
    const [counter, setCounter] = useState(0)
    const [item, setItem] = useState('')
    const [itemsecond, setItemsecond] = useState('')

    let dummyData = ['Folders', 'Files']
    const [selected, setSelected] = useState(dummyData[0])

    const call_nextapi = (item) => {
        setName(item.name)
        setItem(item)
        dispatch(fetch_ohs_folders_inner_files(item.id))
        setSection(2)

    }
    const call_nextapisecond = (item) => {

        setName1(item.name)
        setItemsecond(item)
        dispatch(fetch_ohs_folders_inner_files(item.id))
        setSection(3)
    }
    const call_next = () => {
        // name = ""
        setName("")
        dispatch(fetch_ohs_folders_inner_files(route.params.id))
        setItem("")
        setSection(1)
    }
    const call_nextsecond = () => {
        // setName1("")
        dispatch(fetch_ohs_folders_inner_files(item.id))
        setSection(2)
        setItemsecond("")
    }

    const call_image = (link) => {
        Linking.openURL( link)
    }




    return (

        <ScrollView style={{ backgroundColor: lightGrey }}
            showsVerticalScrollIndicator={false}>
            <View style={{ height: 10, backgroundColor: textGrey }}>

            </View>
            <View style={{ flex: 0.1, marginBottom: 10, }}>

             
            <IntranetNewFolders APIURL={OHS_AND_S} title={'Accounts'} FILEEDIT={INTRANET_FILES_RENAME}
                FOLDEREDIT={INTRANET_FOLDER_EDIT} FOLDERADD={OHS_AND_S_FILE_ADD} FOLDERCREATE={ACCOUNTS_FOLDER_CREATE} 
                FOLDERDELETE={OHS_AND_S_FOLDER_DELETE} FILEDELETE={OHS_AND_S_FILE_DELETE} FILEADD={INTRANET_FILE_CREATE}
                 id={route.params.id} name={route.params.name} />               
            </View>
        </ScrollView>


    )

}
const mapStateProps = (state) => {
    const { intranet_enviro } = state

    return { intranet_enviro }
}



export default connect(mapStateProps)(InnerFolder)




