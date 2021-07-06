
import React, { useState } from 'react'
import { View, Text, TouchableOpacity, Linking, ScrollView } from 'react-native'
import { lightGrey, mediumGrey, textBlack, mainGrey, textGrey, mainWhite, darkGrey, mainBlue } from '../../../../common/Colors'
import { BASE_IMAGE_URL } from '../../../../store/endpoint'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
// import { fetch_folders_inner_files ,fetch_ohs_folders_inner_files} from '../components/common/action'
import {certificate_list3} from '../../Team/action'
import client from '../reducer'


const InnerFoldersite = ({ navigation, route, team, dispatch,client }) => {



    const { sub_files,selected_employee } = team
    const { selected_client } = client

    console.log("datdatfa"+JSON.stringify(sub_files))
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
        dispatch(certificate_list3(selected_client.id,item.id))
        setSection(2)

    }
    const call_nextapisecond = (item) => {

        setName1(item.name)
        setItemsecond(item)
        dispatch(certificate_list3(selected_client.id,item.id))
        setSection(3)
    }
    const call_next = () => {
        // name = ""
        setName("")
        dispatch(certificate_list3(selected_client.id,route.params.id))
        setItem("")
        setSection(1)
    }
    const call_nextsecond = () => {
        // setName1("")
        dispatch(certificate_list3(selected_client.id,item.id))
        setSection(2)
        setItemsecond("")
    }

    const call_image = (link) => {
        Linking.openURL( link)
    }


    if (sub_files.length === 0)
        return (
            <View style={{ flex: 1, backgroundColor: lightGrey }}>
                <View style={{ height: 10, backgroundColor: textGrey }}>

                </View>
                <View style={{ height: 45, backgroundColor: mediumGrey, flexDirection: 'row', }}>
                    <Text style={{ marginTop: 15, paddingLeft: 30, fontSize: 14 }}>{route.params.name}</Text>

                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 250 }}>
                    <Text style={{ textAlign: 'center' }}>No Files Found</Text>
                </View>
            </View>
        )




    return (

        <ScrollView style={{ backgroundColor: lightGrey }}
            showsVerticalScrollIndicator={false}>
            <View style={{ height: 10, backgroundColor: textGrey }}>

            </View>
            <View style={{ flex: 0.1, marginBottom: 10, }}>



                <View style={{ flex: 1, backgroundColor: lightGrey }}>
                    {section === 1 ? (
                        <View>


                            <View style={{ height: 45, backgroundColor: textGrey, flexDirection: 'row' }}>


                                <Text style={{ marginTop: 10, paddingLeft: 10, fontSize: 14 }}>{route.params.name}</Text>

                                {/* )} */}
                            </View>

                            <View style={{ flex: 1, backgroundColor: lightGrey }}>


                                <Text style={{ color: mainGrey, fontSize: 16, paddingLeft: 10, paddingTop: 20, fontWeight: 'bold' }}>Folders</Text>

                                <View style={{ paddingHorizontal: 10, marginTop: 10 }}>
                                    {sub_files.map((item, key) => {
                                        return (
                                            <View key={key}>

                                                { item.folders.length !== 0 ? (
                                                    <View>
                                                        { item.folders.map((unit, key2) => {
                                                            return (

                                                                <TouchableOpacity
                                                                    onPress={() => call_nextapi(unit)}>
                                                                    <View style={{

                                                                        flexDirection: 'row', height: 50, backgroundColor: textGrey,
                                                                        borderRadius: 10, marginTop: 10, borderWidth: 0.25, borderColor: mainGrey,
                                                                    }}>

                                                                        <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                                <Icon style={{ paddingLeft: 10 }}
                                                                                    name={"folder"} size={25} color={mainGrey} />
                                                                                {/* <Text style={{ paddingLeft: 10, color: textBlack, }}>{key + 1}</Text> */}
                                                                                <Text numberOfLines={1}
                                                                                    style={{ paddingLeft: 20, color: textBlack, paddingRight: 20 }}>{unit.name}</Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            )
                                                        })}
                                                    </View>
                                                ) : (
                                                        <View style={{ height: 150, justifyContent: 'center', alignItems: 'center', }}>
                                                            <Text style={{ textAlign: 'center', color: mainGrey }}>No Folder Found</Text>
                                                        </View>
                                                    )}
                                            </View>
                                        );
                                    })}

                                </View>
                                <Text style={{ color: mainGrey, fontSize: 16, paddingLeft: 10, paddingTop: 20, fontWeight: 'bold' }}>Files</Text>

                                <View style={{ paddingHorizontal: 10 }}>
                                    {sub_files.map((item, key) => {
                                        return (
                                            <View key={key}>

                                                {item.files.length !== 0 ? (
                                                    <View>
                                                        { item.files.map((unit, key2) => {
                                                            return (

                                                                <TouchableOpacity
                                                                    onPress={() => call_image(unit.url)}>
                                                                    <View style={{

                                                                        flexDirection: 'row', height: 50, backgroundColor: textGrey,
                                                                        borderRadius: 10, marginTop: 10, borderWidth: 0.25, borderColor: mainGrey,
                                                                    }}>

                                                                        <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 10, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                                {/* <Text style={{ paddingLeft: 10, color: textBlack, }}>{key + 1}</Text> */}
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
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                                                            <Text style={{ textAlign: 'center', color: mainGrey }}>No Files Found</Text>
                                                        </View>
                                                    )}
                                            </View>
                                        );
                                    })}

                                </View>

                            </View>
                        </View>
                    ) : section === 2 ? (
                        <View>

                            {name ? (
                                <View style={{ height: 45, backgroundColor: textGrey, flexDirection: 'row' }}>


                                    <TouchableOpacity onPress={() => call_next()}>
                                        <Text style={{ marginTop: 10, paddingLeft: 10, fontSize: 14 }}>{route.params.name}</Text>
                                    </TouchableOpacity>
                                    <Text style={{ marginTop: 10, paddingLeft: 10, fontSize: 16 }}>{">"}</Text>

                                    <Text style={{ marginTop: 10, paddingLeft: 10, fontSize: 14 }}>{name}</Text>



                                </View>
                            ) : (
                                    <View style={{ height: 45, backgroundColor: textGrey, flexDirection: 'row' }}>
                                        <Text style={{ marginTop: 10, paddingLeft: 10, fontSize: 14 }}>{route.params.name}</Text>

                                    </View>
                                )}

                            <View style={{ flex: 1, backgroundColor: lightGrey, paddingHorizontal: 10 }}>

                                <Text style={{ color: mainGrey, fontSize: 16, paddingTop: 20, fontWeight: 'bold' }}>Folders</Text>


                                <View style={{ marginTop: 10 }}>
                                    {sub_files.map((item, key) => {
                                        return (
                                            <View key={key}>
                                                { item.folders.length !== 0 ? (
                                                    <View>

                                                        { item.folders.map((unit, key2) => {
                                                            return (

                                                                <TouchableOpacity
                                                                    onPress={() => call_nextapisecond(unit)}>
                                                                    <View style={{

                                                                        flexDirection: 'row', height: 50, backgroundColor: textGrey,
                                                                        borderRadius: 10, marginTop: 10, borderWidth: 0.25, borderColor: mainGrey,
                                                                    }}>

                                                                        <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                                <Icon style={{ paddingLeft: 10 }}
                                                                                    name={"folder"} size={25} color={mainGrey} />
                                                                                {/* <Text style={{ paddingLeft: 10, color: textBlack, }}>{key + 1}</Text> */}
                                                                                <Text numberOfLines={1}
                                                                                    style={{ paddingLeft: 20, color: textBlack, paddingRight: 20 }}>{unit.name}</Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            )
                                                        })}
                                                    </View>
                                                ) : (
                                                        <View style={{ height: 150, justifyContent: 'center', alignItems: 'center', }}>
                                                            <Text style={{ textAlign: 'center', color: mainGrey }}>No Folder Found</Text>
                                                        </View>
                                                    )}
                                            </View>
                                        );
                                    })}

                                </View>
                                <Text style={{ color: mainGrey, fontSize: 16, paddingTop: 20, fontWeight: 'bold' }}>Files</Text>

                                <View >
                                    {sub_files.map((item, key) => {
                                        return (
                                            <View key={key}>
                                                {item.files.length !== 0 ? (
                                                    <View>

                                                        { item.files.map((unit, key2) => {
                                                            return (

                                                                <TouchableOpacity
                                                                    onPress={() => call_image(unit.url)}>
                                                                    <View style={{

                                                                        flexDirection: 'row', height: 50, backgroundColor: textGrey,
                                                                        borderRadius: 10, marginTop: 10, borderWidth: 0.25, borderColor: mainGrey,
                                                                    }}>

                                                                        <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                                {/* <Text style={{ paddingLeft: 10, color: textBlack, }}>{key + 1}</Text> */}
                                                                                <Icon1 style={{ paddingLeft: 10 }}
                                                                                    name="file-document-outline" size={25} color={mainGrey} />
                                                                                <Text numberOfLines={1}
                                                                                    style={{ paddingLeft: 20, color: textBlack, paddingRight: 30 }}>{unit.name}</Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            )
                                                        })}
                                                    </View>
                                                ) : (
                                                        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                                                            <Text style={{ textAlign: 'center', color: mainGrey }}>No Files Found</Text>
                                                        </View>
                                                    )}
                                            </View>
                                        );
                                    })}

                                </View>

                            </View>
                        </View>
                    ) : section === 3 ? (
                        <View>

                            {name && name1 ? (
                                <View style={{ height: 45, backgroundColor: textGrey, flexDirection: 'row' }}>


                                    <TouchableOpacity onPress={() => call_next()}>
                                        <Text style={{ marginTop: 10, paddingLeft: 10, fontSize: 14 }}>{route.params.name}</Text>
                                    </TouchableOpacity>
                                    <Text style={{ marginTop: 10, paddingLeft: 10, fontSize: 16 }}>{">"}</Text>
                                    <TouchableOpacity onPress={() => call_nextsecond()}>
                                        <Text style={{ marginTop: 10, paddingLeft: 10, fontSize: 14 }}>{name}</Text>
                                    </TouchableOpacity>
                                    <Text style={{ marginTop: 10, paddingLeft: 10, fontSize: 16 }}>{">"}</Text>

                                    <Text style={{ marginTop: 10, paddingLeft: 10, fontSize: 14 }}>{name1}</Text>


                                </View>
                            ) : (
                                    <View style={{ height: 45, backgroundColor: textGrey, flexDirection: 'row' }}>

                                        <Text style={{ marginTop: 10, paddingLeft: 10, fontSize: 14 }}>{route.params.name}</Text>
                                    </View>
                                )}

                            <View style={{ flex: 1, backgroundColor: lightGrey, paddingHorizontal: 10 }}>

                                <Text style={{ color: mainGrey, fontSize: 16, paddingTop: 20, fontWeight: 'bold' }}>Folders</Text>


                                <View style={{ marginTop: 10 }}>
                                    {sub_files.map((item, key) => {
                                        return (
                                            <View key={key}>

                                                {item.folders.length !== 0 ? (
                                                    <View>
                                                        { item.folders.map((unit, key2) => {
                                                            return (

                                                                <TouchableOpacity
                                                                    onPress={() => call_nextapisecond(unit)}>
                                                                    <View style={{

                                                                        flexDirection: 'row', height: 50, backgroundColor: textGrey,
                                                                        borderRadius: 10, marginTop: 10, borderWidth: 0.25, borderColor: mainGrey,
                                                                    }}>

                                                                        <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                                <Icon style={{ paddingLeft: 10 }}
                                                                                    name={"folder"} size={25} color={mainGrey} />
                                                                                {/* <Text style={{ paddingLeft: 10, color: textBlack, }}>{key + 1}</Text> */}
                                                                                <Text numberOfLines={1}
                                                                                    style={{ paddingLeft: 20, color: textBlack, paddingRight: 20 }}>{unit.name}</Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            )
                                                        })}
                                                    </View>
                                                ) : (
                                                        <View style={{ height: 150, justifyContent: 'center', alignItems: 'center', marginTop: 40 }}>
                                                            <Text style={{ textAlign: 'center' ,color:mainGrey}}>No Folder Found</Text>
                                                        </View>
                                                    )}
                                            </View>
                                        );
                                    })}

                                </View>
                                <Text style={{ color: mainGrey, fontSize: 16, paddingTop: 20, fontWeight: 'bold' }}>Files</Text>

                                <View>
                                    {sub_files.map((item, key) => {
                                        return (
                                            <View key={key}>

                                                {item.files.length !== 0 ? (
                                                    <View>
                                                        { item.files.map((unit, key2) => {
                                                            return (

                                                                <TouchableOpacity
                                                                    onPress={() => call_image(unit.url)}>
                                                                    <View style={{

                                                                        flexDirection: 'row', height: 50, backgroundColor: textGrey,
                                                                        borderRadius: 10, marginTop: 10, borderWidth: 0.25, borderColor: mainGrey,
                                                                    }}>

                                                                        <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 15, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                                                {/* <Text style={{ paddingLeft: 10, color: textBlack, }}>{key + 1}</Text> */}
                                                                                <Icon1 style={{ paddingLeft: 10 }}
                                                                                    name="file-document-outline" size={25} color={mainGrey} />
                                                                                <Text numberOfLines={1}
                                                                                    style={{ paddingLeft: 20, color: textBlack, paddingRight: 20 }}>{unit.name}</Text>
                                                                            </View>
                                                                        </View>
                                                                    </View>
                                                                </TouchableOpacity>
                                                            )
                                                        })}
                                                    </View>
                                                ) : (
                                                    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}>
                                                    <Text style={{ textAlign: 'center', color: mainGrey }}>No Files Found</Text>
                                                </View>
                                                    )}

                                            </View>
                                        );
                                    })}

                                </View>

                            </View>
                        </View>
                    ) : (
                                    null
                                )}
                </View>
            </View>
        </ScrollView>


    )

}
const mapStateProps = (state) => {
    const { team,client } = state

    return { team,client }
}



export default connect(mapStateProps)(InnerFoldersite)




