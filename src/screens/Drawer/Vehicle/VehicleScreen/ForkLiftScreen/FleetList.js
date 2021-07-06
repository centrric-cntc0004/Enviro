

import React, { useState, useEffect } from 'react'
import {
    StyleSheet,
    View, Text, TouchableOpacity, ActivityIndicator, Linking, RefreshControl, TextInput,Alert
} from 'react-native'
import { lightGreen, lightGrey, mainBlack, mainGrey, textBlack, mainBlue, mainWhite, textGrey, darkGrey, mediumGrey } from '../../../../../common/Colors'
import { BASE_IMAGE_URL,VEHICLE_FOLDER_DELETE,VEHICLE_FOLDER_CREATE,VEHICLE_FOLDER_RENAME,VEHICLE_FOLDER_LIST, FILES_FOLDERS_SEARCH,FILES_FOLDERS_SEARCHS, FILES_FILE_SEARCH, OHS_AND_S_FOLDERS,ACCOUNTS_FILES_FOLDER_GET
,INTRANET_FOLDER_EDIT ,OHS_AND_S_FILE_ADD,ACCOUNTS_FOLDER_CREATE,OHS_AND_S_FOLDER_DELETE} from '../../../../../store/endpoint'
import Api from '../../../../../store/api'
import Modal from 'react-native-modal'
import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/MaterialIcons'
import Icon1 from 'react-native-vector-icons/Entypo'

let a = 0
import Toast from 'react-native-simple-toast';
import MainFolder from '../../../Intranet/components/MainFolder'

const FeetList = ({ navigation, intranet_enviro, dispatch ,route}) => {


    const { folders_files, isLoading, datafolder, dataFile } = intranet_enviro
    let dummyData = ['Folders', 'Files']
    const [selected, setSelected] = useState(dummyData[0])
    const [loadData, setLoadData] = useState(false)
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

    let button_enable =false
    if(title){
        button_enable=true
    }else{
        button_enable=false

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
   
    return (
        <ScrollView style={{ backgroundColor: lightGrey }}
            showsVerticalScrollIndicator={false}
           
            >
            <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: lightGrey, marginBottom: 40 }}>
                <View style={{ height: 10, backgroundColor: lightGrey }}>

                </View>
                <View style={{flexDirection:'row'}}>
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
                <MainFolder navigation={navigation} APIURL=
                {`${VEHICLE_FOLDER_LIST}${"fork-lift/"}${route.params.items.id}/`}
               FOLDEREDIT={VEHICLE_FOLDER_RENAME} FOLDERADD={OHS_AND_S_FILE_ADD} FOLDERCREATE={VEHICLE_FOLDER_CREATE} 
               FOLDERDELETE={VEHICLE_FOLDER_DELETE} SELETPATH={"vehicle_forklift"} SELECTID={route.params.items.id} />

                </View>
        </ScrollView>
    )



  

}

const mapStateProps = (state) => {
    const { intranet_enviro } = state

    return { intranet_enviro }
}



export default connect(mapStateProps)(FeetList)



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

