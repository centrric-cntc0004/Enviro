



import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, TouchableOpacity, Dimensions } from 'react-native'
import { mainWhite, lightGrey, mainGrey, mainBlue, textlightgrey } from '../../../../../common/Colors'
import Icon from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-community/async-storage'
import Api from '../../../../../store/api'
let profile_permission = { "tabs": { "home": true, "ohs_s": true, "sales": true, "intranet": true, "Schedule": true, "client": true, "team": true, "vehicle": true }, "vehicle": { "add": true, "eidt": true, "delete": true } }
import {PROFILE_PERMISSION} from '../../../../../store/endpoint'
let width = Dimensions.get('window').width / 3.88
const HomeList = ({ navigation }) => {

    useEffect(() => {
            
        Api('get', PROFILE_PERMISSION)
        .then(async response => {
            profilePermission=response

            await AsyncStorage.setItem('enviro-permission', JSON.stringify(response))

        })

        getProfile()


    
    }, [])

    const getProfile = async () => {
        const profilePermission = await AsyncStorage.getItem('enviro-permission')
        if (profilePermission) {
            profile_permission = JSON.parse(profilePermission);
        }
    }
    const RenderContacts = ({ navigation }) => {


        // const DATA = [1, 45, 7];
        const DATA = [{ "type": "Sales", "name": "stars", "opacity": profile_permission.tabs.sales },
        { "type": "Vehicles", "name": "local-shipping", "opacity": profile_permission.tabs.vehicle },
        { "type": "OH & S", "name": "open-with", "opacity": profile_permission.tabs.ohs_s },
        { "type": "Site", "name": "person", "opacity": profile_permission.tabs.client },
        { "type": "Scheduling", "name": "today", "opacity": profile_permission.tabs.Schedule },
        { "type": "Intranet", "name": "language", "opacity": profile_permission.tabs.intranet },
        { "type": "Team", "name": "group", "opacity": profile_permission.tabs.team }]
        const [selected, setSelected] = useState()


        const RenderList = ({ item }) => {

            return (
                <View>
                    {item.opacity === true ? (
                        <TouchableOpacity
                            onPress={() => call_navigate(item.type)}
                            style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite, borderWidth: 0.3, borderColor: textlightgrey, height: 90, marginLeft: 15, width: width, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}  >
                            <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                <Icon name={item.name} color={mainBlue} size={25} />
                            </View>
                            <View style={{ flex: 2, backgroundColor: mainWhite, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                                <Text numberOfLines={1}
                                    style={{ fontSize: 14, color: mainGrey, }}>{item.type}</Text>

                            </View>

                        </TouchableOpacity>
                    ) : (
                            <View

                                style={{ opacity: 0.4, justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite, borderWidth: 0.3, borderColor: textlightgrey, height: 90, marginLeft: 15, width: width, justifyContent: 'center', alignItems: 'center', marginTop: 15 }}  >
                                <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
                                    <Icon name={item.name} color={mainBlue} size={25} />
                                </View>
                                <View style={{ flex: 2, backgroundColor: mainWhite, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
                                    <Text numberOfLines={1}
                                        style={{ fontSize: 14, color: mainGrey, }}>{item.type}</Text>

                                </View>

                            </View>
                        )}
                </View>


            )

        }



        const call_navigate = (type) => {
            if (type === "Sales") {
                navigation.navigate('Sales')

            } else if (type === "Vehicles") {
                navigation.navigate('Vehicle')

            } else if (type === "OH & S") {
                navigation.navigate('Projection')

            } else if (type === "Site") {
                navigation.navigate('Clients')
            } else if (type === "Scheduling") {
                navigation.navigate('Report')

            } else if (type === "Intranet") {
                navigation.navigate('Intranet')


            } else if (type === "Team") {
                navigation.navigate('Team')

            }

        }

        return (
            <View style={{ flex: 1, backgroundColor: lightGrey, marginLeft: 10, paddingRight: 10 }}>
                <FlatList style={{ marginTop: '1%' }}
                    data={DATA}
                    renderItem={RenderList}
                    numColumns={3}
                    keyExtractor={(item, key) => key.toString()}
                    showsHorizontalScrollIndicator={false}
                    onEndReachedThreshold={1}
                    refreshing={false}
                />
            </View>
        )
    }

    return (

        <RenderContacts navigation={navigation} />


    )

}

export default HomeList



