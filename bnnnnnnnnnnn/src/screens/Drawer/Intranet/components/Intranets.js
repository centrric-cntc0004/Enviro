

import React, { useState,useEffect } from 'react'
import {
    View, Text, TouchableOpacity, ActivityIndicator, Linking, RefreshControl, TextInput,
} from 'react-native'
import { lightGreen, lightGrey, mainGrey, textBlack, mainBlue, mainWhite, textGrey, darkGrey, mediumGrey } from '../../../../common/Colors'
import { BASE_IMAGE_URL ,FILES_FOLDERS_SEARCH,FILES_FILE_SEARCH,OHS_AND_S_FOLDERS} from '../../../../store/endpoint'
import Api from '../../../../store/api'

import { connect } from 'react-redux'
import { ScrollView } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import { fetch_folders_inner_files, fetch_folders_files, fetch_ohs_folders_files, fetch_ohs_folders_inner_files, search_folder_list } from '../components/common/action'
import { folder_details } from '../../Team/action'

let a = 0
const Intranets = ({ navigation, intranet_enviro, dispatch }) => {


    const { folders_files, isLoading ,datafolder,dataFile} = intranet_enviro
    console.log("skjdfhkjshfkds"+JSON.stringify(dataFile))
    let dummyData = ['Folders', 'Files']
    const [selected, setSelected] = useState(dummyData[0])
    const [loadData, setLoadData] = useState(false)
    const [folderType, setFolderType] = useState('general')

    // let dataA=[]
    // let dataFiles=[]
    // if(folders_files){
    //     if(folders_files[0]){
    //         if(folders_files[0].folders && folders_files[0].files){
    //             dataA=folders_files[0].folders
    //             dataFiles=folders_files[0].files
    //         }
    //     }
    // }

    const[data,setData]=useState(datafolder)
    const[dataB,setDataB]=useState(dataFile)
    const [loader, setLoader] = useState(true)

  
    // const { files, folders } = response.folders[0]
    //         setFoldersData(folders)
    //         setFilesData(files)
    const call_image = (link) => {
        Linking.openURL( link)
    }


    const call_nextapi = (item) => {
        dispatch(fetch_ohs_folders_inner_files(item.id))
        navigation.navigate("enviro-Folders", { name: item.name, id: item.id })
    }
    useEffect(() => {
            
        const fetch_initail_folderz = () => {
            let api_url = `${OHS_AND_S_FOLDERS}${1}/`
            console.log(api_url)
            Api('get', api_url).then(response => {
                console.log('FILES-FOLDERS',response)
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
    const search_folder = (txt,foldertype) => {
        // dispatch(search_folder_list(txt))

       

        // Api('post-form', FILES_FOLDERS_SEARCH, data).then(response => {
        //     console.log("hjgjhghjgjh"+JSON.stringify(response))
        //     setData(response)
        // }
           
        if(txt==""){
            fetch_initail_folder()
        }else{
            let data1 = new FormData()
            data1.append('key',txt)
            data1.append('folder_id', 1)
            data1.append('search_type',foldertype)
    
            Api('post-form1', FILES_FOLDERS_SEARCH, data1).then(response =>  {
                console.log("response"+JSON.stringify(response))
                if(response.status>=400){
                    setData([])
                }else if(response.status===200){
                    setData(response.data)

                }
            })
       
        }
       
            
            // )
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
    
    const search_file = (txt,foldertype) => {
        // dispatch(search_folder_list(txt))

       

        // Api('post-form', FILES_FOLDERS_SEARCH, data).then(response => {
        //     console.log("hjgjhghjgjh"+JSON.stringify(response))
        //     setData(response)
        // }
           
        if(txt===""){
            fetch_initail_folder()

        }else{
            let data1 = new FormData()
            data1.append('key',txt)
            data1.append('folder_id', 1)
            data1.append('search_type',foldertype)
            const success = (response) => {
                        }

            const failed = (response) => {
               

            }

            console.log("ooo"+JSON.stringify(folders_files[0].files))
    
            Api('post-form1', FILES_FILE_SEARCH, data1,success,failed).then(response =>
                {
                    console.log("response"+JSON.stringify(response))
                    if(response.status>=400){
                        setDataB([])
                    }else if(response.status===200){
                        if(response.data){
                            if(response.data.folders){
                                if(response.data.folders[0].files){
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
            <ScrollView style={{ backgroundColor: lightGrey }}
            showsVerticalScrollIndicator={false}
            refreshControl={
                <RefreshControl refreshing={loadData} onRefresh={fetchfiles} />
            }>
            <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: lightGrey, marginBottom: 40 }}>
                <View style={{ height: 10, backgroundColor: lightGrey }}>

                </View>

                <Text style={{ paddingLeft: 10, paddingTop: 10, color: mainGrey, fontSize: 16, fontWeight: 'bold' }}>Folders</Text>

                <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', marginTop: '5%', paddingLeft: 25, borderRadius: 20, height: 42, borderWidth: 0.2, backgroundColor: mainWhite, borderColor: darkGrey }}>
                    <TextInput
                        style={{ fontSize: 14, color: '#000', width: '70%', height: 40 }}
                        placeholder='Search by Folder Name'
                        autoCorrect={false}
                        onChangeText={(txt) => {
                            // setKeyword(txt)
                            search_folder(txt,folderType)
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
                                { data.map((unit, key2) => {
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
                                                            style={{ paddingLeft: 20, color: textBlack, paddingRight: 20 }}>{unit.name}</Text>
                                                    </View>

                                                </View>
                                            </View>
                                        </TouchableOpacity>
                                    )
                                })}
                            </View>
                        );
                    })}

                </View>

                <Text style={{ paddingLeft: 10, paddingTop: 20, color: mainGrey, fontSize: 16, fontWeight: 'bold' }}>Files</Text>
                <View style={{ marginLeft: 10, marginRight: 10, flexDirection: 'row', marginTop: '5%', paddingLeft: 25, borderRadius: 20, height: 42, borderWidth: 0.2, backgroundColor: mainWhite, borderColor: darkGrey }}>
                    <TextInput
                        style={{ fontSize: 14, color: '#000', width: '70%', height: 40 }}
                        placeholder='Search by Folder Name'
                        autoCorrect={false}
                        onChangeText={(txt) => {
                            // setKeyword(txt)
                            search_file(txt,folderType)
                        }}
                    />
                    {/* <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', width: '30%', height: 40, backgroundColor: mediumGrey, borderRadius: 30 }}>
                        <Text style={{ color: textBlack }}>Search</Text>
                    </TouchableOpacity> */}
                </View>
                    
                <View style={{ flex: 1, backgroundColor: lightGrey, marginTop: '3%' }}>

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

                </View>

            </View>
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




