import React, { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Alert } from 'react-native'
import { mainBlue } from '../../../../common/Colors'
import { ContentLayout } from './innerscreens'
import AsyncStorage from '@react-native-community/async-storage'
import NotificationListener from '../../../../store/pushnotification/PushNotification'

let profile_permission = ""
const DefaultHome = ({navigation,route}) => {
    const RenderForm = () => {
       

        const [loginPageStatus, setloginPageStatus] = useState(true)
        var day = new Date().getDate()
        var month = new Date().getMonth() + 1
        var year = new Date().getFullYear()
        let date = day + '-' + month + '-' + year
        let newdate = date.split("-").reverse().join("-");


        const getProfile = async () => {
            const profilePermission = await AsyncStorage.getItem('enviro-permission')
            if (profilePermission) {
                profile_permission = JSON.parse(profilePermission);
                setloginPageStatus(false)
                console.log("jkkkkkkkkkkkkkkkk"+JSON.stringify(profilePermission))
            }
        }
        useEffect(() => {
            
               
             

            let loadingInterval = setInterval(() => {
                setloginPageStatus(false)
                clearInterval(loadingInterval)
            }, 1500)
            return () => {
                clearInterval(loadingInterval)
            }
            getProfile()
        }, [])

       
    
       
    
    

        if (loginPageStatus) return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={mainBlue} />
            </View>
        )
        return (
            <>
            <NotificationListener />

            <ContentLayout navigation={navigation}>
                <View>
                    <Text></Text>
                </View>
            </ContentLayout>
            </>



        )

    }
    return (


        <RenderForm />

    )
}

export default DefaultHome
