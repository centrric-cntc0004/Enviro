import React, { useState, useEffect } from 'react'
import { View, ScrollView, ActivityIndicator, SafeAreaView, } from 'react-native'
import { mainBlue, mainWhite, textGrey } from '../../../../common/Colors'
import { connect } from 'react-redux'
import ClientDetail from './InnerScreens/ClientDetail'

const Details = ({ navigation, route, selected_client }) => {

    const RenderContacts = () => {

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
            <ScrollView style={{ flex: 1, backgroundColor: mainWhite }}>
                <SafeAreaView style={{ flex: 1, backgroundColor: mainWhite }}>


                    <View style={{ flex: 1, backgroundColor: mainWhite }}>
                        <View style={{ backgroundColor: textGrey, height: 11 }}>
                        </View>
                        <ClientDetail navigation={navigation} />
                    </View>
                    {/* )} */}
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
    const { selected_client } = state.schedule_enviro
    return { selected_client }
}



export default connect(mapStateToProps)(Details)




