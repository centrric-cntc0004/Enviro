import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, } from 'react-native'
import { mainWhite, mainGrey, darkGrey, mainBlack, mainBlue } from './Colors'
import AsyncStorage from '@react-native-community/async-storage'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { TeamImage } from './Images'
import { BASE_IMAGE_URL } from '../store/endpoint'
import { connect } from 'react-redux'
import{delete_firebase_key} from '../screens/login/action'


let profile_data = ""
let name = ""
let type = ""
let token=""
let profile_permission = { "tabs": { "home": true, "ohs_s": true, "sales": true, "intranet": true, "Schedule": true, "client": true, "team": true, "vehicle": true }, "vehicle": { "add": true, "eidt": true, "delete": true } }
function EnviroDrawer({ navigation, dispatch, }) {
    const getProfile = async () => {
        const profileData = await AsyncStorage.getItem('enviro-profile')
        const tokenkey=await AsyncStorage.getItem('notification_key')
        token=JSON.parse(tokenkey)
        if (profileData) {
            profile_data = JSON.parse(profileData);
            name = profile_data.name
            type = profile_data.user_type
        }
        console.log("profile" + JSON.stringify(profileData))

    }

    useEffect(() => {
        getProfile()
    })
    const RenderDrawables = ({ navigation }) => {
        const pageHomeNavClick = (page) => {
            navigation.navigate('Home', {
                screen: page
            })

        }

        return (
            <View style={{ flex: 1, paddingHorizontal: 40, marginBottom: 20 }}>
                {profile_permission.tabs.home === true ? (
                    <TouchableOpacity onPress={() => pageHomeNavClick('Enviro')}
                        style={{ flex: 4 }}>
                        <View style={{ flex: 1, flexDirection: 'row' }}>

                            <View style={{ flex: 4, flexDirection: 'row', alignSelf: 'center' }}>
                                <Icon name="home" color={mainGrey} size={20} />

                                <Text style={{ color: mainBlack, fontWeight: '600', fontSize: 16, paddingLeft: 20 }}>Home</Text>

                            </View>



                        </View>
                    </TouchableOpacity>
                ) : (
                        <View
                            style={{ opacity: 0.6, flex: 4 }}>
                            <View style={{ flex: 1, flexDirection: 'row' }}>

                                <View style={{ flex: 4, flexDirection: 'row', alignSelf: 'center' }}>
                                    <Icon name="home" color={mainGrey} size={20} />

                                    <Text style={{ color: mainBlack, fontWeight: '600', fontSize: 16, paddingLeft: 20 }}>Home</Text>

                                </View>

                                <View style={{ opacity: 0.6, flex: 4, flexDirection: 'row', alignSelf: 'center' }}>
                                    <Icon name="home" color={mainGrey} size={20} />

                                    <Text style={{ color: mainBlack, fontWeight: '600', fontSize: 16, paddingLeft: 20 }}>Home</Text>

                                </View>

                            </View>
                        </View>
                    )}
                <TouchableOpacity
                    style={{ flex: 4 }}>
                    {profile_permission.tabs.sales === true ? (
                        <TouchableOpacity onPress={() => navigation.navigate('Sales')}
                            style={{ flex: 1, flexDirection: 'row' }}>

                            <View style={{ flex: 4, flexDirection: 'row', alignSelf: 'center' }}>
                                <Icon name="stars" color={mainGrey} size={20} />

                                <Text style={{ color: mainBlack, fontWeight: '600', fontSize: 16, paddingLeft: 20 }}>Sales</Text>
                            </View>




                        </TouchableOpacity>
                    ) : (
                            <View
                                style={{ flex: 1, flexDirection: 'row' }}>

                                <View style={{ flex: 4, flexDirection: 'row', alignSelf: 'center' }}>
                                    <Icon name="stars" color={mainGrey} size={20} />

                                    <Text style={{ color: mainBlack, fontWeight: '600', fontSize: 16, paddingLeft: 20 }}>Sales</Text>
                                </View>




                            </View>
                        )}
                </TouchableOpacity>
                {profile_permission.tabs.vehicle === true ? (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('Vehicle')}
                        style={{ flex: 4, flexDirection: 'row' }}>

                        <View style={{ flex: 4, flexDirection: 'row', alignSelf: 'center' }}>
                            <Icon name="local-shipping" color={mainGrey} size={20} />

                            <Text style={{ color: mainBlack, fontWeight: '600', fontSize: 16, paddingLeft: 20 }}>Vehicle</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                        <View

                            style={{ opacity: 0.6, flex: 4, flexDirection: 'row' }}>

                            <View style={{ flex: 4, flexDirection: 'row', alignSelf: 'center' }}>
                                <Icon name="local-shipping" color={mainGrey} size={20} />

                                <Text style={{ color: mainBlack, fontWeight: '600', fontSize: 16, paddingLeft: 20 }}>Vehicle</Text>
                            </View>
                        </View>
                    )}

                {profile_permission.tabs.client === true ? (
                    <TouchableOpacity onPress={() => navigation.navigate('Clients')}
                        style={{ flex: 4, flexDirection: 'row', }}>

                        <View style={{ flex: 4, flexDirection: 'row', alignSelf: 'center' }}>
                            <Icon name="person" color={mainGrey} size={20} />

                            <Text style={{ color: mainBlack, fontWeight: '600', fontSize: 16, paddingLeft: 20 }}>Site</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                        <View
                            style={{ opacity: 0.6, flex: 4, flexDirection: 'row', }}>

                            <View style={{ flex: 4, flexDirection: 'row', alignSelf: 'center' }}>
                                <Icon name="person" color={mainGrey} size={20} />

                                <Text style={{ color: mainBlack, fontWeight: '600', fontSize: 16, paddingLeft: 20 }}>Clients</Text>
                            </View>
                        </View>
                    )}

                {profile_permission.tabs.ohs_s === true ? (
                    <TouchableOpacity onPress={() => navigation.navigate('Projection')}
                        style={{ flex: 4, flexDirection: 'row', }}>

                        <View style={{ flex: 4, flexDirection: 'row', alignSelf: 'center' }}>
                            <Icon name="open-with" color={mainGrey} size={20} />

                            <Text style={{ color: mainBlack, fontWeight: '600', fontSize: 16, paddingLeft: 20 }}>OH & S</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                        <View
                            style={{ opacity: 0.6, flex: 4, flexDirection: 'row', }}>

                            <View style={{ flex: 4, flexDirection: 'row', alignSelf: 'center' }}>
                                <Icon name="open-with" color={mainGrey} size={20} />

                                <Text style={{ color: mainBlack, fontWeight: '600', fontSize: 16, paddingLeft: 20 }}>OH & S</Text>
                            </View>
                        </View>
                    )}

                {profile_permission.tabs.Schedule === true ? (
                    <TouchableOpacity onPress={() => navigation.navigate('Report')}
                        style={{ flex: 4, flexDirection: 'row' }}>

                        <View style={{ flex: 4, flexDirection: 'row', alignSelf: 'center' }}>
                            <Icon name="today" color={mainGrey} size={20} />

                            <Text style={{ color: mainBlack, fontWeight: '600', fontSize: 16, paddingLeft: 20 }}>Scheduling</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                        <View
                            style={{ opacity: 0.6, flex: 4, flexDirection: 'row' }}>

                            <View style={{ flex: 4, flexDirection: 'row', alignSelf: 'center' }}>
                                <Icon name="today" color={mainGrey} size={20} />

                                <Text style={{ color: mainBlack, fontWeight: '600', fontSize: 16, paddingLeft: 20 }}>Scheduling</Text>
                            </View>
                        </View>
                    )}
                {profile_permission.tabs.intranet === true ? (
                    <TouchableOpacity onPress={() => navigation.navigate('Intranet')}
                        style={{ flex: 4, flexDirection: 'row' }}>

                        <View style={{ flex: 4, flexDirection: 'row', alignSelf: 'center' }}>
                            <Icon name="language" color={mainGrey} size={20} />

                            <Text style={{ color: mainBlack, fontWeight: '600', fontSize: 16, paddingLeft: 20 }}>Intranet</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                        <View
                            style={{ opacity: 0.6, flex: 4, flexDirection: 'row' }}>

                            <View style={{ flex: 4, flexDirection: 'row', alignSelf: 'center' }}>
                                <Icon name="language" color={mainGrey} size={20} />

                                <Text style={{ color: mainBlack, fontWeight: '600', fontSize: 16, paddingLeft: 20 }}>Intranet</Text>
                            </View>
                        </View>
                    )}
                {profile_permission.tabs.team === true ? (
                    <TouchableOpacity onPress={() => navigation.navigate('Team')}
                        style={{ flex: 4, flexDirection: 'row' }}>

                        <View style={{ flex: 4, flexDirection: 'row', alignSelf: 'center' }}>
                            <Icon name="group" color={mainGrey} size={20} />

                            <Text style={{ color: mainBlack, fontWeight: '600', fontSize: 16, paddingLeft: 20 }}>Team</Text>
                        </View>
                    </TouchableOpacity>
                ) : (
                        <View
                            style={{ opacity: 0.6, flex: 4, flexDirection: 'row' }}>

                            <View style={{ flex: 4, flexDirection: 'row', alignSelf: 'center' }}>
                                <Icon name="group" color={mainGrey} size={20} />

                                <Text style={{ color: mainBlack, fontWeight: '600', fontSize: 16, paddingLeft: 20 }}>Team</Text>
                            </View>
                        </View>
                    )}

            </View>
        )
    }

    const auth_logout = async () => {
        // let form_body = new FormData()
        // form_body.append("keys",token.keys)
        // const success=()=>{

        // }
        // const failed=()=>{

        // }
        
        // dispatch(delete_firebase_key(form_body,success,failed))
        try {
            await AsyncStorage.clear()
            dispatch({ type: 'USER_LOGOUT' })
            //   navigation.navigate("Login")
        } catch (error) {
        }
    }

    if (profile_data.dp) {
        var profPic = { uri: BASE_IMAGE_URL + profile_data.dp };
    } else {
        var profPic = TeamImage;

    }
    return (

        <View style={{ flex: 1, backgroundColor: mainWhite }}>
            <View style={{ flex: 3.5, backgroundColor: mainWhite, justifyContent: 'center' }}>

                <View style={{ flex: 1.5 }} />

                <TouchableOpacity onPress={()=>navigation.navigate('Profile')}
                style={{ flex: 3, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20 }}>
                    <View style={{ flex: 2, flexDirection: 'row' }}>
                        <Image style={{ height: 70, width: 70, borderRadius: 35 }} source={profPic} />
                    </View>
                    <View style={{ flex: 5, marginLeft: 20 }}>
                        <Text style={{ fontSize: 18, fontWeight: '400', color: mainBlack }}>{name}</Text>

                        <View style={{ marginTop: 10, width: 100, height: 25, justifyContent: 'center', alignItems: 'center', backgroundColor: mainWhite, borderWidth: 1, borderColor: mainBlue, borderRadius: 50 }}>
                            <Text style={{ fontSize: 12, color: mainBlack, }}>{type}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <View style={{ flex: 1.5, alignItems: 'center' }}>
                </View>
            </View>
            <View style={{ flex: 11.5 }}>

                <RenderDrawables navigation={navigation} />
            </View>

            <View style={{ flex: 2, paddingLeft: 30 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ flex: 1, justifyContent: 'center' }}>

                        </View>
                        <View style={{ flex: 4, justifyContent: 'center' }}>
                            <View style={{ height: 0.5, width: '100%', backgroundColor: mainGrey }} />
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => auth_logout()}
                        style={{ flex: 2, flexDirection: 'row' }}>

                        <View style={{ flex: 4, justifyContent: 'center' }}>
                            <Text style={{ color: darkGrey, fontWeight: '600', fontSize: 16, paddingLeft: 10 }}>Logout Account</Text>
                        </View>
                    </TouchableOpacity>

                </View>
            </View>
        </View>

    )
}


const mapStateProps = (state) => {
    const { } = state
    return {}
}


export default connect(mapStateProps)(EnviroDrawer)



