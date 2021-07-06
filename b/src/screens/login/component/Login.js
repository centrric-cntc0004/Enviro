import React, { useState, useRef, useEffect } from 'react'
import { View, Text, TouchableOpacity, Image, TextInput, ActivityIndicator } from 'react-native'
import { EnviroLogo } from '../../../common/Images'
import { connect } from 'react-redux'
import { signin, fetch_permission_list } from '../action'
let alert = ""
let fcmToken=''
import NotificationListener from '../../../store/pushnotification/PushNotification'

import { mainWhite, mainGrey, mainBackground, mainBlue, varientGrey } from '../../../common/Colors'

const Login = ({ ownprops, isLoading, dispatch }) => {

    const [loginPageStatus, setloginPageStatus] = useState(true)

    

    useEffect(() => {
        let loadingInterval = setInterval(() => {
            setloginPageStatus(false)
           
         
            clearInterval(loadingInterval)
        }, 2500)
        return () => {
            clearInterval(loadingInterval)
        }
    }, [])

   

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [buttonLoader, setButtonLoader] = useState(false)

    const loginFx = () => {
        setButtonLoader(true)
        let data = {
            username,
            password,
           
        }
       
        // let form_body = new FormData()
        // form_body.append("keys",fcmToken)

        if (username && password) {
            dispatch(signin(data))

            let loadingInterval = setInterval(() => {
                setButtonLoader(false)
                clearInterval(loadingInterval)

            }, 10500)
            return () => {
                clearInterval(loadingInterval)
            }


        }
    }




    let button_opacity = 0.6
    let button_disable = true
    username && password ? button_opacity = 1 : button_opacity = 0.6
    username && password ? button_disable = false : button_disable = true

    const ref_loginButton = useRef()
    const ref_password = useRef()



    if (loginPageStatus) return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={mainBlue} />
        </View>
    )

    return (
        <>

        <View style={{ flex: 1, backgroundColor: mainBackground }}>
            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}>
            </View>
            <View style={{ flex: 4.5, paddingHorizontal: 30 }}>
                <View style={{ flex: 1, backgroundColor: mainBackground, borderRadius: 20, padding: 15 }}>
                    <View style={{ flex: 5, justifyContent: 'center', alignItems: 'center' }}>
                        <Image style={{}} source={EnviroLogo} />
                    </View>
                    {/* <RenderLoginContents  /> */}
                    <View style={{ flex: 10, justifyContent: 'center', paddingHorizontal: 10, }}>
                        <View style={{ height: 160 }}>
                            <View style={{ flex: 1, }}>
                                <View style={{ flex: 2, }}>
                                    <View style={{ flex: 3, flexDirection: 'row' }}>
                                        <View style={{ flex: 4, height: 45, justifyContent: 'center', backgroundColor: mainWhite }}>
                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                style={{width:'90%', color: mainGrey, fontSize: 16, alignSelf: 'center', textAlign: "center", }}
                                                autoCapitalize='none'
                                                value={username}
                                                placeholderTextColor={varientGrey}
                                                placeholder="Username"
                                                onSubmitEditing={() => ref_password.current.focus()}
                                                onChangeText={txt => setUsername(txt)}
                                            />
                                        </View>

                                    </View>
                                </View>

                                <View style={{ flex: 4 }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <View style={{ flex: 6, height: 45, justifyContent: 'center', backgroundColor: mainWhite }}>
                                            <TextInput
                                                underlineColorAndroid="transparent"
                                                style={{width:'90%', color: mainGrey, fontSize: 16, alignSelf: 'center', textAlign: "center", }}
                                                autoCapitalize='none'
                                                placeholderTextColor={varientGrey}
                                                placeholder="Password"
                                                value={password}
                                                secureTextEntry
                                                autoFocus={false}
                                                ref={ref_password}
                                                onSubmitEditing={() => loginFx()}
                                                onChangeText={txt => setPassword(txt)}
                                            />
                                        </View>

                                    </View>
                                    <View style={{ flex: 1 }}>
                                        <View style={{ flex: 1, flexDirection: 'row', }}>
                                            <View style={{ flex: 2 }}>
                                                <Text style={{ color: '#f00' }}>{alert}</Text>
                                            </View>

                                        </View>

                                    </View>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 0.3, justifyContent: 'center', alignItems: 'center' }}>
                            <TouchableOpacity ref={ref_loginButton} disabled={button_disable} onPress={() => loginFx()} style={{ opacity: button_opacity, height: 40, width: 220, backgroundColor: mainBlue, justifyContent: 'center', alignItems: 'center' }}>
                                {
                                    isLoading ? (<ActivityIndicator size="small" color={mainWhite} />) : (<Text style={{ color: mainWhite, fontSize: 18 }}>Login</Text>)
                                }

                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* <NotificationListener /> */}



                </View>
            </View>

            <View style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>

            </View>

        </View>
        </>

    )
}

const mapsStateProps = (state, ownprops) => {
    const { isLoading, errorLoginMessage, user, authToken } = state.userLogin
    console.log("data" + JSON.stringify(state.userLogin))
    if (errorLoginMessage == "invalid") {
        console.log("data" + JSON.stringify(state.userLogin))

        alert = "User does not exist"
        // setAlert("User doesnot exit")
    } else {
        alert = ""
    }
    return {
        user: user,
        error: errorLoginMessage,
        isLoading: isLoading,
    }
}

export default connect(mapsStateProps)(Login)