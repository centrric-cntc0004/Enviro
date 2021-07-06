import React, { useState } from 'react'
import { View, Text, ActivityIndicator, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { mainBlack, mainBlue, mainWhite } from './Colors'



const NoDataContent = () => {
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
           
            <View style={{backgroundColor:mainBlue,height:60,width:60,borderRadius:30,justifyContent:'center',alignItems:'center'}}>
            <Icon name="error-outline" size={25} color={mainWhite} />
            </View>
            <Text style={{ fontSize: 14,  marginTop: 10, color: '#000' }}>No Data Found</Text>
            <Text style={{ color: 'grey', fontSize: 16 }}></Text>

          
        </View>
    )
}

export default NoDataContent
