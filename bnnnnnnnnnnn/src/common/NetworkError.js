import React, { useState } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { mainBlack, mainWhite } from './Colors'



const NetworkError = () => {
    const [networkLoader, setNetworkLoader] = useState(false)

    const retryButon = () => {
        setNetworkLoader(true)
        let loaderInterval = setInterval(() => {
            setNetworkLoader(false)
            clearInterval(loaderInterval)
        }, 3000)
    }



    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="exclamation-triangle" size={50} color={mainBlack} />
            <Text style={{ fontSize: 18, fontWeight: 'bold', marginTop: 10, color: '#000' }}>You're currently offline</Text>
            <Text style={{ color: 'grey', fontSize: 16 }}>Please connect to a network to make changes.</Text>

            <TouchableOpacity onPress={() => retryButon()} style={{ height: 45, width: 150, marginTop: 30, borderRadius: 30, backgroundColor: darkOrange, justifyContent: 'center', alignItems: 'center' }}>
                {
                    networkLoader ? (
                        <ActivityIndicator size="small" color={mainWhite} />
                    ) : (
                            <Text style={{ color: mainWhite, fontSize: 18 }}>Retry</Text>
                        )
                }
            </TouchableOpacity>
        </View>
    )
}

export default NetworkError
