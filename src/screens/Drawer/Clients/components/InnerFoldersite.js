
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native'
import { lightGrey, mediumGrey, textBlack, mainGrey, textGrey, mainWhite, darkGrey, mainBlue } from '../../../../common/Colors'
import { BASE_IMAGE_URL } from '../../../../store/endpoint'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
// import { fetch_folders_inner_files ,fetch_ohs_folders_inner_files} from '../components/common/action'
import { certificate_list3 } from '../../Team/action'
import client from '../reducer'
import { TEAM_FOLDER_CREATE, SITE_FILESANDFOLDERS_GET, SITE_FILES_CREATE, INTRANET_FILES_RENAME, TEAM_ALL_FOLDERS_LIST1, OHS_AND_S_FILE_DELETE, INTRANET_FILE_CREATE, INTRANET_FOLDER_EDIT, SITE_PRIVATE_FOLDER_CREATE, TEAM_INNER_FOLDER_CREATE, ACCOUNTS_FOLDER_CREATE, OHS_AND_S_FOLDER_DELETE } from '../../../../store/endpoint'
import IntranetNewFolder from '../../../Drawer/Intranet/components/IntranetNewFolder'

const InnerFoldersite = ({ navigation, route, team, dispatch, client }) => {



    const { sub_files, selected_employee } = team
    const { selected_client } = client

    console.log("datdatfa" + JSON.stringify(selected_client))
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
        dispatch(certificate_list3(selected_client.id, item.id))
        setSection(2)

    }
    const call_nextapisecond = (item) => {

        setName1(item.name)
        setItemsecond(item)
        dispatch(certificate_list3(selected_client.id, item.id))
        setSection(3)
    }
    const call_next = () => {
        // name = ""
        setName("")
        dispatch(certificate_list3(selected_client.id, route.params.id))
        setItem("")
        setSection(1)
    }
    const call_nextsecond = () => {
        // setName1("")
        dispatch(certificate_list3(selected_client.id, item.id))
        setSection(2)
        setItemsecond("")
    }

    const call_image = (link) => {
        Linking.openURL(link)
    }






    return (

        <ScrollView style={{ backgroundColor: lightGrey }}
            showsVerticalScrollIndicator={false}
        >

            <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: lightGrey, marginBottom: 40 }}>
                <View style={{ height: 10, backgroundColor: lightGrey }}>

                </View>
                <IntranetNewFolder
                    APIURL={`${SITE_FILESANDFOLDERS_GET}${selected_client.id}/`} title={'Site Folders'}
                    SELECTID={selected_client.id}
                    id={selected_client.id}
                    FILEEDIT={INTRANET_FILES_RENAME}
                    FOLDEREDIT={INTRANET_FOLDER_EDIT}
                    FOLDERADD={SITE_FILES_CREATE}
                    FILEADD={SITE_FILES_CREATE}
                    FOLDERCREATE={SITE_PRIVATE_FOLDER_CREATE}
                    FOLDERDELETE={OHS_AND_S_FOLDER_DELETE}
                    FILEDELETE={OHS_AND_S_FILE_DELETE}
                    SELETPATH={"site"}
                    name={route.params.name}
                />

            </View>
        </ScrollView>


    )

}
const mapStateProps = (state) => {
    const { team, client } = state

    return { team, client }
}



export default connect(mapStateProps)(InnerFoldersite)




