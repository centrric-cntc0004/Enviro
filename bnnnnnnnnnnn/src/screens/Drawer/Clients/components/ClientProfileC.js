import React, { useState, useEffect } from 'react'
import { View, ScrollView, ActivityIndicator, SafeAreaView, } from 'react-native'
import { lightGrey, mainBlue, textGrey } from '../../../../common/Colors'
import { connect } from 'react-redux'

import { ProfileDataC } from './Innerscreens'
const ClientProfileC = ({ navigation, route, client, }) => {
    const { selected_client } = client


    const RenderContacts = () => {

        const [individual_client, setIndividualClient] = useState(selected_client)
        const [loader, setLoader] = useState(true)

        
        useEffect(() => {
            let loadingInterval = setInterval(() => {
                setLoader(false)
                clearInterval(loadingInterval)
            }, 1500)
            return () => {
                clearInterval(loadingInterval)
            }
        }, [])


        if (loader) return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={mainBlue} />
            </View>
        )

        return (
            <ScrollView showsVerticalScrollIndicator={false}
            style={{ flex: 1, }}>
                <SafeAreaView style={{ flex: 1, }}>

                    {Object.keys(selected_client).length === 0 ? (
                        <View style={{ marginTop: 300, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator style={{ alignSelf: 'center' }} size="large" color={mainBlue} />
                        </View>
                    ) : (
                            <View style={{ flex: 1, backgroundColor: lightGrey }}>
                                <View style={{ backgroundColor: textGrey, height: 11 }}>
                                </View>
                                <ProfileDataC navigation={navigation} />
                            </View>
                        )}
                </SafeAreaView>

            </ScrollView>

        )
    }





    return (

        <View style={{ flex: 1 }}>
            <RenderContacts />
        </View>

    )

}


const mapStateToProps = (state) => {
    const { client } = state
    return { client }
}



export default connect(mapStateToProps)(ClientProfileC)




