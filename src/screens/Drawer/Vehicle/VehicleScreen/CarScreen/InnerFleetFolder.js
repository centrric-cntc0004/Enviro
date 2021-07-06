
import React, { useState } from 'react'
import {StyleSheet, View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native'
import { lightGrey,mainBlack, mediumGrey, textBlack, mainGrey, textGrey, mainWhite, darkGrey, mainBlue } from '../../../../../common/Colors'
import { BASE_IMAGE_URL, INTRANET_FOLDERS_DELETE } from '../../../../../store/endpoint'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'

import {VEHICLE_FILE_CREATE,VEHICLE_FILE_EDIT,VEHICLE_FILE_DELETE, VEHICLE_FOLDER_DELETE,VEHICLE_FOLDER_CREATE,VEHICLE_FOLDER_RENAME,VEHICLE_FOLDER_LIST, FILES_FOLDERS_SEARCH,FILES_FOLDERS_SEARCHS, FILES_FILE_SEARCH, OHS_AND_S_FOLDERS,ACCOUNTS_FILES_FOLDER_GET
    ,INTRANET_FOLDER_EDIT ,OHS_AND_S_FILE_ADD,ACCOUNTS_FOLDER_CREATE,OHS_AND_S_FOLDER_DELETE} from '../../../../../store/endpoint'
import IntranetNewFolders from '../../../../Drawer/Intranet/components/IntranetNewFolder'

const InnerFleetFolder = ({vehicle_data, navigation, route, intranet_enviro, dispatch }) => {


    console.log("ksjdk"+JSON.stringify(vehicle_data))
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
        Linking.openURL(link)
    }


  



    return (

        <ScrollView style={{ backgroundColor: lightGrey }}
            showsVerticalScrollIndicator={false}>
            
            <View style={{flexDirection:'row',marginTop:10,paddingHorizontal:10}}>
                            <TouchableOpacity onPress={() => navigation.pop()}
                                    style={styles.topBox}>
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: mainBlue, fontSize: 16 }} >Back</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={{flex:8}}/>

                                <TouchableOpacity 
                                   >
                                    <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center' }}>
                                        <Text style={{ color: mainWhite, fontSize: 16 }} >Back</Text>
                                    </View>
                                </TouchableOpacity>
                                </View>
            <View style={{ flex: 0.1, marginBottom: 10, }}>


                <IntranetNewFolders APIURL={`${VEHICLE_FOLDER_LIST}${"car/"}${vehicle_data.id}/`} title={'Accounts'} FILEEDIT={VEHICLE_FILE_EDIT}
                    FOLDEREDIT={VEHICLE_FOLDER_RENAME} FOLDERADD={VEHICLE_FOLDER_CREATE} FOLDERCREATE={VEHICLE_FOLDER_CREATE}
                    FOLDERDELETE={VEHICLE_FOLDER_DELETE} FILEDELETE={VEHICLE_FILE_DELETE} FILEADD={VEHICLE_FILE_CREATE}
                    id={route.params.id} name={route.params.name}SELETPATH={"vehicle_car"} SELECTID={vehicle_data.id}/>
            </View>
        </ScrollView>

    )

}
const mapStateProps = (state) => {
    const { vehicle_data } = state.vehicle_cars

    return { vehicle_data }
}



export default connect(mapStateProps)(InnerFleetFolder)




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
