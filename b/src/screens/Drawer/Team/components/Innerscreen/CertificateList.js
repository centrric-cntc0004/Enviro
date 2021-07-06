import React from 'react'
import { View, Text, FlatList, Dimensions,Linking } from 'react-native'
import { lightGrey, darkGrey,mainGrey, lightGreyBackground, textGrey, textBlack, mainWhite } from '../../../../../common/Colors'
import Icon from 'react-native-vector-icons/FontAwesome'
import { TouchableOpacity } from 'react-native'
import Icon1 from 'react-native-vector-icons/MaterialCommunityIcons'
import {certificate_list2} from '../../action'
import { connect } from 'react-redux'
import {BASE_IMAGE_URL} from '../../../../../store/endpoint'

const CertificateList = ({ navigation, values, data,dispatch ,team}) => {
    let width = Dimensions.get('window').width / 3.39
    const DATA = [{ id: 1, "name": "driving liscence" }, { id: 1, "name": "driving liscence" }, { id: 1, "name": "driving liscence" }]
    const { selected_employee, folder_emp } = team
    console.log("hghjghjgjh"+JSON.stringify(data))


    
    const RenderItems1 = ({ item }) => {

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("EmployeeFiles", { items: item.files, name: item.folder_name })}
                style={{
                    justifyContent: 'center', alignItems: 'center',
                    height: 40, flexDirection: 'row', width: width, margin: 8, marginLeft: 20
                }} >
                <Icon name='folder' color={darkGrey} size={25}
                    style={{ alignSelf: 'center', marginLeft: 20 }} />
                <View style={{ flex: 0.4 }} />
                <Text numberOfLines={1}
                    style={{ alignSelf: 'center', width: 100, marginLeft: 10 }}>{item.folder_name}</Text>
            </TouchableOpacity>
        )
    }


    const call_nextapi = (item) => {
         dispatch(certificate_list2(selected_employee.id,item.id))
        navigation.navigate("EmployeeFiles", { name: item.name, id: item.id })
    }

    const call_image = (link) => {
        Linking.openURL(BASE_IMAGE_URL + link)
    }

    return (
        <View style={{ flex: 1, backgroundColor: mainWhite, }}>
            <View style={{ flex: 1, backgroundColor:lightGreyBackground, height: 50 }}>

                <Text style={{ paddingLeft: 10,paddingTop:15, color: textBlack }}>Employees Folder</Text>
            </View>

            {/* <FlatList
                style={{ backgroundColor: lightGrey }}
                data={data}
                renderItem={RenderItems}
                numColumns={3}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item,
                     key) => key.toString()}
            /> */}


<View style={{ flex: 1, backgroundColor: mainWhite, marginTop: '3%',marginBottom:10, }}>

    {data.folders.map((item, key) => {
        return (
            <View key={key}>
                {item.folders.length !== 0 ? (
                    <View>
                        { item.folders.map((unit, key2) => {
                            return (
                                <TouchableOpacity onPress={() => call_nextapi(unit)}>
                                    <View style={{marginLeft:10,marginRight:10,
                                        flexDirection: 'row', height: 50, backgroundColor: textGrey,
                                        marginTop: 10, borderWidth: 0.25, borderColor: mainGrey, borderRadius: 10
                                    }}>

                                        <View style={{ flex: 1, backgroundColor: textGrey, marginTop: 10, marginBottom: 10, marginLeft: 5, marginRight: 10, }}>
                                            <View style={{ flex: 1, flexDirection: 'row' }}>
                                                <Icon1 style={{ paddingLeft: 10 }}
                                                    name="folder" size={25} color={mainGrey} />
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
                            <Text>No Folder Found</Text>
                        </View>
                    )}
            </View>
        );
    })}

</View>


<Text style={{ paddingLeft: 10, fontSize: 16, fontWeight: 'bold' }}>Files</Text>

<View style={{ flex: 1, backgroundColor: mainWhite, marginTop: '3%' }}>

    {data.folders.map((item, key) => {
        return (
            <View key={key}>
                {item.files.length !== 0 ? (
                    <View>
                        { item.files.map((unit, key2) => {
                            return (
                                <TouchableOpacity onPress={() => call_image(unit.url)}>
                                    <View style={{marginLeft:10,marginRight:10,
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
                        <View style={{ marginTop: 20,marginBottom:50, justifyContent: 'center', alignItems: 'center' }}>
                            <Text>No Files Found</Text>
                        </View>
                    )}
            </View>
        );
    })}

</View>


        </View>
    )
}

const mapPropState = (state) => {
    const { team, all_folders } = state
    return { team, all_folders }
}
export default connect(mapPropState)(CertificateList)

